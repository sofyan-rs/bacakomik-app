import {View, Text, Button} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '../../redux/hooks';
import {UPDATE_USER} from '../../redux/slice/userSlice';

export default function More() {
  const dispatch = useAppDispatch();

  async function signOut() {
    auth().signOut();
    await GoogleSignin.signOut();
    dispatch(UPDATE_USER(null));
  }

  return (
    <View>
      <Text>More</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
