/* eslint-disable react-native/no-inline-styles */
import {Text, View, TouchableHighlight} from 'react-native';
import React from 'react';
import {color, font} from '../../theme';

export default function ButtonSubmit({text, ...props}: any) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      className={`${props.marginTop ? 'mt-5' : ''} rounded-md p-3 w-full`}
      style={
        props.disabled || props.secondary
          ? {backgroundColor: color['gray-4'], elevation: 0}
          : {
              backgroundColor: color.primary,
              elevation: 2,
              shadowColor: color.primary,
            }
      }
      underlayColor={props.secondary ? color['gray-4'] : color.primaryDark}
      disabled={props.disabled}>
      <View className="overflow-hidden items-center">
        <Text
          className="text-center text-lg"
          style={{color: color.text, ...font.semibold}}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
