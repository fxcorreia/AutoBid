import Colors from '@app/styles/Colors'
import React, { memo } from 'react'
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  showLoading: boolean
  color?: string
  size?: number
}

const LOADING_SIZE = 35

const Loading = memo(({ style, showLoading, color, size }: Props) => {
  return (
    <View style={[styles.container, style]} testID="loading-container">
      <ActivityIndicator
        animating={showLoading ?? false}
        size={size ?? LOADING_SIZE}
        color={color ?? Colors.white}
        testID="loading-indicator"
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
})

export default Loading
