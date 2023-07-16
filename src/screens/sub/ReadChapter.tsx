/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, ActivityIndicator, Pressable} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {ChapterData, HistoryChapterItem, HistoryItem} from '../../types';
import ApiClient from '../../api/ApiClient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from '../../theme';
import {createZoomListComponent} from 'react-native-reanimated-zoom';
import Navbar from '../../components/Chapter/Navbar';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {UPDATE_HISTORY} from '../../redux/slice/historySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomImg from '../../components/CustomImg/CustomImg';
import {useIsFocused} from '@react-navigation/native';

const ZoomFlatList = createZoomListComponent(FlatList);

export default function ReadChapter({route}: any) {
  const {slug, seriesSlug, coverImg} = route.params;

  const chapterRef = useRef<FlatList>(null);

  const isFocused = useIsFocused();

  const [chapterData, setChapterData] = useState<ChapterData>();

  const [showNavbar, setShowNavbar] = useState(true);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const {historySeries, historyChapter} = useAppSelector(
    state => state.history,
  );

  const getChapterData = () => {
    setLoading(true);
    ApiClient.get(`/chapter/${slug}`)
      .then(res => {
        // console.log(res.data.response);
        setChapterData(res.data.response.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addToHistory = async () => {
    if (chapterData) {
      const history: HistoryItem = {
        seriesTitle: chapterData?.seriesTitle,
        seriesSlug: chapterData?.seriesSlug,
        coverImg: coverImg,
        chapterNumber: chapterData?.chapterNumber,
        chapterSlug: slug,
      };
      dispatch(UPDATE_HISTORY(history));
      const newHistorySeries = historySeries.filter(
        (item: HistoryItem) => item.seriesSlug !== seriesSlug,
      );
      const historyData = [...newHistorySeries, history];
      const newHistoryChapter = historyChapter.filter(
        (item: HistoryChapterItem) => item.chapterSlug !== slug,
      );
      const historyChapterData = [
        ...newHistoryChapter,
        {
          chapterNumber: chapterData?.chapterNumber,
          chapterSlug: slug,
        },
      ];
      try {
        await AsyncStorage.setItem(
          'history',
          JSON.stringify({
            historySeries: historyData,
            historyChapter: historyChapterData,
          }),
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (slug) {
      getChapterData();
      setTimeout(() => {
        setShowNavbar(false);
      }, 3000);
    }
  }, [slug]);

  useEffect(() => {
    if (isFocused) {
      if (chapterRef && chapterRef.current) {
        chapterRef.current.scrollToIndex({index: 0, animated: true});
      }
    }
  }, [isFocused]);

  useEffect(() => {
    addToHistory();
  }, [chapterData]);

  return (
    <SafeAreaView
      className="flex-1 h-full"
      style={{backgroundColor: color.black}}>
      <Pressable onPress={() => setShowNavbar(!showNavbar)} className="h-full">
        {loading && (
          <ActivityIndicator
            size="large"
            color={color.primary}
            className="my-4 h-full"
          />
        )}
        <Navbar
          title={chapterData?.seriesTitle}
          chapter={chapterData?.chapterNumber}
          seriesSLug={seriesSlug}
          showNavbar={showNavbar}
          coverImg={coverImg}
          prevChapter={chapterData?.previousChapterSlug}
          nextChapter={chapterData?.nextChapterSlug}
        />
        {chapterData && (
          <ZoomFlatList
            data={chapterData.imageChapters}
            ref={chapterRef}
            numColumns={1}
            keyExtractor={item => item}
            onEndReached={() => setShowNavbar(true)}
            renderItem={({item}) => <CustomImg urlImg={item} />}
          />
        )}
      </Pressable>
    </SafeAreaView>
  );
}
