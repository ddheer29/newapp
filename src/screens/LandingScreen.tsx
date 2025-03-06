import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, screenWidth } from '../constants/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const LandingScreen: FC = () => {
  const navigation = useNavigation()
  return (
    <ImageBackground source={{ uri: "https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg" }} style={{ flex: 1 }}>

      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 8, paddingHorizontal: 12 }}>
        <Image
          source={{ uri: "https://i.pinimg.com/736x/d0/9c/c8/d09cc8bad312cb9650599f0d68ae81aa.jpg" }}
          style={{ width: 180, height: 180, borderTopLeftRadius: 100, borderTopRightRadius: 100, borderBottomRightRadius: 100 }}
        />
        <Image
          source={{ uri: "https://i.pinimg.com/736x/c7/28/50/c72850a79d6ab50529524157943c89ce.jpg" }}
          style={{ width: 180, height: 180, borderRadius: 100 }}
        />
        <Image
          source={{ uri: "https://i.pinimg.com/736x/65/4f/b8/654fb8040d09e32a5034ac5be39602df.jpg" }}
          style={{ width: 180, height: 180, borderRadius: 100 }}
        />
        <Image
          source={{ uri: "https://i.pinimg.com/736x/81/d9/e8/81d9e800bff3c020cb10fada621edd45.jpg" }}
          style={{ width: 180, height: 180, borderTopLeftRadius: 100, borderTopRightRadius: 100, borderBottomLeftRadius: 100, }}
        />
      </View>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: '#000',
              marginBottom: 10,
              fontWeight: 'bold',
            }}>{'Enjoy the new exprerience of\nchating with global friends'}</Text>
        </View>
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
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 100, width: screenWidth * 0.78 }} onPress={() => navigation.navigate('TabNavigator')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: '#fff',
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 'bold',
              }}
            >Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#666',
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
            }}
          >Powerd by{' '}</Text>
          <View style={{ transform: [{ rotate: '45deg' }] }}>
            <MaterialCommunityIcons
              name="gamepad-circle-outline"
              size={16}
              color={Colors.primary}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#121212',
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
            }}>{' '}ussage</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

export default LandingScreen

const styles = StyleSheet.create({})