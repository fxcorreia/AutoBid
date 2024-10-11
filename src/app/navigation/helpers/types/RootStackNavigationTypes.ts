import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type DashboardScreenNavProps = undefined
export type AppTabNavigationParams = undefined

export type SearchScreenNavProps = {
  value: string
}

export type RootStackParamList = {
    AppTab: AppTabNavigationParams
    Dashboard: DashboardScreenNavProps
    Profile: DashboardScreenNavProps
    Search: SearchScreenNavProps
}

export type RootStackParamListKeys = keyof RootStackParamList
