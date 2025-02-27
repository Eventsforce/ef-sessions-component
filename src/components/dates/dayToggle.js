import React from 'react'
import { UpdateDayButton } from './updateDayButton'
import { useTheme } from '@keg-hub/re-theme'
import { noOp } from '@keg-hub/jsutils'
import { View, Text } from '@old-keg-hub/keg-components'
import { isMobileSize } from 'SVUtils/theme'

/**
 * Simple day toggling component
 * @param {Object} props
 * @param {string} props.date - date shown inside of component
 * @param {number} props.dayNumber - day number shown inside of component
 * @param {boolean} props.disableDecrement - if true, greys out the decrement button
 * @param {boolean} props.disableIncrement - if true, greys out the increment button
 * @param {Function} props.onIncrement -- cb that runs when the increment-day button is pressed
 * @param {Function} props.onDecrement -- cb that runs when the decrement-day button is pressed
 */
export const DayToggle = props => {
  const {
    dayText = '',
    disableDecrement = false,
    disableIncrement = false,
    onIncrement = noOp,
    onDecrement = noOp,
  } = props

  const theme = useTheme()
  const mobileSize = isMobileSize(theme)
  const dayToggleStyles = theme.get('dayToggle')

  return (
    <View
      className='ef-sessions-date-selector'
      accessibilityLabel=''
      style={dayToggleStyles?.main}
    >
      { !mobileSize && (
        <UpdateDayButton
          styles={dayToggleStyles?.content?.decrement}
          type={'decrement'}
          disabled={disableDecrement}
          onDayChange={onDecrement}
        />
      ) }
      <Text
        className='ef-sessions-date-text'
        accessibilityRole='heading'
        accessibilityLevel='1'
        style={dayToggleStyles?.content?.text}
        numberOfLines={1}
      >
        { dayText }
      </Text>
      { !mobileSize && (
        <UpdateDayButton
          type='increment'
          styles={dayToggleStyles?.content?.increment}
          disabled={disableIncrement}
          onDayChange={onIncrement}
        />
      ) }
    </View>
  )
}
DayToggle.propTypes = {}
