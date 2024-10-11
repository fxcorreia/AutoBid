import { Platform } from 'react-native'

const Fonts = Platform.select({
  android: {
    SofiaPro: {
        light: {
            fontFamily: 'Sofia-Pro-Light',
        },
        medium: {
            fontFamily: 'Sofia-Pro-Medium',
        },
        bold: {
            fontFamily: 'Sofia-Pro-Semi-Bold-',
            fontWeight: 'bold' as 'bold',
        },
    },
  },
  ios: {
    SofiaPro: {
        light: {
            fontFamily: 'Sofia-Pro-Light',
            },
            medium: {
            fontFamily: 'Sofia-Pro-Medium',
            },
            bold: {
            fontFamily: 'Sofia-Pro-Semi-Bold-',
            fontWeight: 'bold' as 'bold',
            },
    },
  },
})

export default Fonts
