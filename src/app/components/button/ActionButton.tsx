
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import React from 'react'
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

const ActionButton = ({ label, style, labelStyle, onPress}: Props) => {
  return (
    <TouchableOpacity style={[styles.mainContainer, style]} onPress={onPress}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

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
