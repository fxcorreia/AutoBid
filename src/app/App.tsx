import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  StatusBar
} from 'react-native'
import 'react-native-gesture-handler'

import ReduxStore from '@data/redux/ReduxStore'
import I18nConfig from '@i18n/I18nConfig'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import NavigationService from './navigation/helpers/NavigationService'
import RootStackNavigator from './navigation/navigators/RootStackNavigator'

const App = () =>  {
  enableScreens()

  const routeName = NavigationService.getCurrentRoute()?.name
  const [mountNavigation, setMountNavigation] = useState<boolean>(false)

  const onNavigationReady = async () => {
    // TODO: hideSplashScreen()
  }

  const initializeAppLanguage = async () => {
    await I18nConfig.initialize()
    setMountNavigation(true)
  }

  useEffect(() => {
    initializeAppLanguage()
  }, [])

  return (
    <Provider store={ReduxStore}>
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor={'transparent'} />
        {mountNavigation && (<NavigationContainer
            ref={NavigationService.ref}
            onReady={onNavigationReady}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootStackNavigator />
            </GestureHandlerRootView>
          </NavigationContainer>)}
      
    </SafeAreaProvider>
   </Provider>
  )
}

export default App
