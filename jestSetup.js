import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: jest.fn().mockImplementation(({ children }) => children),
  }
})

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  multiSet: jest.fn(),
  multiGet: jest.fn(),
  multiRemove: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(() => [{ languageTag: 'en', countryCode: 'US' }]),
  findBestLanguageTag: jest.fn(() => 'en'),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))
