import React from 'react'
import { render } from '@testing-library/react-native'
import Loading from './Loading' 
import Colors from '@app/styles/Colors'

describe('Loading Component', () => {
  it('renders correctly when showLoading is true', () => {
    const { getByTestId } = render(<Loading showLoading={true} />)
    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('applies custom size and color', () => {
    const { getByTestId } = render(
      <Loading showLoading={true} size={50} color="red" />
    )
    
    const activityIndicator = getByTestId('loading-indicator')

    expect(activityIndicator.props.size).toBe(50)
    expect(activityIndicator.props.color).toBe('red')
  })

  it('uses default size and color if not provided', () => {
    const { getByTestId } = render(<Loading showLoading={true} />)
    const activityIndicator = getByTestId('loading-indicator')

    expect(activityIndicator.props.size).toBe(35) 
    expect(activityIndicator.props.color).toBe(Colors.white) 
  })

  it('applies custom styles', () => {
    const { getByTestId } = render(
      <Loading showLoading={true} style={{ backgroundColor: 'blue' }} />
    )
    
    const container = getByTestId('loading-container')
    expect(container.props.style).toContainEqual(expect.objectContaining({ backgroundColor: 'blue' }))
  })
})
