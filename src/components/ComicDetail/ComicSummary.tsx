import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {color, font} from '../../theme';
import {ComicDetailData} from '../../types';

interface Props {
  comicDetail: ComicDetailData;
}

export default function ComicSummary({comicDetail}: Props) {
  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <View
      className="rounded-t-3xl p-5"
      style={{backgroundColor: color['gray-3']}}>
      {comicDetail.alternativeTitle || comicDetail.released ? (
        <View
          className="border-b-2 border-dashed mb-4"
          style={{
            borderColor: color['gray-2'],
          }}>
          {comicDetail.alternativeTitle && (
            <View className="mb-3">
              <Text
                className="text-base"
                style={{color: color.text, ...font.medium}}>
                Judul Alternatif
              </Text>
              <Text
                className="text-base"
                style={{color: color['gray-5'], ...font.regular}}>
                {comicDetail.alternativeTitle}
              </Text>
            </View>
          )}
          {comicDetail.released && (
            <View className="mb-3">
              <Text
                className="text-base"
                style={{color: color.text, ...font.medium}}>
                Tahun Rilis
              </Text>
              <Text
                className="text-base"
                style={{color: color['gray-5'], ...font.regular}}>
                {comicDetail.released}
              </Text>
            </View>
          )}
        </View>
      ) : null}
      {comicDetail.synopsis && (
        <View className="mb-5">
          <Text
            className="text-xl mb-3"
            style={{color: color.text, ...font.semibold}}>
            Sinopsis
          </Text>
          <Text
            className="text-base"
            style={{color: color.text, ...font.regular}}>
            {showSynopsis
              ? comicDetail.synopsis
              : comicDetail.synopsis.slice(0, 200)}
          </Text>
          {comicDetail.synopsis.length > 200 && (
            <Pressable
              className="mt-1"
              onPress={() => setShowSynopsis(!showSynopsis)}>
              <Text
                className="text-base "
                style={{color: color['gray-5'], ...font.medium}}>
                {showSynopsis ? 'Tutup' : 'Lihat Selengkapnya'}
              </Text>
            </Pressable>
          )}
        </View>
      )}
      <View className="flex-row flex-wrap gap-2 mb-3">
        {comicDetail.genres.map(genre => (
          <Text
            className="px-3.5 py-2 rounded-md"
            key={genre.slug}
            style={{
              color: color.text,
              backgroundColor: color['gray-2'],
              ...font.regular,
            }}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  );
}
