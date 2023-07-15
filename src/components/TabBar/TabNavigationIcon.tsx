import {View} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {HomeIcon, CompassIcon, AlbumIcon} from 'lucide-react-native';
import {HistoryIcon} from 'lucide-react-native';

interface Props {
  route: any;
  isFocused: boolean;
}

export default function TabNavigationIcon({route, isFocused}: Props) {
  return (
    <View className="px-4 pt-4 pb-1 mb-1">
      {route === 'Beranda' && (
        <HomeIcon color={isFocused ? color.primary : color['gray-5']} />
      )}
      {route === 'Jelajahi' && (
        <CompassIcon color={isFocused ? color.primary : color['gray-5']} />
      )}
      {route === 'Favorit' && (
        <AlbumIcon color={isFocused ? color.primary : color['gray-5']} />
      )}
      {route === 'Riwayat' && (
        <HistoryIcon color={isFocused ? color.primary : color['gray-5']} />
      )}
    </View>
  );
}
