import Orientation, {
  LANDSCAPE,
  OrientationType,
} from 'react-native-orientation-locker';
import {useEffect, useState} from 'react';
import {Dimensions, Platform, ScaledSize} from 'react-native';

export const useOrientation = () => {
  const [screenOrientation, setScreenOrientation] = useState(
    Orientation.getInitialOrientation(),
  );

  const isAndroid = () => {
    return Platform.OS === 'android';
  };

  useEffect(() => {
    const onChange = (result: OrientationType) => {
      setScreenOrientation(result);
    };

    const onChangeAndroid = (result: {screen: ScaledSize}) => {
      return onChange(
        result.screen.height > result.screen.width
          ? OrientationType.PORTRAIT
          : OrientationType['LANDSCAPE-LEFT'],
      );
    };

    if (isAndroid()) {
      Dimensions.addEventListener('change', onChangeAndroid);
    } else {
      Orientation.addOrientationListener(onChange);
    }

    return () => {
      if (isAndroid()) {
        const subscription = Dimensions.addEventListener(
          'change',
          onChangeAndroid,
        );
        subscription.remove();
      } else {
        Orientation.removeOrientationListener(onChange);
      }
    };
  }, []);

  return {
    isLandscape: screenOrientation.includes(LANDSCAPE),
    screenOrientation,
  };
};
