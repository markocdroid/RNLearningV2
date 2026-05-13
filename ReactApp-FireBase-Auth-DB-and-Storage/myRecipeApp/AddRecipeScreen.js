import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Pressable } from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Function to upload the image to Firebase Storage
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${new Date().getTime()}.jpg`);

    // Upload the image
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef); // Get the download URL
    return url; // Return the download URL
  };

  // Function to pick an image from the device's gallery
  const pickImage = async () => {
    // Request permission to access the gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const url = await uploadImage(result.assets[0].uri); // Upload the selected image
      setImageUrl(url); // Set the image URL
    }
  };

  const handleSubmit = async () => {
    if (title && ingredients && instructions) {
      let ingsAsArr = ingredients.split('\n')
      await addDoc(collection(db, "recipes"), {
        title,
        ingsAsArr,
        instructions,
        imageUrl
      });
      navigation.goBack();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.labelText}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Recipe Title" />

      <Text style={styles.labelText}>Ingredients</Text>
      <TextInput style={styles.textArea} value={ingredients} onChangeText={setIngredients} placeholder="Ingredients" multiline />

      <Text style={styles.labelText}>Instructions</Text>
      <TextInput style={styles.textArea} value={instructions} onChangeText={setInstructions} placeholder="Instructions" multiline />
      <View style={{flexDirection:'row'}}>
      <Text style={styles.labelText}>Upload Image </Text>
      <Pressable style={styles.browseButton} onPress={pickImage}>
        <Text style={styles.browseText}>Browse...</Text>
      </Pressable>
      </View>
      {imageUrl ? (
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image source={{ uri: imageUrl }} style={styles.uploadedImage}  />
        </View>
      ) : null}
      <View style={{justifyContent:'center', alignItems: 'center'}}>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Recipe</Text>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    height: 120, // Adjust height as needed
    justifyContent: 'flex-start',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top', // Aligns the text to the top of the text area
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  image: {
    width: 200,
    margin: 10,
  },
  browseButton: {
    backgroundColor: 'navy',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    margin: '.5cm',
    width:'60%'
  },
  button: {
    backgroundColor: 'cyan',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    margin: '.5cm',
    width:'60%'
  },
  browseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelText:{
    fontWeight:'bold',
    fontSize:16, 
    marginTop:'.5cm',
    marginBottom:'.5cm'
  },
  uploadedImage: {
    width: 300,
    height: 200,
    resizeMode: 'cover'    
  },})
export default AddRecipeScreen;

