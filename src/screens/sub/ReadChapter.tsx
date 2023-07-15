/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ChapterData} from '../../types';
import ApiClient from '../../api/ApiClient';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutoHeightImage from 'react-native-auto-height-image';
// import Zoom from 'react-native-zoom-reanimated';
import {color} from '../../theme';
import {useSharedValue} from 'react-native-reanimated';

// const ZoomFlatList = createZoomListComponent(FlatList);

export default function ReadChapter({route}: any) {
  const {slug, seriesTitle, seriesSlug, coverImg} = route.params;

  const [chapterData, setChapterData] = useState<ChapterData>();

  const [showNavbar, setShowNavbar] = useState(false);
  const [loading, setLoading] = useState(true);

  const translateY = useSharedValue(0);

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

  const onRefresh = () => {
    getChapterData();
  };

  useEffect(() => {
    if (slug) {
      onRefresh();
    }
  }, [slug]);

  const {width} = Dimensions.get('window');

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: color.black}}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={color.primary}
          className="my-4"
        />
      )}

      {chapterData && (
        <FlatList
          data={chapterData.imageChapters}
          numColumns={1}
          renderItem={({item}) => (
            // <Zoom>
            <AutoHeightImage width={width} source={{uri: item}} />
          )}
          pagingEnabled
          // horizontal
          keyExtractor={item => item}
          onScroll={e => {
            if (e.nativeEvent.contentOffset.y > 100) {
              setShowNavbar(true);
            } else {
              setShowNavbar(false);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
}
