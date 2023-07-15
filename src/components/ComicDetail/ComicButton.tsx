import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {HeartIcon} from 'lucide-react-native';
import {color, font} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import {HistoryItem} from '../../types';

interface Props {
  handleFavorite: () => void;
  isFavorite: boolean;
  comicDetail: any;
  slug: string;
}

export default function ComicButton({
  handleFavorite,
  isFavorite,
  comicDetail,
  slug,
}: Props) {
  const navigate = useNavigation<any>();

  const {historySeries} = useAppSelector(state => state.history);
  const isInHistory = historySeries.find(
    (item: HistoryItem) => item.seriesSlug === slug,
  );

  return (
    <View
      className="absolute bottom-0 left-0 right-0 p-5 flex-row space-x-5 justify-between"
      style={{backgroundColor: color['gray-2']}}>
      <Pressable
        onPress={handleFavorite}
        className="py-3 px-5 rounded-lg justify-center"
        style={{
          backgroundColor: color['gray-4'],
        }}>
        {isFavorite ? (
          <HeartIcon color={color.primary} fill={color.primary} />
        ) : (
          <HeartIcon color="white" />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          if (isInHistory) {
            navigate.navigate('ReadChapter', {
              slug: isInHistory.chapterSlug,
              seriesSlug: slug,
              coverImg: comicDetail.coverImg,
            });
          } else {
            const firstChapter = comicDetail.chapters.reverse()[0];
            navigate.navigate('ReadChapter', {
              slug: firstChapter.slug,
              seriesSlug: slug,
              coverImg: comicDetail.coverImg,
            });
          }
        }}
        className="flex-1 p-3 rounded-lg"
        style={{
          backgroundColor: color.primary,
        }}>
        <Text
          className="text-lg text-center"
          style={{color: color.text, ...font.semibold}}>
          {isInHistory ? 'Lanjutkan Baca' : 'Baca Sekarang'}
        </Text>
      </Pressable>
    </View>
  );
}
