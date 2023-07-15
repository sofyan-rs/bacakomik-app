/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
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
import {ComicListItem} from '../../types';
import ApiClient from '../../api/ApiClient';
import {color, font} from '../../theme';
import ComicCard2 from '../../components/ComicCard/ComicCard2';
import {OrientationContext} from '../../context/OrientationContext';
import SearchBar from '../../components/SearchComic/SearchBar';
import {FolderSearch2Icon} from 'lucide-react-native';

export default function SearchComic() {
  const {isLandscape} = useContext(OrientationContext);

  const comicListRef = useRef<FlatList>(null);

  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [comicList, setComicList] = useState<ComicListItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getComicSearch = () => {
    setRefreshing(true);
    // console.log(search.replace(/ /g, '+').toLowerCase());
    ApiClient.get('/search/1/', {
      params: {
        search: search.replace(/ /g, '+').toLowerCase(),
      },
    })
      .then(res => {
        setComicList(res.data.response.items);
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
    ApiClient.get(`/search/${currentPage + 1}/`, {
      params: {
        search: search.replace(/ /g, '+').toLowerCase(),
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

  const onRefresh = () => {
    getComicSearch();
  };

  useEffect(() => {
    if (search !== '') {
      setCurrentPage(1);
      onRefresh();
    }
  }, [search]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: color['gray-2'],
      }}>
      <SearchBar search={search} setSearch={setSearch} />
      <View className="h-full pt-20">
        {search === '' && (
          <View className="flex-row justify-center">
            <View className="mt-10">
              <FolderSearch2Icon color={color['gray-1']} size={200} />
              <Text
                className="text-xl text-center"
                style={{
                  color: color['gray-5'],
                  ...font.semibold,
                }}>
                Cari Judul Komik
              </Text>
            </View>
          </View>
        )}
        {search !== '' && (
          <FlatList
            key={isLandscape ? 'l' : 'p'}
            className="h-full px-1.5"
            data={comicList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 15,
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
            renderItem={({item}) => <ComicCard2 item={item} key={item.slug} />}
            ListEmptyComponent={
              search && !refreshing ? (
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
                    style={{color: color['gray-5'], ...font.semibold}}>
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
        )}
      </View>
    </SafeAreaView>
  );
}
