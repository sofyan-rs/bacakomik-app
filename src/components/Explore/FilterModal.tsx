/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import PopupModal from '../Modal/PopupModal';
import {color, font} from '../../theme';
import {CheckCircle2Icon} from 'lucide-react-native';
import ButtonSubmit from '../Button/ButtonSubmit';
import {OrientationContext} from '../../context/OrientationContext';

interface Props {
  showModalFilter: boolean;
  setShowModalFilter: (showModalFilter: boolean) => void;
  status: string;
  setStatus: (status: string) => void;
  type: string;
  setType: (type: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export default function FilterModal({
  showModalFilter,
  setShowModalFilter,
  status,
  setStatus,
  type,
  setType,
  sortBy,
  setSortBy,
}: Props) {
  const {isLandscape} = useContext(OrientationContext);

  const [filterStatus, setFilterStatus] = useState(status);
  const [filterType, setFilterType] = useState(type);
  const [filterSortBy, setFilterSortBy] = useState(sortBy);

  const submitFilter = () => {
    setStatus(filterStatus);
    setType(filterType);
    setSortBy(filterSortBy);
    setShowModalFilter(false);
  };

  useEffect(() => {
    if (showModalFilter) {
      setFilterStatus(status);
      setFilterType(type);
      setFilterSortBy(sortBy);
    }
  }, [showModalFilter, sortBy, status, type]);

  const typeList = [
    {id: 'all', name: 'Semua'},
    {id: 'manga', name: 'Manga'},
    {id: 'manhua', name: 'Manhua'},
    {id: 'manhwa', name: 'Manhwa'},
  ];

  const statusList = [
    {id: 'all', name: 'Semua'},
    {id: 'Ongoing', name: 'Ongoing'},
    {id: 'Completed', name: 'Completed'},
  ];

  const sortByList = [
    {id: 'update', name: 'Terbaru'},
    {id: 'popular', name: 'Populer'},
    {id: 'titleasc', name: 'Judul A-Z'},
    {id: 'titledesc', name: 'Judul Z-A'},
  ];

  return (
    <PopupModal
      modalVisible={showModalFilter}
      setModalVisible={setShowModalFilter}
      title="Filter Komik">
      <ScrollView className="max-h-full" showsVerticalScrollIndicator={false}>
        <View className={isLandscape ? 'mb-20' : 'mb-3'}>
          <View className="mb-4">
            <Text
              className="text-lg"
              style={{
                color: color.text,
                ...font.medium,
              }}>
              Tipe
            </Text>
            <View className="flex-row mt-2 space-x-2">
              {typeList.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setFilterType(item.id);
                  }}
                  className="px-3 py-2 rounded-md flex-row items-center space-x-1.5"
                  style={{
                    backgroundColor:
                      filterType === item.id ? color.primary : color['gray-2'],
                  }}>
                  {filterType === item.id && (
                    <CheckCircle2Icon color="white" size={18} />
                  )}
                  <Text
                    className="text-sm"
                    style={{
                      color: filterType === item.id ? 'white' : color['gray-5'],
                      ...font.semibold,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="mb-4">
            <Text
              className="text-lg"
              style={{
                color: color.text,
                ...font.medium,
              }}>
              Status
            </Text>
            <View className="flex-row mt-2 space-x-2">
              {statusList.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setFilterStatus(item.id);
                  }}
                  className="px-3 py-2 rounded-md flex-row items-center space-x-1.5"
                  style={{
                    backgroundColor:
                      filterStatus === item.id
                        ? color.primary
                        : color['gray-2'],
                  }}>
                  {filterStatus === item.id && (
                    <CheckCircle2Icon color="white" size={18} />
                  )}
                  <Text
                    className="text-sm"
                    style={{
                      color:
                        filterStatus === item.id ? 'white' : color['gray-5'],
                      ...font.semibold,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="mb-4">
            <Text
              className="text-lg"
              style={{
                color: color.text,
                ...font.medium,
              }}>
              Urutkan
            </Text>
            <View className="flex-row mt-2 space-x-2">
              {sortByList.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setFilterSortBy(item.id);
                  }}
                  className="px-3 py-2 rounded-md flex-row items-center space-x-1.5"
                  style={{
                    backgroundColor:
                      filterSortBy === item.id
                        ? color.primary
                        : color['gray-2'],
                  }}>
                  {filterSortBy === item.id && (
                    <CheckCircle2Icon color="white" size={18} />
                  )}
                  <Text
                    className="text-sm"
                    style={{
                      color:
                        filterSortBy === item.id ? 'white' : color['gray-5'],
                      ...font.semibold,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <ButtonSubmit text="Tampilkan" onPress={submitFilter} marginTop />
        </View>
      </ScrollView>
    </PopupModal>
  );
}
