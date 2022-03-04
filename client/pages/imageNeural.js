import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { create } from "apisauce";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { CLOUDINARY_URL, LOCAL_URL } from '@env';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function ImageNeural() {
  const api = create({
    baseURL: LOCAL_URL,
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [content, setContent] = useState(null);
  const [style, setStyle] = useState(null);
  const [iteration, setIteration] = useState(null);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  useEffect(async () => {
    requestPermission();
  }, []);

  const getPerm = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if(!granted)
      alert('You need to enable permission to access the library.')
  }

  const getFile = async (image) => {
    getPerm();
    
    const localuri = await FileSystem.downloadAsync(
      image,
      FileSystem.documentDirectory + image.substring(image.lastIndexOf('/')+1)
    )
    const asset = await MediaLibrary.createAssetAsync(localuri.uri)
    const album = await MediaLibrary.createAlbumAsync("image", asset);
    show_image = localuri.uri;
    console.log(album);
  }

  const openImagePickerAsync = async (type) => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
      });

      if (pickerResult.cancelled === true) {
        return;
      }

      setSelectedImage({ localUri: pickerResult.uri });

      let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

      let data = {
        file: base64Img,
        upload_preset: "nccmkvlk",
      };

      const res = await fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });

      const result = await res.json();
      if(type == "content"){
        setContent(result.url);
        console.log(content)
      }
      else if(type == "style"){
        setStyle(result.url);
        console.log(style)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    getPerm();
    let r = {
      "content": content,
      "style": style,
      "iteration": iteration
    }
    api.post("/", r).then((response) => {
      getFile(response.data.url);
    });
  }

  return (
    <SafeAreaView>
      {loading && <LottieView source={require('../assets/loading.json')} loop autoPlay/>}
      <View style={styles.container}>
        <View style={styles.main}>
          <TouchableOpacity style={styles.imageContainer} onPress={() => openImagePickerAsync("content")}>
            {!content && <MaterialCommunityIcons name="camera" size={40}/>}
            {content && <Image source={{ uri: content }} style={styles.image}/>}
          </TouchableOpacity>
          <Text style={styles.text}>Choose Image</Text>
        </View>
        
        <View style={styles.main}>
          <TouchableOpacity style={styles.imageContainer} onPress={() => openImagePickerAsync("style")}>
            {!style && <MaterialCommunityIcons name="camera" size={40}/>}
            {style && <Image source={{ uri: style }} style={styles.image}/>}
          </TouchableOpacity>
          <Text style={styles.text}>Choose style</Text>
        </View>
        <TextInput onChangeText={setIteration} value={iteration} />
        <TouchableOpacity onPress={onSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 31,
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: 350,
    height: 300,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  text: {
    textAlign: 'center'
  }
});
