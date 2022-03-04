import { View, TouchableOpacity, Button, Text, StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import logo from '../assets/logo.png';
import bg from '../assets/bg7.jpg';
import bg2 from '../assets/bg5.jpg';
import { useFonts } from 'expo-font';


export default function MainPage({ navigation }) {
    const [loaded] = useFonts({
        "Lobster" : require('../assets/fonts/JosefinSans-Regular.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

    const customeFilter = () => {
        navigation.navigate("takeimage", { pageName: "customeFilter" })
    }
    const imageEnch = () => {
        navigation.navigate("takeimage", { pageName: "imageench" })
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.logobar}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={{color: '#000', width: 100, display: "flex", textAlign: "center", fontSize: 20, fontFamily: 'Lobster'}}>SHFilter</Text>
                </View>
                <View style={styles.MainPage}>
                    <TouchableOpacity onPress={customeFilter} style={styles.button}>
                        <Image source={bg} style={styles.bg}/>
                        <Text style={styles.btntext1}>Custome Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={imageEnch} style={styles.button}>
                        <Image source={bg2} style={styles.bg}/>
                        <View style={styles.as}>
                        <Text style={styles.btntext2}>Auto Image</Text>
                        <Text style={styles.btntext2}>Enhancement</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        height: '100%',
        width: '100%'
    },
    MainPage: {
        width: "100%",
        height: "75%",
        display: "flex",
        alignItems: "center",
    },
    logobar: {
        width: "100%",
        height: "25%",
        display: 'flex',
        flexDirection: 'column',
        marginTop: 31,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 10
    },
    logo: {
        width: 150,
        height: 150,
        // backgroundColor: "#aaaaaa"
    },
    logo_text: {
        color: '#000',
        // backgroundColor: '#000',
        width: 100,
        display: "flex",
        textAlign: "center",
        fontSize: 20,
    },
    button: {
        width: "90%",
        height: "38%",
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        position: 'relative'
    },
    bg: {
        width: "100%",
        height: '100%',
        position: 'absolute',
        borderRadius: 10
    },
    btntext1: {
        position: 'absolute',
        top: '70%',
        left: '45%',
        flex: 1,
        fontSize: 21,
        color: '#fff'
    },
    btntext2: {
        position: 'relative',
        flex: 1,
        fontSize: 21,
        color: '#fff',
    },
    as: {
        position: 'absolute',
        flex: 1,
        top: '60%',
        left: '10%'
    }
});