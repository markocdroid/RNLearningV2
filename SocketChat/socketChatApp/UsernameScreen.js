// UsernameScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function UsernameScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const handleContinue = () => {
    // Generate random name if username is empty
    const generatedUsername = username.trim() || `user${Math.floor(Math.random() * 1000)}`;
    // Navigate to ChatScreen with the username as a parameter
    navigation.navigate('ChatScreen', { username: generatedUsername });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your username"
        value={username}
        onChangeText={setUsername}
      />
      <Pressable style={styles.button} onPress={handleContinue}>
        <Text style={{color:"white"}}>Continue to Chat</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width:'60%'
  }
});