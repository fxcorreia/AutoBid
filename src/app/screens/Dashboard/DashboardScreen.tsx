import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'> & {}

const DashboardScreen = ({}: Props) => {
//   const [t] = useTranslation()

  const navigateSearchScreen = async () => {
    console.log('goto search')
    // NavigationManager.navigateProfile()
    NavigationManager.navigateSearch({ value: '123' })
  }

  console.log('DashboardScreen')

  return (
    <View style={styles.container}>
      <Text style={{marginTop:103, color:"#000000"}}>DashboardScreen</Text>
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

export default DashboardScreen
