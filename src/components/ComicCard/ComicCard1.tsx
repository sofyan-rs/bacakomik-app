/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {CheckCircleIcon, RefreshCwIcon} from 'lucide-react-native';
import {ComicListItem} from '../../types';

interface Props {
  item: ComicListItem;
}

export default function ComicCard1({item}: Props) {
  return (
    <Pressable
      className="rounded-lg my-2 overflow-hidden flex-row items-center p-2 border space-x-3"
      style={{
        backgroundColor: color['gray-6'],
        borderColor: color['gray-4'],
      }}>
      <Image
        className="rounded-md"
        source={
          item.coverImg === ''
            ? require('../../assets/img/bochi-no-img.webp')
            : {
                uri: item.coverImg,
              }
        }
        style={{width: 80, height: 80, backgroundColor: color['gray-4']}}
      />
      <View className="flex-1 space-y-2 pr-1.5">
        <Text
          className="max-w-full text-[15px]"
          style={{color: color.text, ...font.semibold}}
          numberOfLines={1}>
          {item.title}
        </Text>
        <View className="flex-row justify-between space-x-2">
          <View className="flex-row items-center space-x-2">
            <Text
              className="px-2 py-1 rounded-md text-xs"
              style={{
                color: 'white',
                backgroundColor:
                  item.type === 'Manga'
                    ? color.mangaType
                    : item.type === 'Manhua'
                    ? color.manhuaType
                    : color.manhwaType,
                ...font.semibold,
              }}>
              {item.type}
            </Text>
            <View
              className="flex-row px-2 py-1 rounded-md items-center space-x-1.5"
              style={{
                backgroundColor: color['gray-4'],
              }}>
              {item.completed ? (
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
                {item.completed ? 'Tamat' : 'Ongoing'}
              </Text>
            </View>
          </View>
          <Text
            className="px-2 py-1 rounded-md text-sm"
            style={{
              color: color.text,
              backgroundColor: color['gray-4'],
              ...font.semibold,
            }}>
            Ch. {item.latestChapter}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
