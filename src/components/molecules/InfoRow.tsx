import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../atoms/Text'
import { typography } from '@theme/typography'
import { colors } from '@theme/colors'

type Props = {
  label: string
  value: string | number
  isDark: boolean
}

const InfoRow = ({ label, value, isDark }: Props) => {
  return (
    <View style={styles.row}>
      <Text size={typography.sm} color={isDark ? colors.text.mutedDark : colors.text.mutedLight}>{label}</Text>
      <Text size={typography.sm} color={isDark ? colors.text.dark : colors.text.light}>{String(value)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
})

export default React.memo(InfoRow)
