/* eslint-disable react-native/no-inline-styles */
import {Text, View, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, font} from '../../theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {GoogleIcon} from '../../components/Icon/GoogleIcon';
import {ArrowRightIcon} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Login() {
  async function signIn() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView>
      <LinearGradient
        className="h-full justify-center"
        style={{flex: 1}}
        start={{x: 0, y: 0.4}}
        end={{x: 0, y: 1}}
        colors={[color['gray-3'], color['gray-4']]}>
        <View className="px-10">
          <Text
            className="text-5xl mb-2"
            style={{color: color.primary, ...font.semibold}}>
            Login
          </Text>
          <Text
            className="text-3xl"
            style={{color: color.text, ...font.medium}}>
            Sebelum Membaca
          </Text>
          <View className="flex-row mt-10">
            <Pressable
              onPress={signIn}
              className="px-5 py-3 rounded-md"
              style={{
                backgroundColor: 'white',
                elevation: 5,
                shadowColor: color.primaryDark,
              }}>
              <View className="flex-row items-center">
                <GoogleIcon size={24} />
                <Text
                  className="text-base mx-2"
                  style={{color: color['gray-3'], ...font.semibold}}>
                  Google Login
                </Text>
                <ArrowRightIcon
                  size={24}
                  color={color.primaryDark}
                  className="ml-auto"
                />
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
