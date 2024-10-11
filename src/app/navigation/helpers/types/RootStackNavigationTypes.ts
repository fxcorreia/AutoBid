import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type EmptyNavProps = undefined;

export type SearchScreenNavProps = {
  value: string
}

export type RootStackParamList = {
    Dashboard: EmptyNavProps
    Profile: EmptyNavProps
    Search: SearchScreenNavProps
    Favourite: EmptyNavProps;
}

export type RootStackParamListKeys = keyof RootStackParamList

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;