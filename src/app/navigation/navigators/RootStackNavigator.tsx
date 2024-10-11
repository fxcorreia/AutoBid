import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import DashboardScreen from '@app/screens/Dashboard/DashboardScreen'
import ProfileScreen from '@app/screens/Profile/ProfileScreen'
import SearchScreen from '@app/screens/SearchScreen/SearchScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AppTabNavigator } from './AppTab'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {
  return (
    <>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={'Dashboard'} component={DashboardScreen} />
        <RootStack.Screen name={'Profile'} component={ProfileScreen} />
        <RootStack.Screen name={'Search'} component={SearchScreen} />
      </RootStack.Navigator>

      {/* TODO: <AppLoading /> */}
    </>
  )
}

export default RootStackNavigator
