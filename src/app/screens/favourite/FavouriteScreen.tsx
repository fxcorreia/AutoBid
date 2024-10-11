import NavigationManager from '@app/navigation/helpers/NavigationManager'
import NavigationService from '@app/navigation/helpers/NavigationService'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Favourite'> & {}

const FavouriteScreen = ({}: Props) => {
//   const [t] = useTranslation()


console.log('---> FavouriteScreen')
  return (
    <View style={styles.container}>
      <Text style={{marginTop:103, color:"#000000"}}>FavouriteScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ea13ea'
  },
})

export default FavouriteScreen
