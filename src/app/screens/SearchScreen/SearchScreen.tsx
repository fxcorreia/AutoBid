import NavigationManager from '@app/navigation/helpers/NavigationManager'
import NavigationService from '@app/navigation/helpers/NavigationService'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Search'> & {}

const SearchScreen = ({}: Props) => {
//   const [t] = useTranslation()

  const navigateSearchScreen = async () => {
    NavigationService.goBack()
  }
  console.log('SearchScreen')

  return (
    <View style={styles.container}>
      <Text>SearchScreen</Text>
      <Button title={'nav'} onPress={navigateSearchScreen} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eaeaea'
  },
})

export default SearchScreen
