import {View, TouchableHighlight, Text} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {ArrowLeftIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface Props {
  title?: string;
  showTopBar: boolean;
}

export default function TopBar2({title, showTopBar}: Props) {
  const navigate = useNavigation();

  const topBarStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(showTopBar ? color['gray-1'] : 'transparent'),
      elevation: withTiming(showTopBar ? 5 : 0),
      shadowColor: color['gray-3'],
    };
  });

  return (
    <Animated.View
      className="px-5 py-4 absolute top-0 left-0 right-0 z-40 flex-row justify-between items-center space-x-2"
      style={topBarStyle}>
      <TouchableHighlight
        className="p-2 rounded-full"
        onPress={() => {
          navigate.goBack();
        }}
        underlayColor={color.overlay}>
        <ArrowLeftIcon color="white" size={30} strokeWidth={2} />
      </TouchableHighlight>
      {showTopBar && (
        <View className="flex-row flex-1 items-center py-2 space-x-1.5">
          <Text
            className="text-xl"
            numberOfLines={1}
            style={{color: color.text, ...font.semibold}}>
            {title}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}
