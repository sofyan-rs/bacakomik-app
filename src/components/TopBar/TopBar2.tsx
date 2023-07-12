/* eslint-disable react-native/no-inline-styles */
import {View, TouchableHighlight} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {ArrowLeftIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

export default function TopBar2() {
  const navigate = useNavigation();

  return (
    <View
      className="px-5 py-4 absolute top-0 left-0 right-0 z-40 flex-row justify-between items-center"
      style={{
        elevation: 5,
        shadowColor: color['gray-3'],
      }}>
      <View className="flex-row items-center space-x-2">
        <TouchableHighlight
          className="p-2 rounded-full"
          onPress={() => {
            navigate.goBack();
          }}
          underlayColor={color.overlay}>
          <ArrowLeftIcon color="white" size={30} strokeWidth={2} />
        </TouchableHighlight>
      </View>
    </View>
  );
}
