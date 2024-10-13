import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import DashboardScreen from '@app/screens/dashboard/DashboardScreen'
import VehicleDetailsScreen from '@app/screens/dashboard/VehicleDetailsScreen'
import FavouriteScreen from '@app/screens/favourite/FavouriteScreen'
import FilterScreen from '@app/screens/filter/FilterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator<RootStackParamList>()

const DashboardStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={'Dashboard'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Dashboard'} component={DashboardScreen} />
        <Stack.Screen name={'VehicleDetails'} component={VehicleDetailsScreen} />
        <Stack.Screen name={'Favourite'} component={FavouriteScreen} />
        <Stack.Screen name={'Filter'} component={FilterScreen} />
      </Stack.Navigator>
    </>
  )
}

export default DashboardStack
