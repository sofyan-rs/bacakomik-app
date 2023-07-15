import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {AlignLeftIcon, ArrowDownUpIcon} from 'lucide-react-native';
import {Chapter} from '../../types';

interface Props {
  seriesTitle: string;
  seriesSlug: string;
  coverImg: string;
  chapterList: Chapter[];
  onSort: () => void;
}

export default function ChapterList({
  seriesTitle,
  seriesSlug,
  coverImg,
  chapterList,
  onSort,
}: Props) {
  const navigate = useNavigation<any>();

  return (
    <View
      className="border-t-2 border-dashed pt-5"
      style={{borderColor: color['gray-2']}}>
      <View className="flex-row justify-between items-center mx-4 mb-5">
        <View className="flex-row items-center space-x-3">
          <AlignLeftIcon color={color['gray-5']} />
          <Text
            className="text-xl"
            style={{color: color.text, ...font.semibold}}>
            Daftar Chapter
          </Text>
        </View>
        <Pressable
          onPress={onSort}
          className="p-2 rounded-md"
          style={{
            backgroundColor: color['gray-2'],
          }}>
          <ArrowDownUpIcon color={color['gray-5']} />
        </Pressable>
      </View>
      <View className="px-4 space-y-3 mb-8">
        {chapterList.length > 0 &&
          chapterList.map(chapter => (
            <Pressable
              className="border rounded-md p-3"
              style={{
                borderColor: color['gray-4'],
                backgroundColor: color['gray-2'],
              }}
              key={chapter.slug}
              onPress={() => {
                navigate.navigate('ReadChapter', {
                  slug: chapter.slug,
                  seriesTitle: seriesTitle,
                  seriesSlug: seriesSlug,
                  coverImg: coverImg,
                });
              }}>
              <View className="flex-row justify-between items-center">
                <Text
                  className="text-base"
                  style={{
                    color: color.text,
                    ...font.medium,
                  }}>
                  Chapter {chapter.number}
                </Text>
                <Text
                  className="text-sm"
                  style={{
                    color: color.text,
                    ...font.regular,
                  }}>
                  {chapter.date}
                </Text>
              </View>
            </Pressable>
          ))}
      </View>
    </View>
  );
}
