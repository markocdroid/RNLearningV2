// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import { Platform } from 'react-native';


const platform = Platform.OS;
const { width, height } = Dimensions.get('window');

const App = () => {
  const [ballPosition, setBallPosition] = useState({ top: 0, left: 0 });
  const [score,setScore] = useState(0)
  const [attempts,setAttempts] = useState(0)
  
  useEffect(() => {
    moveBall();
  }, []);

  const moveBall = () => {
    const top = Math.random() * (height * 0.4); // Restricting movement to 40% of screen height (yellow box)
    const left = Math.random() * ((width * 0.9) - 25); // 90% width of yellow box minus ball size
    setBallPosition({ top, left });
  };

  const handleBallClick = () => {
    setAttempts(attempts + 1);
    setScore(score + 1);
    if(attempts == 9) {
        checkGameStatus();
    } else {
      moveBall();  
    }
  };

  const handleMissClick = () => {
    setAttempts(attempts + 1);
    if(attempts == 9) {
      checkGameStatus();
    } else {
      moveBall();
    }
  };

  const checkGameStatus = () => {
    if (score >= 9) {
      if (platform == 'web') {
        window.alert('You Win! You clicked the ball correctly 10 out of 10 times!')
        resetGame();
      } else {
            Alert.alert('You Win!', 'You clicked the ball correctly 10 out of 10 times!', [
            { text: 'Play Again', onPress: resetGame },
            ]);
        }
      } else {
        if (platform == 'web') {
          window.alert('You Lose! Try again to click the ball 10 times!');
          resetGame();
        } else {
          Alert.alert('You Lose', 'Try again to click the ball 10 times!', [
          { text: 'Play Again', onPress: resetGame },
          ]);
        }
    }
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    moveBall();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Click the ball 10 times to win!</Text>
      <Text style={styles.score}>Score: {score} / {attempts}</Text>
      <View style={styles.yellowBox} onStartShouldSetResponder={handleMissClick}>
        <Pressable
          style={[styles.ball, { top: ballPosition.top, left: ballPosition.left }]}
          onPress={handleBallClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  instructions: {
    fontSize: 18,
    marginBottom: 10,
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
  },
  yellowBox: {
    width: '90%',
    height: height * 0.8,
    backgroundColor: 'yellow',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'blue',
  },
});

export default App;
