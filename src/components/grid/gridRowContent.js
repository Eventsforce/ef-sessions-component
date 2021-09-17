import React, { useState, useCallback, useMemo } from 'react'
import { LabelTag } from 'SVComponents/labels/labelTag'
import { LabelList } from 'SVComponents/labels/labelList'
import { SessionTime } from 'SVComponents/sessionTime/sessionTime'
import { useStyle } from '@keg-hub/re-theme'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import PropTypes from 'prop-types'
import { SessionLink } from 'SVComponents/sessionLink'
import { EvfTextToggle } from 'SVComponents/textToggle'
import { View, Text, Drawer, Touchable, Icon } from '@keg-hub/keg-components'
import { useSessionLocation } from 'SVHooks/models'
import { BookingButton } from 'SVComponents/button/bookingButton'
import { SessionPresenters } from 'SVComponents/sessionDetails'
import { StateLabel } from '../labels/stateLabel'
import { EVFIcons } from 'SVIcons'

/**
 * @summary - Root Grid Row Container component
 * @type {React.Component}
 */
const GridRowMain = reStyle(Touchable)({
  fl: 1,
  flD: 'row',
  w: '100%',
})

/**
 * @summary - Container for holding content excluding labels
 * @type {React.Component}
 */
const ColumnMain = reStyle(View)({
  fl: 1,
  flD: 'column',
  pB: 10,
  pL: 10,
})

/**
 * @summary - Row container for displaying session time
 * @type {React.Component}
 */
const SessionTimeRow = reStyle(View)({
  flD: 'row',
  alI: 'flex-end',
})

/**
 * @summary - Wrapper around the session name and toggle icon for formatting
 * @type {React.Component}
 */
const InfoRow = reStyle(View)({
  fl: 1,
  flD: 'row',
  jtC: 'space-between',
  alI: 'flex-end',
  mT: 8,
})

/**
 * @summary - Wraps the text for a Sessions Location
 * @type {React.Component}
 */
const LocationText = reStyle(Text)(theme => ({
  ftSz: 16,
  lnH: 19,
  ftWt: '500',
  color: theme.colors.lightGray,
}))

/**
 * @summary - Drawer Icon to display it current toggle state
 * @type {React.Component}
 */
const ToggleIcon = reStyle(
  Icon,
  'styles'
)({
  container: {
    pR: 10,
    top: 2,
  },
})

/**
 * @summary - Root Drawer Container for holder all drawer content
 * @type {React.Component}
 */
const DrawerMain = reStyle(View)({
  flex: 1,
  pR: 15,
  pT: 10,
})

/**
 * @summary - Wraps the Booking Button, to allow setting its max-width
 * @type {React.Component}
 */
const ButtonWrapper = reStyle(View)({
  maxWidth: 115,
})

/**
 * @summary - Renders the content of the drawer component when opened
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 */
const DrawerContent = ({ session }) => {
  return (
    <DrawerMain>
      <ButtonWrapper>
        <BookingButton session={session} />
      </ButtonWrapper>
      <SessionPresenters session={session} />
      <EvfTextToggle text={session.summary} />
    </DrawerMain>
  )
}

/**
 * @summary - Root Grid Row Container component
 * @type {React.Component}
 */
const GridRowMain = reStyle(Touchable)({
  fl: 1,
  flD: 'row',
  w: '100%',
})

/**
 * @summary - Container for holding content excluding labels
 * @type {React.Component}
 */
const ColumnMain = reStyle(View)({
  fl: 1,
  flD: 'column',
  pB: 10,
  pL: 10,
})

/**
 * @summary - Row container for displaying session time
 * @type {React.Component}
 */
const SessionTimeRow = reStyle(View)({
  flD: 'row',
  alI: 'flex-end',
})

/**
 * @summary - Root Drawer Container for holder all drawer content
 * @type {React.Component}
 */
const DrawerMain = reStyle(View)({
  flex: 1,
  pR: 15,
  pT: 10,
})

/**
 * @summary - Wraps the Booking Button, to allow setting its max-width
 * @type {React.Component}
 */
const ButtonWrapper = reStyle(View)({
  maxWidth: 115,
})

/**
 * @summary - Wraps the text for a Sessions Location
 * @type {React.Component}
 */
const LocationText = reStyle(Text)(theme => ({
  mT: 8,
  ftSz: 16,
  lnH: 19,
  ftWt: '500',
  color: theme.colors.lightGray,
}))

/**
 * @summary - Renders the content of the drawer component when opened
 * @param {object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {object} props.styles
 */
const DrawerContent = ({ session }) => {
  return (
    <DrawerMain>
      <ButtonWrapper>
        <BookingButton session={session} />
      </ButtonWrapper>
      <SessionPresenters session={session} />
      <EvfTextToggle text={session.summary} />
    </DrawerMain>
  )
}

/**
 * The content of a grid item when displayed as a row (<= 480px width)
 * @param {Object} props
 * @param {Array} props.labels - the array of label model objects
 * @param {import('SVModels/session').Session} props.session - the session model object
 * @param {Object} props.labelStyles - styles for individual labels
 * @param {boolean} props.militaryTime - if true, use military time for dates
 */
export const GridRowContent = props => {
  const { labels, labelStyles, listStyles, session, militaryTime } = props
  const [ isOpen, setIsOpen ] = useState(false)
  const gridRowSessionTimeStyles = useStyle('gridItem.sessionTime')
  const locationName = useSessionLocation(session)

  const onToggle = useCallback(event => setIsOpen(!isOpen), [ isOpen, setIsOpen ])
  const Chevron = useMemo(
    () => (isOpen ? EVFIcons.ChevronUp : EVFIcons.ChevronDown),
    [isOpen]
  )

  return (
    <GridRowMain onPress={onToggle}>
      <LabelList
        style={listStyles}
        itemStyle={labelStyles}
        LabelComponent={LabelTag}
        labels={labels}
      />
      <ColumnMain>
        <SessionTimeRow>
          <SessionTime
            style={gridRowSessionTimeStyles.main}
            start={session.startDateTimeLocal}
            end={session.endDateTimeLocal}
            military={militaryTime}
          />
          { !isOpen && <StateLabel session={session} /> }
        </SessionTimeRow>
        <SessionLink text={session.name} />
        <InfoRow>
          <LocationText className={'ef-modal-body-highlight'}>
            { locationName?.name || '' }
          </LocationText>
          <ToggleIcon
            Element={Chevron}
            height={23}
            width={18}
          />
        </InfoRow>
        <Drawer toggled={isOpen}>
          <DrawerContent session={session} />
        </Drawer>
      </ColumnMain>
    </GridRowMain>
  )
}

GridRowContent.propTypes = {
  labels: PropTypes.array,
  session: PropTypes.object,
  labelComponent: PropTypes.element,
  labelStyles: PropTypes.object,
}
