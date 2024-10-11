import NavigationManager from '@app/navigation/helpers/NavigationManager'
import NavigationService from '@app/navigation/helpers/NavigationService'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'> & {}

const ProfileScreen = ({}: Props) => {
//   const [t] = useTranslation()

  const navigateSearchScreen = async () => {
    console.log('goto search')
    NavigationService.goBack()
 }

console.log('---> ProfileScreen')
  return (
    <View style={styles.container}>
      <Text style={{marginTop:103, color:"#000000"}}>ProfileScreen</Text>
      <Button title={'nav'} onPress={navigateSearchScreen} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ea13ea'
  },
})

export default ProfileScreen
