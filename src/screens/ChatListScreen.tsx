import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import chatListData from '../data/chatListData';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, isAndroid } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../assets/svg/SearchIcon';
import PenIcon from '../assets/svg/PenIcon';

const ChatListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handlePressUser = (item) => {
    navigation.navigate('ChatSpecificScreen', {
      profileImg: item.profileImage,
      name: item.name,
    })
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.chatitem}
        onPress={() => handlePressUser(item)}
      >
        <View>
          <Image source={{ uri: item.profileImage }} style={{ width: 50, height: 50, borderRadius: 100 }} />
        </View>
        <View style={{ flex: 1, marginLeft: 12, gap: 4 }}>
          <Text
            numberOfLines={2}
          >{item.name}</Text>
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            {
              item.unreadMessages === 0 && <Ionicons name='checkmark-done' size={16} color='#666' />
            }
            <Text
              numberOfLines={1}>{item.lastMessage}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 8 }}>
          <Text>{item.time}</Text>
          {item.unreadMessages > 0 && (
            <View style={{ backgroundColor: Colors.primary, borderRadius: 100, width: 21, height: 21, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>{item.unreadMessages}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isAndroid && <View style={{ height: 50 }} />}
      <View style={{
        flex: 1,
        paddingHorizontal: 26,
      }}>
        {/* search bar */}
        <View style={styles.searchbarcontainer}>
          <View style={styles.inputfieldContainer}>
            {isAndroid ? <SearchIcon /> : <Icon name='search' size={24} color='#666' />}
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder='Search message...'
              placeholderTextColor={'#666'}
              cursorColor={Colors.primary}
            />
          </View>
          {isAndroid ? <PenIcon /> : <FontAwesome6 name='pen-to-square' size={24} color='#666' />}
        </View>

        {/* chat list */}
        <View style={styles.chatlist}>
          <FlatList
            data={chatListData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default ChatListScreen

const styles = StyleSheet.create({
  chatlist: {
    flex: 1,
  },
  chatitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  searchbarcontainer: {
    paddingHorizontal: 26,
    paddingVertical: 14,
    backgroundColor: '#fff',
    marginBottom: 18,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputfieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  }
})