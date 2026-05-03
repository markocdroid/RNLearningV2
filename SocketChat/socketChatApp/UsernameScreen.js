// UsernameScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import * as Yup from 'yup';

export default function UsernameScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const usernameSchema = Yup
        .string()
        .trim()
        .required('Username cannot be empty');

    const handleValidation = async () => {
        try {
            // 2. Validate the hook value directly
            await usernameSchema.validate(username);
            setError(''); // Clear errors if valid
            handleContinue();
        } catch (err) {
            // 3. Catch the validation error and update your error state
            setError(err.message);
        }
    };

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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Pressable style={styles.button} onPress={handleValidation}>
                <Text style={{ color: "white" }}>Continue to Chat</Text>
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
        width: '60%'
    }
});