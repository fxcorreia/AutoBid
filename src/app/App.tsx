import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  useColorScheme
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import NavigationService from './navigation/helpers/NavigationService';
import RootStackNavigator from './navigation/navigators/RootStackNavigator';
import Colors from './styles/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import I18nConfig from '@i18n/I18nConfig';


const App = () =>  {
  const routeName = NavigationService.getCurrentRoute()?.name
  const [mountNavigation, setMountNavigation] = useState<boolean>(false)

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  enableScreens()


  const onNavigationReady = async () => {
    // TODO: hideSplashScreen()
  }

  const initializeApp = async () => {
    await I18nConfig.initialize()
    setMountNavigation(true)
  }

  useEffect(() => {
    initializeApp()
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor={'transparent'} />
        {mountNavigation && (<NavigationContainer
            ref={NavigationService.ref}
            onReady={onNavigationReady}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootStackNavigator />
            {/* TODO: <AppLoading />  */}
            </GestureHandlerRootView>
          </NavigationContainer>)}
      
    </SafeAreaProvider>
  );
}

export default App;
