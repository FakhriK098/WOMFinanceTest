import React from 'react'
import { View, StyleSheet, useColorScheme } from 'react-native'
import Text from '../atoms/Text'
import type { AuthTemplateProps } from '@typings/components'
import { colors } from '@theme/colors'
import { spacing } from '@theme/spacing'
import { radius } from '@theme/radius'
import { typography } from '@theme/typography'
import Spacer from '../atoms/Spacer'

const AuthTemplate = ({ title, children }: AuthTemplateProps) => {
  const isDark = useColorScheme() === 'dark'
  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.background.dark : colors.background.light }]}>
      <View style={styles.card}>
        <Text weight="bold" size={typography.xxl} color={isDark ? colors.text.dark : colors.text.light}>
          {title}
        </Text>
        <Spacer size={spacing.xl} />
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
})

export default React.memo(AuthTemplate)
