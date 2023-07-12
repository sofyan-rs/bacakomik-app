/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Pressable, Text} from 'react-native';
import TabNavigationIcon from './TabNavigationIcon';
import {color, font} from '../../theme';
import {OrientationContext} from '../../context/OrientationContext';

const TabBar = ({state, descriptors, navigation}: any) => {
  const {isLandscape} = useContext(OrientationContext);

  return (
    <View
      className={`${
        isLandscape ? 'top-0 pt-4' : 'w-full flex-row'
      } absolute bottom-0`}
      style={{
        elevation: 10,
        backgroundColor: color['gray-3'],
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            className={isLandscape ? '' : 'flex-1 justify-center items-center'}>
            <Pressable onPress={onPress}>
              <View
                className={`justify-center items-center pb-4 ${
                  isLandscape ? 'px-4' : ''
                }`}>
                <View
                  className={
                    isLandscape
                      ? 'absolute right-0 h-full w-1 rounded-l-lg'
                      : 'w-full h-1 rounded-b-lg'
                  }
                  style={{
                    backgroundColor: isFocused ? color.primary : 'transparent',
                  }}
                />
                <TabNavigationIcon route={label} isFocused={isFocused} />
                <View>
                  <Text
                    className="text-xs"
                    style={
                      isFocused
                        ? {
                            color: color.primary,
                            ...font.semibold,
                          }
                        : {
                            color: color['gray-5'],
                            ...font.medium,
                          }
                    }>
                    {label}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default TabBar;
