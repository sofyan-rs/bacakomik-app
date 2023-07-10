/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {FlameIcon} from 'lucide-react-native';
import {HotComicItem} from '../../types';
import HotComicCard from './HotComicCard';

interface Props {
  refreshing: boolean;
  hotComic: HotComicItem[];
}

export default function HotComic({refreshing, hotComic}: Props) {
  return (
    <View
      className="rounded-t-3xl pb-6"
      style={{
        backgroundColor: color['gray-5'],
      }}>
      <View className="flex-row items-center mx-5 mt-5 mb-2 space-x-1.5">
        <FlameIcon color={color.primary} />
        <Text className="text-xl" style={{color: color.text, ...font.semibold}}>
          Hot Komik
        </Text>
      </View>
      {hotComic.length === 0 && refreshing && (
        <ActivityIndicator
          size="large"
          color={color.primary}
          className="my-4"
        />
      )}
      {hotComic.length > 0 && (
        <FlatList
          horizontal
          data={hotComic}
          contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.slug}
          renderItem={({item}) => <HotComicCard item={item} key={item.slug} />}
        />
      )}
      {!refreshing && hotComic.length === 0 && (
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
      )}
    </View>
  );
}
