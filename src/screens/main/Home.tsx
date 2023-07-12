/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LayoutMain from '../../components/Layout/LayoutMain';
import {color} from '../../theme';
import ApiClient from '../../api/ApiClient';
import {useIsFocused} from '@react-navigation/native';
import {ComicListItem, HotComicItem} from '../../types';
import Header from '../../components/Home/Header';
import HotComic from '../../components/Home/HotComic';
import ComicUpdates from '../../components/Home/ComicUpdates';

export default function More() {
  const isFocused = useIsFocused();

  const [hotComic, setHotComic] = useState<HotComicItem[]>([]);
  const [comicUpdates, setComicUpdates] = useState<ComicListItem[]>([]);
  const [refreshing, setRefreshing] = useState(true);

  const getHotComic = () => {
    setRefreshing(true);
    ApiClient.get('/hot-komik')
      .then(res => {
        setHotComic(res.data.response.items);
      })
      .catch(err => {
        console.log(err);
      });
    // .finally(() => {
    //   setRefreshing(false);
    // });
  };

  const getComicUpdates = () => {
    setRefreshing(true);
    ApiClient.get('/komik-updates/1')
      .then(res => {
        setComicUpdates(res.data.response.items);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    getHotComic();
    getComicUpdates();
  };

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      className="h-full"
      style={{
        backgroundColor: color['gray-2'],
      }}>
      <LayoutMain>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="h-full"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[color.primary]}
            />
          }>
          <Header />
          <HotComic hotComic={hotComic} refreshing={refreshing} />
          <ComicUpdates comicUpdates={comicUpdates} refreshing={refreshing} />
        </ScrollView>
      </LayoutMain>
    </SafeAreaView>
  );
}
