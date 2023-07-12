/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color, font} from '../../theme';
import {ComicDetailData} from '../../types';
import ApiClient from '../../api/ApiClient';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  CheckCircleIcon,
  HeartIcon,
  RefreshCwIcon,
  StarIcon,
} from 'lucide-react-native';
import TopBar2 from '../../components/TopBar/TopBar2';

export default function ComicDetail({route}: any) {
  const {slug} = route.params;

  const [comicDetail, setComicDetail] = useState<ComicDetailData>();
  const [refreshing, setRefreshing] = useState(true);

  const getComicDetail = () => {
    setRefreshing(true);
    ApiClient.get(`/komik/${slug}`)
      .then(res => {
        console.log(res.data.response);
        setComicDetail(res.data.response.data);
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

  useEffect(() => {
    if (slug) {
      onRefresh();
    }
  }, [slug]);

  return (
    <SafeAreaView style={{backgroundColor: color['gray-3']}}>
      <View className="h-full pb-24">
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
          <TopBar2 />
          {comicDetail && (
            <View>
              <MaskedView
                style={{flex: 1, height: '100%'}}
                maskElement={
                  <LinearGradient
                    style={{flex: 1}}
                    start={{x: 0, y: 0.4}}
                    end={{x: 0, y: 1}}
                    colors={['white', 'transparent']}
                  />
                }>
                <Image
                  source={
                    comicDetail.coverImg === ''
                      ? require('../../assets/img/bochi-no-img.webp')
                      : {
                          uri: comicDetail.coverImg,
                        }
                  }
                  style={{
                    width: '100%',
                    height: 320,
                    backgroundColor: color['gray-4'],
                  }}
                />
                <View
                  className="absolute flex-1 top-0 h-full w-full"
                  style={{
                    backgroundColor: color.overlay,
                  }}
                />
              </MaskedView>
              <View className="absolute top-20 flex-row space-x-5 mx-7">
                <Image
                  className="rounded-lg"
                  source={
                    comicDetail.coverImg === ''
                      ? require('../../assets/img/bochi-no-img.webp')
                      : {
                          uri: comicDetail.coverImg,
                        }
                  }
                  style={{
                    width: 120,
                    height: 170,
                    backgroundColor: color['gray-4'],
                  }}
                />
                <View className="flex-1 mt-5">
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row space-x-1.5">
                      <Text
                        className="px-2 py-1 rounded-md text-xs"
                        style={{
                          color: 'white',
                          backgroundColor:
                            comicDetail.type === 'Manga'
                              ? color.mangaType
                              : comicDetail.type === 'Manhua'
                              ? color.manhuaType
                              : color.manhwaType,
                          ...font.semibold,
                        }}>
                        {comicDetail.type}
                      </Text>
                      <View
                        className="flex-row px-2 py-1 rounded-md items-center space-x-1.5"
                        style={{
                          backgroundColor: color['gray-4'],
                        }}>
                        {comicDetail.status === 'Completed' ? (
                          <CheckCircleIcon
                            color={color.primary}
                            size={15}
                            strokeWidth={2.5}
                          />
                        ) : (
                          <RefreshCwIcon
                            color={color.primary}
                            size={15}
                            strokeWidth={2.5}
                          />
                        )}
                        <Text
                          className="text-xs"
                          style={{
                            color: color.text,
                            ...font.semibold,
                          }}>
                          {comicDetail.status === 'Completed'
                            ? 'Tamat'
                            : 'Ongoing'}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center space-x-1.5">
                      <StarIcon
                        color={color.star}
                        fill={color.star}
                        size={16}
                      />
                      <Text
                        className="text-base"
                        style={{
                          color: 'white',
                          textShadowColor: 'rgba(0, 0, 0, 0.5)',
                          textShadowOffset: {width: -1, height: 1},
                          textShadowRadius: 10,
                          ...font.semibold,
                        }}>
                        {comicDetail.rating}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className="text-xl text-white"
                    style={{
                      textShadowColor: 'rgba(0, 0, 0, 0.75)',
                      textShadowOffset: {width: -1, height: 1},
                      textShadowRadius: 10,
                      ...font.semibold,
                    }}>
                    {comicDetail.title}
                  </Text>
                  <Text
                    className="text-base mt-2"
                    style={{
                      color: color.primary,
                      textShadowColor: 'rgba(0, 0, 0, 0.5)',
                      textShadowOffset: {width: -1, height: 1},
                      textShadowRadius: 10,
                      ...font.medium,
                    }}>
                    {comicDetail.author}
                  </Text>
                </View>
              </View>
              <View
                className="rounded-t-3xl p-5"
                style={{backgroundColor: color['gray-3']}}>
                {comicDetail.alternativeTitle || comicDetail.released ? (
                  <View
                    className="border-b-2 border-dashed mb-4"
                    style={{
                      borderColor: color['gray-2'],
                    }}>
                    {comicDetail.alternativeTitle && (
                      <View className="mb-3">
                        <Text
                          className="text-base text-white"
                          style={font.medium}>
                          Judul Alternatif
                        </Text>
                        <Text
                          className="text-base text-white"
                          style={{color: color['gray-5'], ...font.regular}}>
                          {comicDetail.alternativeTitle}
                        </Text>
                      </View>
                    )}
                    {comicDetail.released && (
                      <View className="mb-3">
                        <Text
                          className="text-base text-white"
                          style={font.medium}>
                          Tahun Rilis
                        </Text>
                        <Text
                          className="text-base text-white"
                          style={{color: color['gray-5'], ...font.regular}}>
                          {comicDetail.released}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : null}
                <Text className="text-xl text-white mb-3" style={font.semibold}>
                  Sinopsis
                </Text>
                <Text
                  className="text-base text-white mb-5"
                  style={font.regular}>
                  {comicDetail.synopsis}
                </Text>
                <View className="flex-row flex-wrap gap-2 mb-5">
                  {comicDetail.genres.map(genre => (
                    <Text
                      className="px-3.5 py-2 rounded-md"
                      key={genre.slug}
                      style={{
                        backgroundColor: color['gray-2'],
                        ...font.regular,
                      }}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {comicDetail && (
        <View
          className="absolute bottom-0 left-0 right-0 p-5 flex-row space-x-5 justify-between"
          style={{backgroundColor: color['gray-2']}}>
          <Pressable
            className="py-3 px-5 rounded-lg justify-center"
            style={{
              backgroundColor: color['gray-4'],
            }}>
            <HeartIcon color="white" />
          </Pressable>
          <Pressable
            className="flex-1 p-3 rounded-lg"
            style={{
              backgroundColor: color.primary,
            }}>
            <Text
              className="text-lg text-white text-center"
              style={font.semibold}>
              Baca Sekarang
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
