/* eslint-disable react-native/no-inline-styles */
import {TouchableHighlight} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {ListFilterIcon} from 'lucide-react-native';

interface Props {
  setShowModalFilter: (showModalFilter: boolean) => void;
}

export default function FilterButton({setShowModalFilter}: Props) {
  return (
    <TouchableHighlight
      onPress={() => {
        setShowModalFilter(true);
      }}
      className="absolute bottom-5 right-0 z-30 p-5 m-5 rounded-full"
      style={{
        backgroundColor: color.primary,
        elevation: 5,
        shadowColor: color.primary,
      }}
      underlayColor={color.primaryDark}>
      <ListFilterIcon color="white" />
    </TouchableHighlight>
  );
}
