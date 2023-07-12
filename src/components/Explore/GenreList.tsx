/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {CheckCircle2Icon} from 'lucide-react-native';
import {color, font} from '../../theme';
import {Genre} from '../../types';

interface Props {
  genreList: Genre[];
  genreListRef: any;
  genres: string[];
  setGenres: (genres: string[]) => void;
}

export default function GenreList({
  genreList,
  genreListRef,
  genres,
  setGenres,
}: Props) {
  const onPress = (item: Genre) => {
    if (item.slug === 'all') {
      setGenres(['all']);
    } else {
      if (item.slug !== 'all' && genres.includes(item.slug)) {
        setGenres(genres.filter(genre => genre !== item.slug));
      } else {
        if (genres.includes('all')) {
          setGenres([item.slug]);
        } else {
          setGenres([...genres, item.slug]);
        }
      }
    }
  };

  return (
    <View
      className="py-4"
      style={{
        backgroundColor: color['gray-3'],
      }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={genreList}
        contentContainerStyle={{
          paddingHorizontal: 10,
          elevation: 4,
        }}
        ref={genreListRef}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            className="px-3 py-2 rounded-md mx-1 flex-row items-center space-x-1.5"
            style={{
              backgroundColor: genres.includes(item.slug)
                ? color.primary
                : color['gray-2'],
            }}>
            {genres.includes(item.slug) && item.slug !== 'all' && (
              <CheckCircle2Icon color="white" size={18} />
            )}
            <Text
              className="text-sm"
              style={{
                color: genres.includes(item.slug) ? 'white' : color['gray-5'],
                ...font.semibold,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.slug}
      />
    </View>
  );
}
