import NavigationService from '@app/navigation/helpers/NavigationService'
import Styles from '@app/styles/Styles'
import { CarLogo, IconArrowBack, IconFavouriteEmptyColored, IconFavouriteFullColored, IconMenu } from '@assets/svg'

import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { memo, useCallback } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

type Props = {
  title: string
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  hasBackButton?: boolean
  hasMenu?: boolean
  hasLogo?: boolean
}

const Header = memo(({ title, style, titleStyle, hasBackButton, hasMenu, hasLogo }: Props) => {

  const navigation = useNavigation()
  
  const onBackPress = useCallback(() => {
    NavigationService.goBack()
  }, [])

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <View style={[styles.mainContainer, style]}>
      <View style={styles.viewLeft}>
        {hasBackButton && (
          <TouchableOpacity style={styles.viewButtons} onPress={onBackPress} testID="back-button" >
            <IconArrowBack height={20} testID="icon-arrow-back"/>
          </TouchableOpacity>
        )}
        {hasMenu && (
          <TouchableOpacity style={styles.viewButtons} onPress={openDrawer} testID="menu-button">
            <IconMenu height={30} width={30} testID="icon-menu"/>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.viewCenter}>
        {hasLogo && <CarLogo height={30} width={30} testID="car-logo" />}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      <View style={styles.viewRight}>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: 10,
    height: 40,
  },
  viewLeft: {
    flex: 0.3,
  },
  viewCenter: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewRight: {
    flex: 0.3,
  },
  viewButtons: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBack: {
    width: 24,
    height: 24,
  },
  title: {
    ...Styles.text.header,
  },
})

export default Header
