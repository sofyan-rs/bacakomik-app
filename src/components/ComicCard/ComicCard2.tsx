/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {CheckCircleIcon, RefreshCwIcon, StarIcon} from 'lucide-react-native';
import {ComicListItem} from '../../types';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: ComicListItem;
}

export default function ComicCard2({item}: Props) {
  const navigate = useNavigation<any>();

  return (
    <Pressable
      onPress={() =>
        navigate.navigate('ComicDetail', {
          slug: item.slug,
        })
      }
      className="flex-1 rounded-lg m-3 overflow-hidden"
      style={{
        backgroundColor: color['gray-1'],
        elevation: 3,
        shadowColor: color['gray-3'],
      }}>
      <View>
        <Image
          source={
            item.coverImg === ''
              ? require('../../assets/img/bochi-no-img.webp')
              : {
                  uri: item.coverImg,
                }
          }
          style={{width: '100%', height: 150, backgroundColor: color['gray-4']}}
        />
        <Text
          className="absolute top-2 right-2 text-white px-2 py-1 rounded-md text-xs"
          style={{
            backgroundColor:
              item.type === 'Manga'
                ? color.mangaType
                : item.type === 'Manhua'
                ? color.manhuaType
                : color.manhwaType,
            ...font.medium,
          }}>
          {item.type}
        </Text>
        <View
          className="absolute bottom-2 left-2 flex-row px-2 py-1 rounded-md items-center space-x-1.5"
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
            <RefreshCwIcon color={color.primary} size={15} strokeWidth={2.5} />
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
      <View className="mb-2.5">
        <Text
          className="max-w-[200px] text-[15px] p-2"
          style={{color: color.text, ...font.semibold}}
          numberOfLines={1}>
          {item.title}
        </Text>
        <View className="flex-row justify-between items-center mx-2">
          <Text
            className="px-2 py-1 rounded-md text-xs"
            style={{
              color: color.text,
              backgroundColor: color['gray-4'],
              ...font.semibold,
            }}>
            Ch. {item.latestChapter}
          </Text>
          <View className="flex-row items-center space-x-1.5">
            <StarIcon color={color.star} fill={color.star} size={16} />
            <Text style={{color: color.text, ...font.semibold}}>
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
