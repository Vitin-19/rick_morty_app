import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersListScreen from './src/screens/CharactersListScreen';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';

const Stack = createStackNavigator()

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='list'/>
        <Stack.Screen component={CharacterDetailScreen} name='details'/>
        <Stack.Screen component={CharactersListScreen} name='list'/>
      </NavigationContainer>
  );
}


