import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Button, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native';
import { Surface } from 'gl-react-expo';
import ImageFilters, { Constants } from 'react-native-gl-image-filters';
import * as MediaLibrary from 'expo-media-library';
import FilterBase from '../components/CutomeFilterBase';
import arrow from '../assets/arrow.png';

const width = Dimensions.get('window').width - 40;

const settings = [
  {
    name: 'hue',
    minValue: 0,
    maxValue: 6.3,
  },
  {
    name: 'blur',
    minValue: 0,
    maxValue: 30,
  },
  {
    name: 'sepia',
    minValue: -5,
    maxValue: 5,
  },
  {
    name: 'sharpen',
    minValue: 0,
    maxValue: 15,
  },
  {
    name: 'negative',
    minValue: -2.0,
    maxValue: 2.0,
  },
  {
    name: 'contrast',
    minValue: -10.0,
    maxValue: 10.0,
  },
  {
    name: 'saturation',
    minValue: 0.0,
    maxValue: 2,
  },
  {
    name: 'brightness',
    minValue: 0,
    maxValue: 5,
  },
  {
    name: 'temperature',
    minValue: 0.0,
    maxValue: 40000.0,
  },
  {
    name: 'exposure',
    step: 0.05,
    minValue: -1.0,
    maxValue: 1.0,
  },
];

export default function CustomeFilter({ route, navigation }) {
  let [u, setU] = useState("");
  let image;
  let [state, setState] = useState({
    ...settings,
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
    exposure: 0,
  });

  const requestPermission = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if(!granted)
      alert('You need to enable permission to access the library.')
  }

  useEffect(async () => {
    setU(route.params.result);
    requestPermission(); 
  }, [])

  const getPerm = async () => {
    // const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if(!granted)
      alert('You need to enable permission to access the library.')
  }

  const handleSave = async (photo) => {
    getPerm();

    const assert = await MediaLibrary.createAssetAsync(photo);
    await MediaLibrary.createAlbumAsync("image", assert);
  }

  const saveImage = async () => {
    if (!image) return;

    const result = await image.glView.capture();
    console.log(result);
    handleSave(result.localUri)
  };

  const resetImage = () => {
    setState({
      ...Constants.DefaultValues
    })
  }

  const goBack = () => {
    navigation.navigate('main');
  }

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.headers}>
          <TouchableOpacity onPress={goBack} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Image source={arrow} style={styles.back} />
            <Text style={styles.t}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <>
                <Surface style={{ width, height: width }} ref={ref => (image = ref)}>
                  <ImageFilters {...state} width={width} height={width}>
                    {{ uri: u }}
                  </ImageFilters>
                </Surface>
                <View style={styles.filter}>
              {settings.map(filter => (
                <FilterBase
                  key={filter.name}
                  name={filter.name}
                  minimum={filter.minValue}
                  maximum={filter.maxValue}
                  onChange={value => setState({...state, [filter.name]: value })}
                />
              ))}
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={saveImage}
              >
                  <Text style={{color: '#fff'}}>Save Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={resetImage}
              >
                  <Text style={{color: '#fff'}}>Reset Filter</Text>
              </TouchableOpacity>
              {/* <Image source={require('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540sb_011%252Fexample-expo/GLView/b1575eb0-9480-419c-a8d0-69d0cebf5d78.jpeg')}/> */}
            </>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  content: { 
    marginTop: 31, 
    marginHorizontal: 20, 
    width: '100%',
    height: '90%',
    position: 'absolute',
    top: '7%',
    // backgroundColor: '#aaa'
  },
  button: { 
    // borderRadius: 10,
    width: '90%',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
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
    marginTop: 31,
  },
  back: {
    width: 20,
    height: 20,
  },
  t: {
    marginLeft: 10,
    fontSize: 20,
  },
  filter: {
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    width: '90%',
    padding: 5,
    paddingBottom: 10
  }
});
