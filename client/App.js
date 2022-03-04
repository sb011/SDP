import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import ImagePick from './pages/takeImage';
import MainPage from './pages/mainPage';
import CustomeFilter from './pages/customeFilter';
import ImageEnch from './pages/imageEnch';
import ImageNeural from './pages/imageNeural';

// navigation
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="main" component={MainPage} />
    <Stack.Screen name="takeimage" component={ImagePick} />
    <Stack.Screen name="customeFilter" component={CustomeFilter} />
    <Stack.Screen name="imageench" component={ImageEnch} />
    {/* <Stack.Screen name="imageneural" component={ImageNeural} /> */}
  </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
