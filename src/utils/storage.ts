import AsyncStorage from '@react-native-async-storage/async-storage'

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch {}
}

export const getItem = async (key: string) => {
  try {
    const v = await AsyncStorage.getItem(key)
    return v
  } catch {
    return null
  }
}

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}
