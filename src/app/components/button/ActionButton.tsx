import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import React, { memo, useCallback } from 'react'
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native'

type Props = {
    label: string
    style?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
    onPress: () => void
}

const ActionButton = memo(({  label, style, labelStyle, onPress}: Props) => {
  const handlePress = useCallback(onPress, [onPress])

  return (
    <TouchableOpacity testID='action_button' style={[styles.mainContainer, style]} onPress={handlePress}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    width: 160,
    backgroundColor:Colors.primary,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 16
  },
  label: {
    ...Styles.text.button,
  },
})

export default ActionButton
