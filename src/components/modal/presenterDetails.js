import React from 'react'
import { useTheme, useDimensions } from '@svkeg/re-theme'
import { View, Text } from '@svkeg/keg-components'
import { Image, ScrollView } from 'react-native'
import { BaseModal, contentDefaultMaxHeight } from './baseModal'

const placeholderImage = require('SVAssets/profile_placeholder.png')
/**
 * PresenterDetailModal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 */
export const PresenterDetails = props => {
  const { presenter, visible } = props
  if (!presenter) return null

  const theme = useTheme()

  const presenterStyles = theme.get('modal.presenter') || {}
  const title = `${presenter.title} ${presenter.firstname} ${presenter.lastname}`

  return (
    <BaseModal
      styles={presenterStyles}
      title={title}
      visible={visible}
      BodyComponent={() => {
        return (
          <Body
            presenter={presenter}
            styles={presenterStyles.content.body}
          />
        )
      }}
    />
  )
}

const contentMaxHeights = {
  h50: { maxHeight: 50 },
  h100: { maxHeight: 100 },
  h200: { maxHeight: 200 },
}
/**
 * Body
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.theme - presenter theme from global theme
 */
const Body = ({ presenter, styles }) => {
  // need to update content height based on screen height
  const dim = useDimensions()
  const bioContentStyle =
    dim.height <= contentDefaultMaxHeight
      ? dim.height <= 600
          ? dim.height <= 350
              ? contentMaxHeights.h50
              : contentMaxHeights.h100
          : contentMaxHeights.h200
      : styles.row2.content.main

  // use small image style if height is small enough
  // otherwise use the dynamic styling from width
  const imageStyle =
    dim.height <= 450 ? styles.row1.smallImage : styles.row1.image

  return (
    <View
      dataSet={PresenterDetails.dataSet.content.body.main}
      style={styles.main}
    >
      { /* row 1 - image and titles */ }
      <View style={styles.row1.container}>
        <Image
          style={imageStyle}
          source={{
            uri: presenter.photographUrl
              ? presenter.photographUrl
              : placeholderImage,
          }}
        />
        <View style={styles.row1.details}>
          <Text
            style={styles.row1.title}
            numberOfLines={1}
          >
            { presenter.jobtitle }
          </Text>
          <Text
            style={styles.row1.company}
            numberOfLines={1}
          >
            { presenter.company }
          </Text>
        </View>
      </View>

      { /* row 2 - bio */ }
      { presenter.biography ? (
        <ScrollView
          style={styles.row2.main}
          contentContainerStyle={bioContentStyle}
        >
          <Text style={styles.row2.content.biography}>
            { presenter.biography }
          </Text>
        </ScrollView>
      ) : null }
    </View>
  )
}

PresenterDetails.dataSet = {
  content: {
    body: {
      main: { class: 'presenter-details-content-body-main' },
    },
  },
}
