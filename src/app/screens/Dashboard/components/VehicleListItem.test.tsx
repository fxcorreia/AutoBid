import { VehicleModel } from '@data/model/VehicleModel' 
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import VehicleListItem from './VehicleListItem' 

jest.mock('@assets/svg', () => {
  const { View } = require('react-native') 
  return {
    IconFavouriteEmpty: () => <View testID="icon-favourite-empty" />,
    IconFavouriteFull: () => <View testID="icon-favourite-full" />,
  }
})

jest.mock('react-i18next', () => ({
  useTranslation: () => [
    (key: string) => key, 
  ],
}))

const mockVehicle: VehicleModel = {
  id: '1',
  make: 'Toyota',
  model: 'Corolla',
  engineSize: '1.8L',
  fuel: 'Petrol',
  year: 2022,
  mileage: 10000,
  auctionDateTime: '2024-10-14T12:00:00Z',
  startingBid: 20000,
  favourite: false,
}

describe('VehicleListItem', () => {

  it('renders favourite icon as full when isFavourite is true', () => {
    const vehicleWithFavourite = { ...mockVehicle, favourite: true }

    const { getByTestId } = render(
      <VehicleListItem 
        item={vehicleWithFavourite} 
        onPress={jest.fn()} 
        onFavouritePress={jest.fn()} 
      />
    )

    expect(getByTestId('icon-favourite-full')).toBeTruthy() 
  })

  it('renders favourite icon as empty when isFavourite is false', () => {
    const { getByTestId } = render(
      <VehicleListItem 
        item={mockVehicle} 
        onPress={jest.fn()} 
        onFavouritePress={jest.fn()} 
      />
    )

    expect(getByTestId('icon-favourite-empty')).toBeTruthy() 
  })

  it('calls onPress when the main container is pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <VehicleListItem 
        item={mockVehicle} 
        onPress={onPressMock} 
        onFavouritePress={jest.fn()} 
      />
    )

    fireEvent.press(getByTestId('vehicle-list-item'))
    expect(onPressMock).toHaveBeenCalledWith(mockVehicle)
  })

  it('calls onFavouritePress when the favourite icon is pressed', () => {
    const onFavouritePressMock = jest.fn()
    const { getByTestId } = render(
      <VehicleListItem 
        item={mockVehicle} 
        onPress={jest.fn()} 
        onFavouritePress={onFavouritePressMock} 
      />
    )

    fireEvent.press(getByTestId('icon-favourite-empty'))
    expect(onFavouritePressMock).toHaveBeenCalledWith(mockVehicle)
  })
})
