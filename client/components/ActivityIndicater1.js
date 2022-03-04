import React from 'react';
import LottieView from 'lottie-react-native';

function ActivityIndicator1({ loading = false }) {
    if(loading == false)
        return null;

    return <LottieView source={require('../assets/loading.json')} loop autoPlay/>
}

export default ActivityIndicator1;