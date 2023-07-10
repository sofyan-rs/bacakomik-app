/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {ArrowLeftIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  titleIcon?: React.ReactNode;
  isWithoutBack?: boolean;
  rightButtonIcon?: React.ReactNode;
  onPressRightButton?: () => void;
}

export default function TopBar({
  title,
  titleIcon,
  isWithoutBack,
  rightButtonIcon,
  onPressRightButton,
}: Props) {
  const navigate = useNavigation();

  return (
    <View
      className="bg-white px-5 py-4 absolute top-0 left-0 right-0 z-30 flex-row justify-between items-center"
      style={{
        elevation: 3,
        shadowColor: color['gray-3'],
      }}>
      <View className="flex-row items-center space-x-2">
        {!isWithoutBack && (
          <TouchableHighlight
            className="p-2 rounded-full"
            onPress={() => {
              navigate.goBack();
            }}
            underlayColor={color['gray-4']}>
            <ArrowLeftIcon color={color.primary} size={30} strokeWidth={2} />
          </TouchableHighlight>
        )}
        <View className="flex-row items-center py-2 space-x-1.5">
          {titleIcon}
          <Text
            className="text-xl"
            style={{color: color.text, ...font.semibold}}>
            {title}
          </Text>
        </View>
      </View>
      {onPressRightButton && rightButtonIcon && (
        <TouchableHighlight
          onPress={onPressRightButton}
          underlayColor={color.primaryDark}
          className="h-12 w-12 rounded-md flex justify-center items-center"
          style={{
            backgroundColor: color.primary,
            elevation: 10,
            shadowColor: color.primary,
          }}>
          {rightButtonIcon}
        </TouchableHighlight>
      )}
    </View>
  );
}
