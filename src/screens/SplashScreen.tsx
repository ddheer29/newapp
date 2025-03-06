import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LandingScreen')
    }, 800);
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: '#666',
            marginTop: 10,
            marginBottom: 10,
            fontWeight: '500',
          }}
        >Connect people around the world for free</Text>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})