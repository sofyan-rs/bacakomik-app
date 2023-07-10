/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
