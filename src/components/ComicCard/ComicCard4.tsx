/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {HistoryItem} from '../../types';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: HistoryItem;
}

export default function ComicCard4({item}: Props) {
  const navigate = useNavigation<any>();

  return (
    <Pressable
      onPress={() =>
        navigate.navigate('ComicDetail', {
          slug: item.seriesSlug,
        })
      }
      className="rounded-lg my-2 overflow-hidden flex-row items-center p-2 border space-x-3"
      style={{
        backgroundColor: color['gray-1'],
        borderColor: color['gray-4'],
      }}>
      <Image
        className="rounded-md"
        source={
          item.coverImg === '' ||
          item.coverImg === null ||
          item.coverImg === undefined
            ? require('../../assets/img/bochi-no-img.webp')
            : {
                uri: item.coverImg,
              }
        }
        style={{width: 80, height: 80, backgroundColor: color['gray-4']}}
      />
      <View className="flex-1 space-y-2 pr-1.5">
        <Text
          className="text-[15px]"
          style={{color: color.text, ...font.semibold}}
          numberOfLines={1}>
          {item.seriesTitle}
        </Text>
        <View className="flex-row justify-between space-x-2">
          <Text
            className="px-2 py-1 rounded-md text-sm"
            style={{
              color: color.text,
              backgroundColor: color['gray-4'],
              ...font.semibold,
            }}>
            Ch. {item.chapterNumber}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
