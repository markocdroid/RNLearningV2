import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const DiyHackDetailScreen = ({ route }) => {
    const { diyHack } = route.params;
    const [materialRequired, setMaterialRequired] = useState([]);

    useEffect(() => {
        const fetchDiyHacks = async () => {
            setMaterialRequired(diyHack.materialsAsArr);
        };

        fetchDiyHacks();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24 }}>{diyHack.title}</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Ingredients</Text>

            <FlatList
                data={materialRequired}
                renderItem={({ item }) => (
                    <Text style={{ fontSize: 12 }}>{item}</Text>
                )}
            />

            <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Instructions</Text>
            <Text>{diyHack.instructions}</Text>
            {diyHack.imageUrl ? (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: diyHack.imageUrl }} style={styles.uploadedImage} />
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
        margin: '.5cm'
    },
})
export default DiyHackDetailScreen;

