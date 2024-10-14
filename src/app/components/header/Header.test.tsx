import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React from 'react'
import Header from './Header'

jest.mock('@app/navigation/helpers/NavigationService', () => ({
  goBack: jest.fn(),
}))

const renderHeader = (props = {}) => {
  return render(
    <NavigationContainer>
      <Header title="Test Title" {...props} />
    </NavigationContainer>
  )
}

describe('Header Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = renderHeader()
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('does not show back button when hasBackButton is false', () => {
    const { queryByTestId } = renderHeader({ hasBackButton: false })
    expect(queryByTestId('back-button')).toBeNull()
  })

  it('does not show logo when hasLogo is false', () => {
    const { queryByTestId } = renderHeader({ hasLogo: false })
    expect(queryByTestId('car-logo')).toBeNull()
  })
})
