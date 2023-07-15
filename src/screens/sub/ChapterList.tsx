/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, Image, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import {Chapter} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, font} from '../../theme';
import TopBar from '../../components/TopBar/TopBar';
import {AlignLeftIcon, ArrowDownUpIcon} from 'lucide-react-native';

export default function ChapterList({route}: any) {
  const navigate = useNavigation<any>();

  const {seriesTitle, seriesSlug, coverImg, chapterList} = route.params;

  const {historyChapter} = useAppSelector(state => state.history);

  const [sortAsc, setSortAsc] = useState(false);
  const [chapterListState, setChapterListState] =
    useState<Chapter[]>(chapterList);

  const onSort = () => {
    setSortAsc(!sortAsc);
    setChapterListState(chapterList.reverse());
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: color['gray-3'],
      }}>
      <TopBar
        title={seriesTitle}
        onPressRightButton={onSort}
        rightButtonIcon2={<ArrowDownUpIcon color={color['gray-5']} size={24} />}
      />
      <View className="h-full pt-16">
        <FlatList
          className="px-4"
          data={chapterListState}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 30,
            paddingBottom: 10,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const isRead = historyChapter.find(
              chapter => chapter.chapterSlug === item.slug,
            );
            return (
              <TouchableHighlight
                className="border rounded-md p-3 mb-3"
                style={{
                  borderColor: color['gray-4'],
                  backgroundColor: color['gray-2'],
                }}
                underlayColor={color['gray-1']}
                key={item.slug}
                onPress={() => {
                  navigate.navigate('ReadChapter', {
                    slug: item.slug,
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
                    Chapter {item.number}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      color: isRead ? color['gray-5'] : color.text,
                      ...font.regular,
                    }}>
                    {item.date}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          }}
          ListEmptyComponent={
            <View className="my-3">
              <Image
                source={require('../../assets/img/bocchi.webp')}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                }}
              />
              <Text
                className="text-center text-base"
                style={{color: color['gray-5'], ...font.semibold}}>
                Maaf chapter tidak ditemukan
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
