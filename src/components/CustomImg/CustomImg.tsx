/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {Image, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {color} from '../../theme';

export default function CustomImg({urlImg}: {urlImg: string}) {
  const [widthImg, setWidthImg] = React.useState(0);
  const [heightImg, setHeightImg] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const {width} = Dimensions.get('window');

  React.useEffect(() => {
    // FastImage.preload([{uri: urlImg}]);
    Image.getSize(urlImg, (width, height) => {
      setWidthImg(width);
      setHeightImg(height);
    });
  }, [urlImg]);

  return (
    <>
      {loading && (
        <ActivityIndicator
          size="large"
          color={color.primary}
          className="my-4"
        />
      )}
      <FastImage
        style={{
          width: width,
          height: widthImg > 0 ? width / (widthImg / heightImg) : 0,
        }}
        source={{
          uri: urlImg,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
        onLoadEnd={() => setLoading(false)}
      />
    </>
  );
}
