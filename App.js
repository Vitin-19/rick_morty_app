import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersListScreen from './src/screens/CharactersListScreen.jsx';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen.jsx';

const Stack = createStackNavigator()

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='List'>
          <Stack.Screen name='Details' component={CharacterDetailScreen} options={{headerShown:false}}/>
          <Stack.Screen name='List' component={CharactersListScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


