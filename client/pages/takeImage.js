import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { CLOUDINARY_URL, UPLOAD_PRESET } from '@env';
import LottieView from 'lottie-react-native';

export default function ImagePick({ navigation, route }) {
    const [imagePicked, setImagePicked] = useState('');
    const [loading, setLoading] = useState(false);
    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted)
          alert('You need to enable permission to access the library.')
    }

    useEffect(async () => {
        requestPermission(); 
        pickImage();
    }, []);

    const pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true
        });
      
        if (pickerResult.cancelled === true) {
            navigation.navigate('main');
            return;
        }
        setLoading(true);
        setImagePicked(pickerResult.uri);
      
        let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
      
        let data = {
            "file": base64Img,
            "upload_preset": UPLOAD_PRESET,
        }
      
        const res = await fetch(CLOUDINARY_URL, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        })
        
        let result = await res.json();
        result = result.url;
        setLoading(false);
        navigation.navigate(route.params.pageName, { result: result, mainImage: imagePicked })
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {loading && <LottieView source={require('../assets/loading.json')} loop autoPlay/>}
        </View>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Button title="Pick an image from camera roll" onPress={pickImage} />
        //     {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        // </View>
    )
}