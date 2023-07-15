/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableHighlight} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {UPDATE_USER} from '../../redux/slice/userSlice';
import {color, font} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import {ArrowLeftIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

export default function More() {
  const navigate = useNavigation();

  const dispatch = useAppDispatch();
  const {userData} = useAppSelector(state => state.user);

  async function signOut() {
    auth().signOut();
    await GoogleSignin.signOut();
    dispatch(UPDATE_USER(null));
  }

  return (
    <SafeAreaView
      className="h-full"
      style={{
        backgroundColor: color['gray-2'],
      }}>
      <View className="p-10">
        <TouchableHighlight
          className="p-2 rounded-full absolute top-5 left-5"
          onPress={() => {
            navigate.goBack();
          }}
          underlayColor={color['gray-3']}>
          <ArrowLeftIcon color="white" size={30} strokeWidth={2} />
        </TouchableHighlight>
        <Image
          source={{uri: userData?.photoURL}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: color['gray-4'],
            alignSelf: 'center',
          }}
        />
        <Text
          className="text-xl text-center mt-5"
          style={{color: color.text, ...font.semibold}}>
          {userData?.displayName}
        </Text>
      </View>
      <View
        className="flex-1 p-5"
        style={{
          backgroundColor: color['gray-3'],
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <Text
          className="text-base text-center mt-5 mx-3 p-3 rounded-lg"
          style={{
            color: color['gray-5'],
            backgroundColor: color['gray-2'],
            ...font.medium,
          }}>
          Aplikasi ini masih dalam tahap pengembangan jadi mohon maaf jika masih
          terdapat bug.
        </Text>
        <Text
          className="text-base text-center mt-5"
          style={{
            color: color['gray-5'],
            ...font.medium,
          }}>
          Created with ❤️ by KoiDevz
        </Text>
      </View>
      <Text
        className="text-base text-center mt-5"
        style={{
          color: color['gray-5'],
          backgroundColor: color['gray-2'],
          ...font.medium,
        }}>
        Versi 1.0.1
      </Text>
      <View className="p-5 pb-8">
        <ButtonSubmit text="Logout" onPress={signOut} />
      </View>
    </SafeAreaView>
  );
}
