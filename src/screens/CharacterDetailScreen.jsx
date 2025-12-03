import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native"
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
            {!character && (
                <View style={{flex:1,position:"absolute", width:"100%"}}>
                    <ActivityIndicator size="large" color="#02afc5" />
                </View>
            )}
            {character && (
                <View style={styles.info}>
                    <Image source={{ uri: character.image }} style={styles.image} />
                    <View style={styles.txt}>
                        <Text style={styles.infotxt}>Name: {character.name}</Text>
                        <Text style={styles.infotxt}>Status: {character.status}</Text>
                        <Text style={styles.infotxt}>Specie: {character.specie}</Text>
                        <Text style={styles.infotxt}>Gender: {character.gender}</Text>
                        <Text style={styles.infotxt}>Origin: {character.origin}</Text>
                        <Text style={styles.infotxt}>Location: {character.location}</Text>
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
        boxShadow:'0px 2px 8px rgba(0, 0, 0, 0.15)'
    },
    txt: {
        flex:1,
        flexDirection:"column",
        marginVertical:20,
        marginHorizontal:50,
        paddingTop:10,
        backgroundColor: "#1d9593",
        opacity: 0.9,
        width:300,
        height:50,
        borderRadius:10,
        marginBottom:40,
        boxShadow:'0px 2px 8px rgba(0, 0, 0, 0.15)'
    },
    infotxt:{
        color:"#ffffff",
        fontSize: 22,
        marginBottom: 10,
        marginHorizontal:10,
    }
})

export default CharacterDetailScreen;