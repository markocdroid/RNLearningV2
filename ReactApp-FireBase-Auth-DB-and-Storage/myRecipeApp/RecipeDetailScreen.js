import React, {useEffect,useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image} from 'react-native';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIngredients(recipe.ingsAsArr);
    };

    fetchRecipes();
  }, []);

  return (
    <View style={{ padding: 20}}>
      <Text style={{ fontSize: 24 }}>{recipe.title}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Ingredients</Text>

      <FlatList
        data={ingredients}
        renderItem={({ item }) => (
            <Text style={{ fontSize: 12 }}>{item}</Text>
        )}
      />

      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Instructions</Text>
      <Text>{recipe.instructions}</Text>
      {recipe.imageUrl ? (
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={{ uri: recipe.imageUrl }} style={styles.uploadedImage}  />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({  
  uploadedImage: {
    width: '60%',
    // resizeMode: 'cover',    
    aspectRatio: 1,        // Maintain a 1:1 aspect ratio; adjust as needed
    height: undefined, 
    margin:'.5cm'
  },})
export default RecipeDetailScreen;

