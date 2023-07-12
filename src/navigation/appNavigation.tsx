/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/main/Home';
import Favorite from '../screens/main/Favorite';
import More from '../screens/main/More';
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
        name="More"
        component={More}
        options={{title: 'Lainnya', headerShown: false}}
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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '334765493163-ngoca79kbekpcg35uab8vijh1hn440nq.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(userData);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
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
