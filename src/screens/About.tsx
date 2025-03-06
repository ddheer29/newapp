import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const About = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About</Text>
      </View>
    </SafeAreaView>
  )
}

export default About

const styles = StyleSheet.create({})