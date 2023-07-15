/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {CheckCircleIcon, RefreshCwIcon, StarIcon} from 'lucide-react-native';
import {ComicDetailData} from '../../types';

interface Props {
  comicDetail: ComicDetailData;
}

export default function ComicInfo({comicDetail}: Props) {
  return (
    <View className="absolute top-20 flex-row space-x-5 mx-7">
      <Image
        className="rounded-lg"
        source={
          comicDetail.coverImg === '' ||
          comicDetail.coverImg === null ||
          comicDetail.coverImg === undefined
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
                {comicDetail.status === 'Completed' ? 'Tamat' : 'Ongoing'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-1.5">
            <StarIcon color={color.star} fill={color.star} size={16} />
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
          className="text-xl"
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
            color: color.text,
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
  );
}
