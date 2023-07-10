import {View} from 'react-native';
import React, {useContext} from 'react';
import {OrientationContext} from '../../context/OrientationContext';

interface Props {
  children: JSX.Element;
}

export default function LayoutMain({children}: Props) {
  const {isLandscape} = useContext(OrientationContext);
  return (
    <View className={isLandscape ? 'ml-[86px]' : 'mb-16'}>{children}</View>
  );
}
