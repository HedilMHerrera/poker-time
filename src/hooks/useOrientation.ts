import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

export function useLandscapeLock() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {};
  }, []);
}
