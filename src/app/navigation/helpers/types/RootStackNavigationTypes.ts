import { VehicleModel } from '@data/model/VehicleModel'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type EmptyNavProps = undefined

export type SearchScreenNavProps = {
  value: string
}

export type VehicleDetailsNavProps = {
  data: VehicleModel
}

export type RootStackParamList = {
    Dashboard: EmptyNavProps
    Favourite: EmptyNavProps
    VehicleDetails: VehicleDetailsNavProps
    Filter: EmptyNavProps
}

export type RootStackParamListKeys = keyof RootStackParamList

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>