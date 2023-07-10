/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableHighlight} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';
import {SearchIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  name: string;
}

export default function Header({name}: Props) {
  const navigate = useNavigation<any>();

  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  let greeting;
  if (
    (currentHour >= 18 && currentHour <= 23) ||
    (currentHour >= 0 && currentHour < 3)
  ) {
    greeting = 'Malam';
  } else if (currentHour >= 3 && currentHour < 10) {
    greeting = 'Pagi';
  } else if (currentHour >= 10 && currentHour < 15) {
    greeting = 'Siang';
  } else {
    greeting = 'Sore';
  }

  return (
    <View className="m-5">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-3">
          <Image
            source={require('../../assets/img/avatar.jpg')}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: color['gray-4'],
            }}
          />
          <View>
            <Text
              className="text-base"
              style={{color: color.text, ...font.medium}}>
              Selamat {greeting}!
            </Text>
            <Text
              className="text-xl"
              style={{color: color.primary, ...font.semibold}}>
              {name}
            </Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => {
            navigate.navigate('SearchComic');
          }}
          underlayColor={color.primaryDark}
          className="h-12 w-12 rounded-md flex justify-center items-center"
          style={{
            backgroundColor: color.primary,
            elevation: 10,
            shadowColor: color.primary,
          }}>
          <SearchIcon color="white" />
        </TouchableHighlight>
      </View>
    </View>
  );
}
