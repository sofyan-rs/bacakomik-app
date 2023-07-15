/* eslint-disable react-hooks/exhaustive-deps */

import {View, Text, ScrollView, RefreshControl, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color, font} from '../../theme';
import {Chapter, ComicDetailData, FavoriteItem} from '../../types';
import ApiClient from '../../api/ApiClient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeartIcon} from 'lucide-react-native';
import TopBar2 from '../../components/TopBar/TopBar2';
import Cover from '../../components/ComicDetail/Cover';
import ComicInfo from '../../components/ComicDetail/ComicInfo';
import ComicSummary from '../../components/ComicDetail/ComicSummary';
import ChapterList from '../../components/ComicDetail/ChapterList';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {ADD_FAVORITE, REMOVE_FAVORITE} from '../../redux/slice/favoriteSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ComicDetail({route}: any) {
  const {slug} = route.params;

  const [comicDetail, setComicDetail] = useState<ComicDetailData>();
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [sortAsc, setSortAsc] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const [showTopBar, setShowTopBar] = useState(false);

  const dispatch = useAppDispatch();

  const {favoriteData} = useAppSelector(state => state.favorite);
  const isInFavorite = favoriteData.find(
    (item: FavoriteItem) => item.slug === slug,
  );
  const [isFavorite, setIsFavorite] = useState(isInFavorite ? true : false);

  const getComicDetail = () => {
    setRefreshing(true);
    ApiClient.get(`/komik/${slug}`)
      .then(res => {
        // console.log(res.data.response);
        setComicDetail(res.data.response.data);
        if (!sortAsc) {
          setChapterList(res.data.response.data.chapters);
        } else {
          setChapterList(res.data.response.data.chapters.reverse());
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    getComicDetail();
  };

  const onSort = () => {
    setSortAsc(!sortAsc);
    if (!sortAsc) {
      setChapterList(chapterList.reverse());
    } else {
      setChapterList(chapterList.reverse());
    }
  };

  const handleFavorite = async () => {
    if (comicDetail) {
      let newFavoriteData;
      if (isFavorite) {
        dispatch(REMOVE_FAVORITE({slug}));
        newFavoriteData = favoriteData.filter(
          (item: FavoriteItem) => item.slug !== slug,
        );
      } else {
        dispatch(
          ADD_FAVORITE({
            title: comicDetail?.title,
            slug: slug,
            coverImg: comicDetail?.coverImg,
            type: comicDetail?.type,
          }),
        );
        newFavoriteData = [
          ...favoriteData,
          {
            title: comicDetail.title,
            slug: slug,
            coverImg: comicDetail.coverImg,
            type: comicDetail.type,
          },
        ];
      }
      await AsyncStorage.setItem(
        'favorite',
        JSON.stringify(newFavoriteData),
      ).catch(err => {
        console.log(err);
      });
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (slug) {
      onRefresh();
    }
  }, [slug]);

  return (
    <SafeAreaView style={{backgroundColor: color['gray-3']}}>
      <View className="h-full pb-[90px]">
        <TopBar2 title={comicDetail?.title} showTopBar={showTopBar} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="h-full"
          onScroll={e => {
            if (e.nativeEvent.contentOffset.y > 0) {
              setShowTopBar(true);
            } else {
              setShowTopBar(false);
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[color.primary]}
            />
          }>
          {comicDetail && (
            <View>
              <Cover coverImg={comicDetail.coverImg} />
              <ComicInfo comicDetail={comicDetail} />
              <ComicSummary comicDetail={comicDetail} />
              <ChapterList
                seriesTitle={comicDetail.title}
                seriesSlug={slug}
                coverImg={comicDetail.coverImg}
                chapterList={chapterList}
                onSort={onSort}
              />
            </View>
          )}
        </ScrollView>
      </View>
      {comicDetail && (
        <View
          className="absolute bottom-0 left-0 right-0 p-5 flex-row space-x-5 justify-between"
          style={{backgroundColor: color['gray-2']}}>
          <Pressable
            onPress={handleFavorite}
            className="py-3 px-5 rounded-lg justify-center"
            style={{
              backgroundColor: color['gray-4'],
            }}>
            {isFavorite ? (
              <HeartIcon color={color.primary} fill={color.primary} />
            ) : (
              <HeartIcon color="white" />
            )}
          </Pressable>
          <Pressable
            className="flex-1 p-3 rounded-lg"
            style={{
              backgroundColor: color.primary,
            }}>
            <Text
              className="text-lg text-center"
              style={{color: color.text, ...font.semibold}}>
              Baca Sekarang
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
