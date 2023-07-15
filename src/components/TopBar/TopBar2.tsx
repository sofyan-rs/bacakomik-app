/* eslint-disable react-native/no-inline-styles */
import {View, TouchableHighlight, Text} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {ArrowLeftIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  showTopBar: boolean;
}

export default function TopBar2({title, showTopBar}: Props) {
  const navigate = useNavigation();

  return (
    <View
      className="px-5 py-4 absolute top-0 left-0 right-0 z-40 flex-row justify-between items-center"
      style={{
        backgroundColor: showTopBar ? color['gray-1'] : 'transparent',
        elevation: showTopBar ? 5 : 0,
        shadowColor: color['gray-3'],
      }}>
      <View className="flex-row flex-1 items-center space-x-2">
        <TouchableHighlight
          className="p-2 rounded-full"
          onPress={() => {
            navigate.goBack();
          }}
          underlayColor={color.overlay}>
          <ArrowLeftIcon color="white" size={30} strokeWidth={2} />
        </TouchableHighlight>
        {showTopBar && (
          <View className="flex-row items-center py-2 space-x-1.5">
            <Text
              className="text-xl"
              style={{color: color.text, ...font.semibold}}>
              {title}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
