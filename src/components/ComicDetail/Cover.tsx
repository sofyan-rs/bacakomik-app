/* eslint-disable react-native/no-inline-styles */
import {View, Image} from 'react-native';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../theme';

interface Props {
  coverImg: string | null | undefined;
}

export default function Cover({coverImg}: Props) {
  return (
    <MaskedView
      style={{flex: 1, height: '100%'}}
      maskElement={
        <LinearGradient
          style={{flex: 1}}
          start={{x: 0, y: 0.4}}
          end={{x: 0, y: 1}}
          colors={['white', 'transparent']}
        />
      }>
      <Image
        source={
          coverImg === '' || coverImg === null || coverImg === undefined
            ? require('../../assets/img/bochi-no-img.webp')
            : {
                uri: coverImg,
              }
        }
        style={{
          width: '100%',
          height: 320,
          backgroundColor: color['gray-4'],
        }}
      />
      <View
        className="absolute flex-1 top-0 h-full w-full"
        style={{
          backgroundColor: color.overlay,
        }}
      />
    </MaskedView>
  );
}
