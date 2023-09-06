/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, font} from '../../theme';
import LayoutMain from '../../components/Layout/LayoutMain';
import TopBar from '../../components/TopBar/TopBar';
import {AlbumIcon} from 'lucide-react-native';
import ComicCard3 from '../../components/ComicCard/ComicCard3';
import {OrientationContext} from '../../context/OrientationContext';
import {useAppSelector} from '../../redux/hooks';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FavoriteItem} from '../../types';
import {useIsFocused} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

interface Props {
  type: 'Manga' | 'Manhwa' | 'Manhua';
  favoriteData: FavoriteItem[];
}

function FavoriteList({type, favoriteData}: Props) {
  const {isLandscape} = useContext(OrientationContext);

  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && (
        <FlatList
          key={isLandscape ? 'l' : 'p'}
          className="h-full px-1.5"
          data={favoriteData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: isLandscape ? 15 : 30,
          }}
          numColumns={isLandscape ? 4 : 2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({item}) => <ComicCard3 item={item} key={item.slug} />}
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
                {type} favorit masih kosong
              </Text>
            </View>
          }
        />
      )}
    </>
  );
}

export default function Favorite() {
  const {favoriteData} = useAppSelector(state => state.favorite);

  const favoriteManga = favoriteData.filter(item => item.type === 'Manga');
  const favoriteManhwa = favoriteData.filter(item => item.type === 'Manhwa');
  const favoriteManhua = favoriteData.filter(item => item.type === 'Manhua');

  return (
    <SafeAreaView
      style={{
        backgroundColor: color['gray-2'],
      }}>
      <LayoutMain>
        <>
          <TopBar
            title="Komik Favorit"
            isWithoutBack
            titleIcon={<AlbumIcon color={color.primary} />}
          />
          <View className="h-full pt-[70px]">
            <Tab.Navigator
              sceneContainerStyle={{backgroundColor: color['gray-2']}}
              screenOptions={{
                tabBarActiveTintColor: color.primary,
                tabBarInactiveTintColor: color['gray-5'],
                tabBarIndicatorStyle: {
                  backgroundColor: color.primary,
                  height: 5,
                },
                tabBarLabelStyle: {
                  fontSize: 16,
                  ...font.semibold,
                  textTransform: 'none',
                  padding: 5,
                },
                tabBarStyle: {
                  backgroundColor: color['gray-2'],
                  elevation: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: color['gray-4'],
                },
                lazy: true,
              }}
              initialRouteName="Manga"
              backBehavior={'none'}>
              <Tab.Screen
                name="Manga"
                children={() => (
                  <FavoriteList type="Manga" favoriteData={favoriteManga} />
                )}
                options={{
                  tabBarLabel: 'Manga',
                }}
              />
              <Tab.Screen
                name="Manhwa"
                children={() => (
                  <FavoriteList type="Manhwa" favoriteData={favoriteManhwa} />
                )}
                options={{
                  tabBarLabel: 'Manhwa',
                }}
              />
              <Tab.Screen
                name="Manhua"
                children={() => (
                  <FavoriteList type="Manhua" favoriteData={favoriteManhua} />
                )}
                options={{
                  tabBarLabel: 'Manhua',
                }}
              />
            </Tab.Navigator>
          </View>
        </>
      </LayoutMain>
    </SafeAreaView>
  );
}
