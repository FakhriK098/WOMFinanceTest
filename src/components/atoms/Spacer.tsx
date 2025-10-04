import React from 'react'
import { View } from 'react-native'

const Spacer = ({ size = 16 }: { size?: number }) => {
  return <View style={{ height: size, width: size }} />
}

export default React.memo(Spacer)
