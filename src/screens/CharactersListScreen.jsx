import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { api } from "../utils/dotenv.js";
import Header from "../components/Header.jsx";
import CharacterCard from "../components/CharacterCard.jsx";


const CharactersListScreen = ({navigation}) => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [search, setSearch] = useState("")
    const[isLoading, setIsloading] = useState(false); 
    const [isInitialLoading, setIsInitialLoading] = useState(false);


    const getCharacters = async() => {
        if(isLoading) return;

        setIsloading(true);
        setIsInitialLoading(true)
        
        try {
            for(let i = 0; i < 43; i ++){
                const response = await api.get(`/?page=${i}`);
                setCharacters((prevCharacters) => {
                    const newCharacters = response.data.results.filter((newChar) => !prevCharacters.some((char) => char.id === newChar.id))
                    
                    return prevCharacters.concat(newCharacters);
                }); 
                console.log(`Personagens da página ${i} buscados e registrados com sucesso`);
            }
        } catch (error) {
            console.error("Erro ao buscar os personagens: ", error);
        }finally{
            setIsloading(false)
            setIsInitialLoading(false)
        }
    }

    const filterCharacters = async () => {
        setIsInitialLoading(true)
        try {
            if (search.length === 0) {
                setFilteredCharacters(characters); 
            } else {
                const filtered = characters.filter((char) =>
                char.name.toLowerCase().includes(search.toLowerCase())
                );
                setFilteredCharacters(filtered);
            }
        } catch (error) {
            console.error("Erro ao filtrar os personagens: ", error);
        }finally{
            setIsInitialLoading(false)
        }
    };


    useEffect(() => {
        filterCharacters(search);
    }, [search, characters]);

    useEffect(() => {
        getCharacters();
    }, []);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} onSearch={(text) => setSearch(text)}/>
            {isInitialLoading && (
                <View style={{flex:1,position:"absolute", width:"100%"}}><ActivityIndicator size="large" color="#02afc5" /></View>
            )}
            <View style={styles.list}>
                <FlatList
                    data={filteredCharacters}
                    keyExtractor={(char) => char.id.toString()}
                    renderItem={({item}) => <CharacterCard character={item} navigation={navigation}/>}
                    initialNumToRender={10}
                    ListFooterComponent={
                        isLoading ? <View style={{flex:1,position:"absolute", width:"100%"}}><ActivityIndicator size="large" color="#02afc5" /></View> : null
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    list:{
        flex:1,
        marginTop:170,
    }
})

export default CharactersListScreen;