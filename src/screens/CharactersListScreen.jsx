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
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleSearch  = (query) => {
        setSearch(query);
    }

    const getCharacters = async(currentPage) => {
        if(isLoading) return;

        setIsloading(true);
        
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
        }
    }

    const filterCharacters = async () => {
        try {
            if (search) {
                const filtered = characters.filter((char) =>
                    char.name.toLowerCase().includes(search.toLowerCase())
                );
                setFilteredCharacters(filtered);
            } else {
                setFilteredCharacters(characters); 
            }
        } catch (error) {
            console.error("Erro ao filtrar os personagens: ", error);
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
        const fetchCharacters = async() => {
            await getCharacters();
        }
        fetchCharacters();
    }, []); 

    useEffect(() => {
        const getSearch = async () => {
            await filterCharacters();
        };
        getSearch();
    }, [characters]); 

    useEffect(() => {
        if(search){
            console.log(search);
            setFilteredCharacters(characters.forEach((char) => {
                if(char.includes(search)) setFilteredCharacters(filterCharacters.concat(char))
            }))
        }
    }, [])

    return (
        <View style={styles.container}>
            <Header navigation={navigation} onSearch={handleSearch}/>
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
                        isLoading ? <ActivityIndicator size="large" color="#02afc5" /> : null
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