import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/dotenv.js";
import Header from "../components/Header.jsx";
import CharacterCard from "../components/CharacterCard.jsx";


const CharactersListScreen = ({navigation}) => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [search, setSearch] = useState("")
    const[page, setPage] = useState(1);
    const[isLoading, setIsloading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(false);


    const getCharacters = async(currentPage) => {
        if(isLoading) return;

        setIsloading(true);
        setIsInitialLoading(true)
        
        try {
            const response = await api.get(`/?page=${currentPage}`);
            setCharacters((prevCharacters) => {
                const newCharacters = response.data.results.filter((newChar) => !prevCharacters.some((char) => char.id === newChar.id))
                
                return prevCharacters.concat(newCharacters);
            }); 
            console.log(`Personagens da página ${currentPage} buscados e registrados com sucesso`);
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

    const refreshList = async() => {
        setIsRefreshing(true)
        
        try {
            const response = await api.get(`/?page=1`);
            setCharacters(response.data.results); 
            console.log("Personagens buscados e registrados com sucesso");
            setPage(1)
        } catch (error) {
            console.error("Erro ao buscar os personagens: ", error);
        } finally{
            setIsRefreshing(false);
        }
    }

    useEffect(() => {
        filterCharacters(search);
    }, [search, characters]);

    useEffect(() => {
        getCharacters(page);
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
                    onEndReached={async() => {
                        try {
                            console.log("final")
                            if(!isLoading) {
                                setPage((prevPage) => {
                                    const nextPage = prevPage + 1;
                                    console.log(page,"\n", nextPage)
                                    getCharacters(nextPage);
                                    return nextPage         
                                });
                            }
                        } catch (error) {
                            console.error("error: ", error)
                            setPage(1)
                            await getCharacters();
                        }
                    }}
                    onEndReachedThreshold={0.50}
                    ListFooterComponent={
                        isLoading ? <View style={{flex:1,position:"absolute", width:"100%"}}><ActivityIndicator size="large" color="#02afc5" /></View> : null
                    }
                    refreshing={isRefreshing}
                    onRefresh={async() => await refreshList()}
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