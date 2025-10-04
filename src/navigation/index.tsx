import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { initAuth, logout } from '../store/slices/authSlice'
import { RootState, AppDispatch } from '../store'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import { ActivityIndicator, View, AppState } from 'react-native'
import { enableScreens } from 'react-native-screens'
import type { RootStackParamList } from '../types/navigation'

enableScreens(true)

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { token, initialized, expiresAt } = useSelector((s: RootState) => s.auth)

  useEffect(() => {
    dispatch(initAuth())
  }, [dispatch])

  useEffect(() => {
    if (!token || !expiresAt) return
    const now = Date.now()
    if (expiresAt <= now) {
      dispatch(logout())
      return
    }
    const id = setTimeout(() => dispatch(logout()), expiresAt - now)
    return () => clearTimeout(id)
  }, [token, expiresAt, dispatch])

  useEffect(() => {
    const sub = AppState.addEventListener('change', s => {
      if (s === 'active') {
        if (expiresAt && expiresAt <= Date.now()) dispatch(logout())
      }
    })
    return () => sub.remove()
  }, [expiresAt, dispatch])

  if (!initialized) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
