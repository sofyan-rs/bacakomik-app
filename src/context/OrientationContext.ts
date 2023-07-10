import {createContext} from 'react';

export const OrientationContext = createContext<{
  isLandscape: boolean;
  screenOrientation: string | undefined;
}>({
  isLandscape: false,
  screenOrientation: undefined,
});
