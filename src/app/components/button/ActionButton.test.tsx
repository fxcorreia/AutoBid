import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ActionButton from './ActionButton'

describe('ActionButton', () => {
  it('renders correctly with given label', () => {
    const { getByText } = render(
      <ActionButton label="Press me" onPress={() => {}} />
    )

    expect(getByText('Press me')).toBeTruthy()
  })

  it('calls onPress when button is pressed', () => {
    const mockOnPress = jest.fn() 
    const { getByTestId } = render(
      <ActionButton label="Press me" onPress={mockOnPress} />
    )

    fireEvent.press(getByTestId('action_button'))

    expect(mockOnPress).toHaveBeenCalled()
  })
})
