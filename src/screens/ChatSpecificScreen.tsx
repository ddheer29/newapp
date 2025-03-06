import { Animated, FlatList, Image, Keyboard, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import chatData from '../data/chatData.json';
import { Colors } from '../constants/Colors';
import { KeyboardAvoidingView, ScrollView } from 'react-native'

interface ChatSpecificScreenProps {
  profileImg: string;
  name: string;
}

const ChatSpecificScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const route = useRoute();
  const userData = route.params as ChatSpecificScreenProps;
  const [keyboardHeight] = useState<Animated.Value>(new Animated.Value(0));
  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState<string>('');
  const [iskeyboardOpen, setIskeyboardOpen] = useState<boolean>(false);
  const [inputFieldOnFocus, setInputFieldOnFocus] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  }

  function getRelativeTime(timestamp) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // handle midnight (0 hours)

    // Convert to string and pad single-digit hours
    const formattedHours = hours.toString().padStart(2, '0');

    return `${formattedHours}:${minutes} ${ampm}`;
  }


  const renderItem = ({ item, index }) => {
    console.log(item.image_url)
    return (
      <View style={{}}>
        <View style={[styles.messageContainer, item.sender === "me" ? styles.myMessage : styles.otherMessage]}>
          {
            item.image_url && (
              <Image
                source={{ uri: item.image_url }}
                style={{ width: "80%", height: 200, borderRadius: 10, marginBottom: 10 }}
              />
            )
          }
          <Text style={item.sender === "me" ? styles.mymessageText : styles.senderMessageText}>{item.message}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: item.sender === "me" ? 'flex-end' : 'flex-start', gap: 8 }}>
          <Text style={item.sender === "me" ? styles.messageTimestampme : styles.messageTimestampother}>{getRelativeTime(item.timestamp)}</Text>
          {
            item.sender === "me" && <Ionicons name='checkmark-done' size={16} color='#666' />
          }
        </View>
      </View>
    )
  }


  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(
      showEvent,
      (event) => {
        setIskeyboardOpen(true);
        Animated.timing(keyboardHeight, {
          toValue: event.endCoordinates.height,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      hideEvent,
      () => {
        setIskeyboardOpen(false);
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle='dark-content' backgroundColor='#fff' />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -10 : 0} // Adjust offset as needed
      >
        <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
          {/* Header */}
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
            }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 20
            }}>
              <TouchableOpacity onPress={handleGoBack}>
                <FontAwesome6 name='arrow-left-long' size={18} color='#333' />
              </TouchableOpacity>
              <Image source={{ uri: userData.profileImg }} style={{ width: 50, height: 50, borderRadius: 100 }} />
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{userData.name}</Text>
                <Text style={{ color: 'green', fontSize: 12 }}>Online</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <Feather name='video' size={24} color='#666' />
              <Feather name='phone' size={24} color='#666' />
            </View>
          </View>

          {/* Messages */}
          <View style={{ flex: 1, paddingHorizontal: 18 }}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
          </View>

          {/* Input Field */}
          <Animated.View style={[styles.inputContainer]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              borderRadius: 30,
              paddingHorizontal: 18,
              backgroundColor: '#f9f9f9',
              paddingVertical: 16,
              justifyContent: 'space-between',
            }}>
              <TextInput
                style={[styles.input]}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type here..."
                placeholderTextColor="gray"
                cursorColor={Colors.primary}
                onFocus={() => setInputFieldOnFocus(true)}
                onBlur={() => setInputFieldOnFocus(false)}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialCommunityIcons name="sticker-circle-outline" size={24} color={"#666"} />
                <Ionicons name="camera-outline" size={24} color={"#666"} />
              </View>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatSpecificScreen

const styles = StyleSheet.create({

  messageContainer: {
    padding: 10,
    borderRadius: 2,
    marginVertical: 5,
    maxWidth: '80%',
    paddingHorizontal: 18
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  messageSender: {
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 2,
    fontSize: 12,
  },
  mymessageText: {
    color: '#fff'
  },
  senderMessageText: {
    color: '#121212'
  },
  messageTimestampme: {
    fontSize: 10,
    color: '#121212',
    marginTop: 3,
    alignSelf: 'flex-end'
  },
  messageTimestampother: {
    fontSize: 10,
    color: '#121212',
    marginTop: 3,
    alignSelf: 'flex-start'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 28,
    paddingVertical: 30,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderRightWidth: 1,
    borderRightColor: '#666',
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#D8BFD8",
    padding: 10,
    borderRadius: 100,
    marginLeft: 10
  }
})