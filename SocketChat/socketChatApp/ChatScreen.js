import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const socket = io('https://markocdev-3000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai');

export default function ChatScreen({ route }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { username } = route.params;

    useEffect(() => {
        // Listen for incoming messages
        socket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const messageData = {
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                sender: username
            };

            socket.emit('chatMessage', messageData);
            setMessage('');
        }
    };

    const renderMessage = ({ item }) => {
        const isCurrentUser = item.sender === username;
        return (
            <View style={[styles.messageContainer, isCurrentUser ? styles.sentMessage : styles.receivedMessage]}>
                <Image source={require('./assets/avatar.png')}
                    style={styles.userImage} />
                <Text style={styles.messageTime}>{item.time}</Text>
                {!isCurrentUser && <Text style={styles.messageTime}>{item.sender}</Text>}
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMessage}
            />  
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        padding: 8,
        borderRadius: 5,
        marginBottom: 10,
        maxWidth: '80%',
        flexDirection: 'row'
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1e7ff',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f1f1',
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: 'grey',
        marginHorizontal: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        borderRadius: 5,
    },

    userImage: {
        flex: 1,
        padding: 10,
        borderRadius: '50%',
        width: '150dp',
        height: '150dp',
        resizeMode: 'contain',
        marginEnd: '10dp',
    },
});
