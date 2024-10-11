import { Platform } from 'react-native'
const Images = {
    carPlaceholder: require('@assets/images/car_placeholder.png'),
}

/**
 * Images that are bundled in Android and iOS native projects.
 */
const BundledImages = Platform.select({
  android: {
    // bannerBackground: 'banner_background',
  },
  ios: {
    // bannerBackground: 'BannerBackground',
  },
})

export { BundledImages }

export default Images
