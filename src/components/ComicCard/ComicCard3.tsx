/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {color, font} from '../../theme';
import {FavoriteItem} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {OrientationContext} from '../../context/OrientationContext';

interface Props {
  item: FavoriteItem;
}

export default function ComicCard3({item}: Props) {
  const {isLandscape} = useContext(OrientationContext);

  const navigate = useNavigation<any>();

  return (
    <View
      className="flex-1 p-3"
      style={{
        maxWidth: isLandscape ? '33.33%' : '50%',
      }}>
      <Pressable
        onPress={() =>
          navigate.navigate('ComicDetail', {
            slug: item.slug,
          })
        }
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: color['gray-1'],
          elevation: 3,
          shadowColor: color['gray-3'],
        }}>
        <View>
          <Image
            source={
              item.coverImg === '' ||
              item.coverImg === null ||
              item.coverImg === undefined
                ? require('../../assets/img/bochi-no-img.webp')
                : {
                    uri: item.coverImg,
                  }
            }
            style={{
              width: '100%',
              height: 150,
              backgroundColor: color['gray-4'],
            }}
          />
        </View>
        <View className="mb-2.5">
          <Text
            className="text-[15px] p-2"
            style={{color: color.text, ...font.semibold}}
            numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
