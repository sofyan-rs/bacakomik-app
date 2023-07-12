import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import {useOrientation} from './src/hooks/useOrientation';
import {OrientationContext} from './src/context/OrientationContext';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {color} from './src/theme';

function App() {
  const {isLandscape, screenOrientation} = useOrientation();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      setAppIsReady(true);
      SplashScreen.hide();
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <OrientationContext.Provider value={{isLandscape, screenOrientation}}>
        <StatusBar barStyle="light-content" backgroundColor={color.primary} />
        <AppNavigation />
      </OrientationContext.Provider>
    </Provider>
  );
}

export default App;
