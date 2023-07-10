/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar/TopBar';
import {ComicListItem, Genre} from '../../types';
import ApiClient from '../../api/ApiClient';
import {color, font} from '../../theme';
import ComicCard2 from '../../components/ComicCard/ComicCard2';
import {apiUrl} from '../../api/baseURL';
import {CompassIcon, SearchIcon} from 'lucide-react-native';
import {OrientationContext} from '../../context/OrientationContext';
import LayoutMain from '../../components/Layout/LayoutMain';
import GenreList from '../../components/Explore/GenreList';
import FilterButton from '../../components/Explore/FilterButton';
import FilterModal from '../../components/Explore/FilterModal';
import {useNavigation} from '@react-navigation/native';

export default function Explore() {
  const {isLandscape} = useContext(OrientationContext);

  const navigate = useNavigation<any>();

  const comicListRef = useRef<FlatList>(null);
  const genreListRef = useRef<FlatList>(null);

  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [sortBy, setSortBy] = useState('update');
  const [genres, setGenres] = useState<string[]>(['all']);
  const [currentPage, setCurrentPage] = useState(1);

  const [comicList, setComicList] = useState<ComicListItem[]>([]);
  const [genreList, setGenreList] = useState<Genre[]>([]);

  const [refreshing, setRefreshing] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [showModalFilter, setShowModalFilter] = useState(false);

  const getComicList = () => {
    if (comicListRef && comicListRef.current) {
      comicListRef.current.scrollToOffset({animated: true, offset: 0});
    }
    setRefreshing(true);
    ApiClient.get(`${apiUrl}/komik-list`, {
      params: {
        sortby: sortBy,
        status: status === 'all' ? '' : status,
        type: type === 'all' ? '' : type,
        genres: genres.length > 0 && !genres.includes('all') ? genres : '',
        page: 1,
      },
    })
      .then(res => {
        setComicList(res.data.response.items);
        if (comicListRef && comicListRef.current) {
          comicListRef.current.scrollToOffset({animated: true, offset: 0});
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const loadMore = () => {
    if (refreshing) {
      return;
    }
    if (loadingMore) {
      return;
    }
    if (currentPage === 20) {
      return;
    }
    if (comicList.length < 28) {
      return;
    }
    setLoadingMore(true);
    ApiClient.get(`${apiUrl}/komik-list`, {
      params: {
        sort: sortBy,
        status: status === 'all' ? '' : status,
        type: type === 'all' ? '' : type,
        genres: genres.length > 0 && !genres.includes('all') ? genres : '',
        page: currentPage + 1,
      },
    })
      .then(res => {
        setComicList([...comicList, ...res.data.response.items]);
        setCurrentPage(currentPage + 1);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const getGenreList = () => {
    ApiClient.get(`${apiUrl}/all-genres`)
      .then(res => {
        setGenreList([
          {
            name: 'All',
            slug: 'all',
          },
          ...res.data.response.genres,
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onRefresh = () => {
    getComicList();
  };

  useEffect(() => {
    if (genres.length === 0) {
      setGenres(['all']);
      if (genreListRef && genreListRef.current) {
        genreListRef.current.scrollToOffset({animated: true, offset: 0});
      }
    }
    getComicList();
  }, [genres, sortBy, status, type]);

  useEffect(() => {
    setCurrentPage(1);
    getGenreList();
    onRefresh();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: color['gray-4'],
      }}>
      <LayoutMain>
        <>
          <TopBar
            title="Komik List"
            isWithoutBack
            titleIcon={<CompassIcon color={color.primary} />}
            rightButtonIcon={<SearchIcon color="white" />}
            onPressRightButton={() => {
              navigate.navigate('SearchComic');
            }}
          />
          <View className="h-full pt-20">
            <FilterButton setShowModalFilter={setShowModalFilter} />
            <GenreList
              genreList={genreList}
              genreListRef={genreListRef}
              genres={genres}
              setGenres={setGenres}
            />
            <FlatList
              key={isLandscape ? 'l' : 'p'}
              className="h-full px-1.5"
              data={comicList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: isLandscape ? 15 : 30,
              }}
              ref={comicListRef}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[color.primary]}
                />
              }
              numColumns={isLandscape ? 4 : 2}
              onEndReached={loadMore}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              renderItem={({item}) => (
                <ComicCard2 item={item} key={item.slug} />
              )}
              ListEmptyComponent={
                !refreshing ? (
                  <View className="my-3">
                    <Image
                      source={require('../../assets/img/bocchi.webp')}
                      style={{
                        width: 150,
                        height: 150,
                        alignSelf: 'center',
                      }}
                    />
                    <Text
                      className="text-center text-base"
                      style={{color: color['gray-2'], ...font.semibold}}>
                      Maaf komik tidak ditemukan
                    </Text>
                  </View>
                ) : (
                  <View />
                )
              }
              ListFooterComponent={
                loadingMore ? (
                  <ActivityIndicator
                    size="large"
                    color={color.primary}
                    className="my-4"
                  />
                ) : (
                  <View />
                )
              }
            />
          </View>
        </>
      </LayoutMain>
      <FilterModal
        showModalFilter={showModalFilter}
        setShowModalFilter={setShowModalFilter}
        status={status}
        setStatus={setStatus}
        type={type}
        setType={setType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </SafeAreaView>
  );
}
