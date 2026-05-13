import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { auth,db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const recipesCollection = collection(db, "recipes");
    const recipeSnapshot = await getDocs(recipesCollection);
    const recipeList = recipeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRecipes(recipeList);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Use useFocusEffect to fetch data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchRecipes();
    }, [])
  );

  const handleLogout = async ()=>{
    await signOut(auth);
  }

  const addRecipe = async ()=>{
    navigation.navigate('AddRecipe')
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.generalText}>Checkout the following recipes</Text>
      <View style={styles.pressableContainer}>
      <Pressable style={styles.button} onPress={addRecipe}>
        <Text style={styles.buttonText}>Add Recipe</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      </View>
      <View style={styles.recipesList}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
            <Text style={{ fontSize: 18, color:'purple' }}>- {item.title}</Text>            
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pressableContainer: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: '1cm',
  },
  recipesList: {
    flexDirection: 'column',
    width: '80%',
    alignItems: 'flex-start'
  },
  button: {
    backgroundColor: 'cyan',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  generalText: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: '1cm'
  },
});

export default HomeScreen;

