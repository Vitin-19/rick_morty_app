import { View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";
import { useState } from "react";

const CharacterDetailScreen = ({navigation}) => {
    const [character, setCharacter] = useState(null)

    const getCharacter = async() => {
        const id = await AsyncStorage.getItem('id');
        const response = await api.get(`/${id}`);
        try {
            const response = await api.get(`/${id}`);

            setCharacter({
                name: response.name,
                status: response.status,
                specie: response.species,
                gender: response.gender,
                origin: response.origin.name,
                location: response.location.name,
                image: response.image
            });

            console.log(character);
        } catch (error) {
            console.error("Erro ao definir personagem: ", error)
        }
    }

    useState(() => {
        setCharacter();
    })

    return (
        <View></View>
    )
}

export default CharacterDetailScreen;