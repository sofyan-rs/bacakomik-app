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
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar/TopBar';
import {ComicListItem} from '../../types';
import ApiClient from '../../api/ApiClient';
import ComicCard1 from '../../components/ComicCard/ComicCard1';
import {color, font} from '../../theme';

export default function LatestUpdates() {
  const [currentPage, setCurrentPage] = useState(1);
  const [comicUpdates, setComicUpdates] = useState<ComicListItem[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

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
    if (comicUpdates.length < 28) {
      return;
    }
    setLoadingMore(true);
    ApiClient.get(`/komik-updates/${currentPage + 1}`)
      .then(res => {
        setComicUpdates([...comicUpdates, ...res.data.response.items]);
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
    getComicUpdates();
  };

  useEffect(() => {
    setCurrentPage(1);
    onRefresh();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: color['gray-2'],
      }}>
      <TopBar title="Update Terbaru" />
      <View className="h-full pt-16">
        <FlatList
          className="px-4"
          data={comicUpdates}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[color.primary]}
            />
          }
          onEndReached={loadMore}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ComicCard1 item={item} />}
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
      </View>
    </SafeAreaView>
  );
}
