/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {View, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/main/Home';
import Favorite from '../screens/main/Favorite';
// import More from '../screens/main/More';
import TabBar from '../components/TabBar/TabBar';
import Explore from '../screens/main/Explore';
import LatestUpdates from '../screens/sub/LatestUpdates';
import SearchComic from '../screens/sub/SearchComic';
import Login from '../screens/auth/Login';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import auth from '@react-native-firebase/auth';
import {UPDATE_USER} from '../redux/slice/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ComicDetail from '../screens/sub/ComicDetail';
import {color} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import History from '../screens/main/History';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_INITIAL_FAVORITE} from '../redux/slice/favoriteSlice';
import ReadChapter from '../screens/sub/ReadChapter';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'home'}
      screenOptions={{
        lazy: true,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{title: 'Beranda', headerShown: false}}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{title: 'Jelajahi', headerShown: false}}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{title: 'Favorit', headerShown: false}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'Riwayat', headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [initializing, setInitializing] = useState(true);
  const {userData} = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  async function onAuthStateChanged(user: any) {
    dispatch(UPDATE_USER(user));
    if (initializing) {
      setInitializing(false);
    }
  }

  const getInitialFavoriteData = async () => {
    try {
      const favoriteData = await AsyncStorage.getItem('favorite');
      if (favoriteData !== null) {
        dispatch(SET_INITIAL_FAVORITE(JSON.parse(favoriteData)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInitialFavoriteData();
    GoogleSignin.configure({
      webClientId:
        '334765493163-ngoca79kbekpcg35uab8vijh1hn440nq.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // console.log(userData);
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: color['gray-2']}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color['gray-2'],
          }}>
          <ActivityIndicator size={60} color={color.primary} className="my-4" />
        </View>
      </SafeAreaView>
    );
  }

  if (userData !== null) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LatestUpdates"
            component={LatestUpdates}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchComic"
            component={SearchComic}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ComicDetail"
            component={ComicDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReadChapter"
            component={ReadChapter}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
