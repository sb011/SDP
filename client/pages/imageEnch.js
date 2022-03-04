import { StyleSheet, View, Button, Image, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
// import * as ImagePicker from 'expo-image-picker'; 
import { create } from 'apisauce'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { CLOUDINARY_URL, LOCAL_URL } from '@env';
import LottieView from 'lottie-react-native';
import ActivityIndicator1 from '../components/ActivityIndicater1';
import arrow from '../assets/arrow.png';
import rArrow from '../assets/right-arrow.png';

export default function ImageEnch({ route, navigation }) {
  const api = create({
    baseURL: LOCAL_URL,
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
  const [selectedImage, setSelectedImage] = useState();
  let enchanment_img = null;
  const [main, setMain] = useState(null);
  const [ench, setEnch] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPerm = async () => {
    // const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted)
      alert('You need to enable permission to access the library.')
  }

  const getFile = async () => {
    getPerm();
    let image = ench;
    const localuri = await FileSystem.downloadAsync(
      image,
      FileSystem.documentDirectory + image.substring(image.lastIndexOf('/') + 1)
    )
    const asset = await MediaLibrary.createAssetAsync(localuri.uri)
    const album = await MediaLibrary.createAlbumAsync("image", asset);
  }


  const loadData = () => {
    setMain(route.params.result);
    // console.log("1");
    setLoading(true);
    api.post('/api', route.params.result)
      .then(response => {
        enchanment_img = response.data.url;
        // getFile(enchanment_img);
        setEnch(response.data.url);
        setLoading(false);
        // console.log("2");
      });
  }

  useEffect(() => {
    loadData();
  }, [])

  const goBack = () => {
    navigation.navigate('main');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading &&
        <LottieView loop autoPlay source={require('../assets/loading.json')} />
      }
      {!loading && 
      <View style={styles.container}>
        <View style={styles.headers}>
          <TouchableOpacity onPress={goBack} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Image source={arrow} style={styles.back} />
            <Text style={styles.t}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
              <View style={styles.imagecontainer}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                  <Image source={rArrow} style={{width: 10, height: 10, marginRight: -8}}/>
                  <Text style={styles.te}>Real Image</Text>
                </View>
                <View style={styles.x}>
                  <Image source={{ uri: main }} style={styles.i} />
                </View>
              </View>
              <View style={styles.imagecontainer}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                  <Image source={rArrow} style={{width: 10, height: 10, marginRight: -8}}/>
                  <Text style={styles.te}>Enhance Image</Text>
                </View>
                <View style={styles.x}>
                  {!ench && <ActivityIndicator style={styles.i} color='#000'/>}
                  {ench && <Image source={{ uri: ench }} style={styles.i} />}
                </View>
              </View>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <TouchableOpacity onPress={getFile} style={styles.button}>
                  <Text style={{color: '#fff'}}>Save Image</Text>
                </TouchableOpacity> 
              </View>
        </View>
      </View>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 31,
    flex: 1
  },
  headers: {
    position: 'absolute',
    width: '100%',
    height: '6%',
    top: 0,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 31,
  },
  back: {
    width: 20,
    height: 20,
  },
  t: {
    marginLeft: 10,
    fontSize: 20,
  },
  main: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    top: '8%',
    // backgroundColor: '#aaa',
  },
  imagecontainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
  },
  image: {
    width: "100%",
    height: "100%",
    position: 'absolute'
  },
  text: {
    textAlign: 'center'
  },
  te: {
    marginLeft: 15,
    fontSize: 15,
  },
  i: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  x: {
    backgroundColor: '#fff',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    // borderRadius: 10,
    marginTop: 10
  },
  button: { 
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
});