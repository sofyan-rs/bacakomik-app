import {View, TouchableHighlight, Text} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface Props {
  title?: string;
  chapter?: string;
  seriesSLug?: string;
  coverImg?: string;
  prevChapter?: string | null;
  nextChapter?: string | null;
  showNavbar: boolean;
}

export default function Navbar({
  title,
  chapter,
  seriesSLug,
  coverImg,
  prevChapter,
  nextChapter,
  showNavbar,
}: Props) {
  const navigate = useNavigation<any>();

  const navBarStyle = useAnimatedStyle<any>(() => {
    return {
      backgroundColor: color.overlay,
      transform: [
        {
          translateY: withTiming(showNavbar ? 0 : -100),
        },
      ],
    };
  });

  const footerBarStyle = useAnimatedStyle<any>(() => {
    return {
      transform: [
        {
          translateY: withTiming(showNavbar ? 0 : 100),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View
        className="px-5 py-4 absolute top-0 left-0 right-0 z-40 flex-row justify-between items-center space-x-2"
        style={navBarStyle}>
        <TouchableHighlight
          className="p-2 rounded-full"
          onPress={() => {
            navigate.goBack();
          }}
          underlayColor={color.overlay}>
          <ArrowLeftIcon color="white" size={30} strokeWidth={2} />
        </TouchableHighlight>
        <View className="flex-row flex-1 items-center space-x-1.5">
          {title && (
            <View>
              <Text
                className="text-lg"
                numberOfLines={1}
                style={{color: color.text, ...font.semibold}}>
                {title}
              </Text>
              <Text
                className="text-sm"
                numberOfLines={1}
                style={{color: color.text, ...font.medium}}>
                Chapter {chapter}
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
      <Animated.View
        className="px-5 py-2 absolute bottom-0 left-0 right-0 z-40 flex-row justify-between items-center"
        style={footerBarStyle}>
        <View>
          {prevChapter && (
            <TouchableHighlight
              className="p-2 rounded-full"
              style={{backgroundColor: color.overlay}}
              onPress={() => {
                navigate.navigate('ReadChapter', {
                  slug: prevChapter,
                  seriesTitle: title,
                  seriesSlug: seriesSLug,
                  coverImg: coverImg,
                });
              }}
              underlayColor={color['gray-2']}>
              <ChevronLeftIcon color="white" size={30} strokeWidth={2} />
            </TouchableHighlight>
          )}
        </View>
        <View>
          {nextChapter && (
            <TouchableHighlight
              className="p-2 rounded-full"
              style={{backgroundColor: color.overlay}}
              onPress={() => {
                navigate.navigate('ReadChapter', {
                  slug: nextChapter,
                  seriesTitle: title,
                  seriesSlug: seriesSLug,
                  coverImg: coverImg,
                });
              }}
              underlayColor={color['gray-2']}>
              <ChevronRightIcon color="white" size={30} strokeWidth={2} />
            </TouchableHighlight>
          )}
        </View>
      </Animated.View>
    </>
  );
}
