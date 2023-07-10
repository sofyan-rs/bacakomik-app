import React from 'react';
import AppNavigation from './src/navigation/appNavigation';
import {useOrientation} from './src/hooks/useOrientation';
import {OrientationContext} from './src/context/OrientationContext';

function App(): JSX.Element {
  const {isLandscape, screenOrientation} = useOrientation();

  return (
    <OrientationContext.Provider value={{isLandscape, screenOrientation}}>
      <AppNavigation />
    </OrientationContext.Provider>
  );
}

export default App;
