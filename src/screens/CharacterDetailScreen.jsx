import { StyleSheet, View, Image, Text } from "react-native"
import { api } from "../utils/dotenv";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const CharacterDetailScreen = ({ route, navigation }) => {
    const [character, setCharacter] = useState(null)

    const getCharacter = async () => {
        const id = route.params.id;
        try {
            const response = await api.get(`/${id}`);

            setCharacter({
                name: response.data.name,
                status: response.data.status,
                specie: response.data.species,
                gender: response.data.gender,
                origin: response.data.origin.name,
                location: response.data.location.name,
                image: response.data.image
            });

        } catch (error) {
            console.error("Erro ao definir personagem: ", error)
        }
    }

    useEffect(() => {
        const fetchCharacter = async () => {
            await getCharacter()
        }
        fetchCharacter();
    }, [])

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            {character && (
                <View style={styles.info}>
                    <Image source={{ uri: character.image }} style={styles.image} />
                    <View style={styles.txt}>
                        <Text style={styles.infotxt}>Nome: {character.name}</Text>
                        <Text style={styles.infotxt}>Status: {character.status}</Text>
                        <Text style={styles.infotxt}>Especie: {character.specie}</Text>
                        <Text style={styles.infotxt}>Gênero: {character.gender}</Text>
                        <Text style={styles.infotxt}>Origem: {character.origin}</Text>
                        <Text style={styles.infotxt}>Localização: {character.location}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#10504eff",
    },
    info: {
        flex: 1,
        flexDirection: "column",
        marginTop: 170,
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    txt: {
        flex:1,
        flexDirection:"column",
        marginTop:20,
        marginHorizontal:50
    },
    infotxt:{
        color:"#ffffff",
        fontSize: 23, 
    }
})

export default CharacterDetailScreen;