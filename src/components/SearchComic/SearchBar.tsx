/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import {ArrowLeftIcon, SearchIcon} from 'lucide-react-native';
import {color, font} from '../../theme';
import {useNavigation} from '@react-navigation/native';

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

export default function SearchBar({search, setSearch}: Props) {
  const navigate = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState(search);

  const submitSearch = () => {
    setSearch(searchText);
  };

  return (
    <View
      className="p-4 absolute top-0 left-0 right-0 z-30 space-x-3 flex-row justify-between items-center"
      style={{
        backgroundColor: color['gray-1'],
        elevation: 3,
        shadowColor: color['gray-3'],
      }}>
      <View className="flex-row items-center space-x-2 flex-1">
        <TouchableHighlight
          className="p-2 rounded-full"
          onPress={() => {
            navigate.goBack();
          }}
          underlayColor={color['gray-4']}>
          <ArrowLeftIcon color={color.primary} size={30} strokeWidth={2} />
        </TouchableHighlight>
        <TextInput
          className="text-lg flex-1 rounded-md py-2 px-4 border-[1.5px]"
          placeholder="Cari komik..."
          placeholderTextColor={color['gray-5']}
          style={{
            borderColor: isFocused ? color.primary : color['gray-4'],
            color: color.text,
            ...font.medium,
          }}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={submitSearch}
          inputMode="search"
        />
      </View>
      <TouchableHighlight
        onPress={submitSearch}
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
  );
}
