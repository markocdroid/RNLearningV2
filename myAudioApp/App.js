import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { useState } from 'react';
import { Audio } from 'expo-av';
import { Picker } from 'react-native-web';

const sound1 = require('./assets/sampleAudioForReactnative.m4a');
const sound2 = require('./assets/Diviners_Ren_ Savannah_2026_Japanese_Version_NCS.m4a');

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

    const [sounds, setSounds] = useState([sound1, sound2])
    const [soundURI, setSoundURI] = useState(sounds[0])

    // Load and play the audio
    async function playSound() {
        if (sound === null) {
            // Load the sound for the first time
            const { sound: playbackObject } = await Audio.Sound.createAsync(
                soundURI, { shouldPlay: true }
            );
            setSound(playbackObject);
            await playbackObject.playAsync();  // Play the sound
            setIsPlaying(true);
        } else {
            const status = await sound.getStatusAsync();
            if (status.positionMillis === status.durationMillis) {
                // If sound finished, reset and play again
                await sound.setPositionAsync(0);
                await sound.playAsync();
                setIsPlaying(true);
            } else {
                // Resume playback from where it was paused
                await sound.playAsync();
                setIsPlaying(true);
            }
        }
    }
    // Pause the audio
    async function pauseSound() {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    }

    // Stop the audio and unload the sound
    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
            await sound.unloadAsync(); // Unload the sound when stopping
            setSound(null); // Reset sound object
        }
    }

    return (
        <View style={styles.container}>
            <Text>React Native Audio Playback App</Text>

            <View style={styles.container}>
                <Picker
                    selectedValue={soundURI}
                    onValueChange={(itemValue) => setSoundURI(itemValue)}
                >
                    <Picker.Item label="Test sound" value={sounds[0]} />
                    <Picker.Item label="NCS Song" value={sounds[1]} />

                </Picker>
            </View>


            <TouchableOpacity onPress={playSound}>
                <Image
                    source={require('./assets/play.png')}  // Local image file
                    style={styles.buttonImage}
                />

                <Text style={styles.text}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseSound}>
                <Image
                    source={require('./assets/pause.png')}  // Local image file
                    style={styles.buttonImage}
                />

                <Text style={styles.text}>Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={stopSound}>
                <Image
                    source={require('./assets/stop.png')}  // Local image file
                    style={styles.buttonImage}
                />

                <Text style={styles.text}>Stop</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImage: {
        width: 50,
        height: 50,
        margin: 50,
    },
    text: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});