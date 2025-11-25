import { View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";


const CharactersListScreen = ({navigation}) => {
    const [characters, setCharacters] = useState(null);

    const getCharacters = async() => {
        try {
            const response = await api.get();
            setCharacters(response)
            console.log("Personagens buscados e registrados com sucesso");
        } catch (error) {
            console.error("Erro ao buscar os personagens: ", error)
        }
    }

    useEffect(() => {
        getCharacters();
    }, [])

    return (
        <View></View>
    )
}

export default CharactersListScreen;