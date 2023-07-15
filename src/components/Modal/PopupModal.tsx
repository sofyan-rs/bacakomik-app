/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Animated,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color, font} from '../../theme';
import {RootSiblingParent} from 'react-native-root-siblings';
import {XIcon} from 'lucide-react-native';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function PopupModal({
  modalVisible,
  setModalVisible,
  title,
  children,
}: Props) {
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <RootSiblingParent>
        <View
          className="flex flex-col items-center justify-end h-full"
          style={{backgroundColor: color.overlay}}>
          <TouchableOpacity
            className="flex-1 w-full h-full"
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <Animated.View
            style={{
              translateY: slideAnim,
              backgroundColor: color['gray-3'],
            }}
            className="w-full overflow-hidden max-h-[90%]">
            <View
              className="border-b-2 border-dashed px-5 py-3"
              style={{
                borderColor: color['gray-2'],
              }}>
              <View className="flex-row justify-between items-center">
                <Text
                  className="text-lg text-center"
                  style={{
                    color: color.text,
                    ...font.semibold,
                  }}>
                  {title}
                </Text>
                <TouchableHighlight
                  className="p-2 rounded-full"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  underlayColor={color['gray-2']}>
                  <XIcon color={color.primary} size={30} strokeWidth={2} />
                </TouchableHighlight>
              </View>
            </View>
            <View className="p-5">{children}</View>
          </Animated.View>
        </View>
      </RootSiblingParent>
    </Modal>
  );
}
