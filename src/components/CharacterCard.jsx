import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const background_color = "#10504eff";

const CharacterCard = ({character, navigation}) => {

    return(
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate("Details", {id: character.id });
        }}>
                <Image source={{uri:character.image}} style={styles.image}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Nome: {character.name}</Text>
                    <Text style={styles.info}>Status: {character.status}</Text>
                    <Text style={styles.info}>Especie: {character.species}</Text>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        backgroundColor: background_color,
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:10,
        marginVertical:10,
        marginHorizontal:25,
        padding:20,
        height:150
    },
    infoContainer:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        height:100,
        marginLeft:10
    },
    info:{
        color:"#ffffff"
    },
    image:{
        width: 100, 
        height: 100, 
        borderRadius: 10, 
    }
})

export default CharacterCard;