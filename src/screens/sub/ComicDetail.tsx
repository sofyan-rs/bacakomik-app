/* eslint-disable react-hooks/exhaustive-deps */

import {View, ScrollView, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../../theme';
import {Chapter, ComicDetailData, FavoriteItem} from '../../types';
import ApiClient from '../../api/ApiClient';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopBar2 from '../../components/TopBar/TopBar2';
import Cover from '../../components/ComicDetail/Cover';
import ComicInfo from '../../components/ComicDetail/ComicInfo';
import ComicSummary from '../../components/ComicDetail/ComicSummary';
import ChapterList from '../../components/ComicDetail/ChapterList';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {ADD_FAVORITE, REMOVE_FAVORITE} from '../../redux/slice/favoriteSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComicButton from '../../components/ComicDetail/ComicButton';

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
    setChapterList(chapterList.reverse());
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
        <ComicButton
          handleFavorite={handleFavorite}
          isFavorite={isFavorite}
          comicDetail={comicDetail}
          slug={slug}
        />
      )}
    </SafeAreaView>
  );
}
