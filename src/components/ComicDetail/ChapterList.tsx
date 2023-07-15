import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {AlignLeftIcon, ArrowDownUpIcon} from 'lucide-react-native';
import {Chapter} from '../../types';
import {useAppSelector} from '../../redux/hooks';

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

  const {historyChapter} = useAppSelector(state => state.history);

  return (
    <View
      className="border-t-2 border-dashed pt-5 mb-3"
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
        <TouchableHighlight
          onPress={onSort}
          className="p-2 rounded-md"
          underlayColor={color['gray-1']}
          style={{
            backgroundColor: color['gray-2'],
          }}>
          <ArrowDownUpIcon color={color['gray-5']} />
        </TouchableHighlight>
      </View>
      <View className="px-4 space-y-3 mb-5">
        {chapterList.length > 0 &&
          chapterList.slice(0, 80).map(chapter => {
            const isRead = historyChapter.find(
              item => item.chapterSlug === chapter.slug,
            );
            // console.log(historyChapter);
            return (
              <TouchableHighlight
                className="border rounded-md p-3"
                style={{
                  borderColor: color['gray-4'],
                  backgroundColor: color['gray-2'],
                }}
                underlayColor={color['gray-1']}
                key={chapter.slug}
                onPress={() => {
                  navigate.navigate('ReadChapter', {
                    slug: chapter.slug,
                    seriesSlug: seriesSlug,
                    coverImg: coverImg,
                  });
                }}>
                <View className="flex-row justify-between items-center">
                  <Text
                    className="text-base"
                    style={{
                      color: isRead ? color['gray-5'] : color.text,
                      ...font.medium,
                    }}>
                    Chapter {chapter.number}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      color: isRead ? color['gray-5'] : color.text,
                      ...font.regular,
                    }}>
                    {chapter.date}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
      </View>
      {chapterList.length > 80 && (
        <TouchableHighlight
          className="items-center mb-5 mx-4 py-3 rounded-md"
          style={{
            backgroundColor: color['gray-2'],
          }}
          underlayColor={color['gray-1']}
          onPress={() => {
            navigate.navigate('ChapterList', {
              seriesTitle: seriesTitle,
              seriesSlug: seriesSlug,
              coverImg: coverImg,
              chapterList: chapterList,
            });
          }}>
          <Text
            className="text-base text-center"
            style={{color: color.primary, ...font.medium}}>
            Lihat Semua
          </Text>
        </TouchableHighlight>
      )}
    </View>
  );
}
