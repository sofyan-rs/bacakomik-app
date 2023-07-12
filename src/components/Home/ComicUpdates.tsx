/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import React, {useContext} from 'react';
import {BookOpenIcon} from 'lucide-react-native';
import {color, font} from '../../theme';
import {ComicListItem} from '../../types';
import {OrientationContext} from '../../context/OrientationContext';
import ComicCard1 from '../ComicCard/ComicCard1';
import {useNavigation} from '@react-navigation/native';

interface Props {
  refreshing: boolean;
  comicUpdates: ComicListItem[];
}

export default function ComicUpdates({refreshing, comicUpdates}: Props) {
  const {isLandscape} = useContext(OrientationContext);
  const navigate = useNavigation<any>();

  return (
    <View className={isLandscape ? 'pb-4' : 'pb-10'}>
      <View
        className="flex-row items-center justify-between mx-5 mt-5 mb-2 pb-3 space-x-1.5 border-b-2 border-dashed"
        style={{
          borderColor: color['gray-4'],
        }}>
        <View className="flex-row items-center space-x-1.5">
          <BookOpenIcon color={color.primary} />
          <Text
            className="text-xl"
            style={{color: color.text, ...font.semibold}}>
            Komik Terbaru
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            navigate.navigate('LatestUpdates');
          }}
          className="px-3 py-1 rounded-md"
          underlayColor={color.primaryDark}
          style={{
            backgroundColor: color.primary,
            elevation: 3,
            shadowColor: color.primary,
          }}>
          <Text className="text-sm text-white" style={font.semibold}>
            Lihat Semua
          </Text>
        </TouchableHighlight>
      </View>
      <View className="mx-4">
        {comicUpdates.length === 0 && refreshing && (
          <ActivityIndicator
            size="large"
            color={color.primary}
            className="my-4"
          />
        )}
        {comicUpdates.length > 0 &&
          comicUpdates.map((item, index) => (
            <ComicCard1 item={item} key={index} />
          ))}
        {!refreshing && comicUpdates.length === 0 && (
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
        )}
      </View>
    </View>
  );
}
