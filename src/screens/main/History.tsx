/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList} from 'react-native';
import React, {useContext} from 'react';
import {useAppSelector} from '../../redux/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, font} from '../../theme';
import LayoutMain from '../../components/Layout/LayoutMain';
import TopBar from '../../components/TopBar/TopBar';
import {HistoryIcon} from 'lucide-react-native';
import ComicCard4 from '../../components/ComicCard/ComicCard4';
import {OrientationContext} from '../../context/OrientationContext';

export default function History() {
  const {isLandscape} = useContext(OrientationContext);

  const {historySeries} = useAppSelector(state => state.history);

  return (
    <SafeAreaView
      style={{
        backgroundColor: color['gray-2'],
      }}>
      <LayoutMain>
        <>
          <TopBar
            title="Riwayat Baca"
            isWithoutBack
            titleIcon={<HistoryIcon color={color.primary} />}
            // rightButtonIcon={<SearchIcon color="white" />}
            // onPressRightButton={() => {
            //   navigate.navigate('SearchComic');
            // }}
          />
          <View className="h-full pt-16">
            <FlatList
              className="h-full px-4"
              data={historySeries}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: isLandscape ? 10 : 35,
              }}
              renderItem={({item}) => (
                <ComicCard4 item={item} key={item.seriesSlug} />
              )}
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
                    Riwayat baca tidak ditemukan
                  </Text>
                </View>
              }
            />
          </View>
        </>
      </LayoutMain>
    </SafeAreaView>
  );
}
