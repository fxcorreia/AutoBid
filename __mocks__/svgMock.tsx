import React from 'react'
import { View, ViewProps } from 'react-native'

type SvgProps = ViewProps & {
  height?: number
  width?: number
  testID?: string 
}

export const IconArrowBack: React.FC<SvgProps> = (props) => <View {...props} testID="icon-arrow-back" />
export const IconMenu: React.FC<SvgProps> = (props) => <View {...props} testID="icon-menu" />
export const CarLogo: React.FC<SvgProps> = (props) => <View {...props} testID="car-logo" />
export const IconFavouriteEmptyColored: React.FC<SvgProps> = (props) => <View {...props} />
export const IconFavouriteFullColored: React.FC<SvgProps> = (props) => <View {...props} />
