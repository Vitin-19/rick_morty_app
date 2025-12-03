import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Search } from "lucide-react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const iconColor = "#02afc5";
const background_color = "#10504eff";

const Header = ({ navigation, onSearch }) => {
    const route = useRoute();

    const [isSearching, setIsSearching] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.icons}>
                    {route.name == "Details" && (
                        <TouchableOpacity onPress={() => {
                            if(route.name === "Details") navigation.goBack()
                        }} style={styles.backContainer}>
                            <Text style={{ color: iconColor, fontSize: 40 }}>{"<"}</Text>
                        </TouchableOpacity>
                    )}
                    {route.name === "List" && (
                        <TouchableOpacity onPress={() => setIsSearching(!isSearching)} style={styles.searchIconContainerr}>
                            <Search color={iconColor} size={25} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require("../images/RickAndMortyLogo.png")} style={styles.logo} />
                </View>
            </View>
            {isSearching && (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Character"
                        placeholderTextColor="#ffffff70"
                        onChangeText={onSearch}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        height:155,
        position:"absolute",
        width: "100%",
    },
    header: {
        position: "absolute",
        flex: 1,
        flexDirection: "row",
        backgroundColor: background_color,
        justifyContent: "space-between",
        alignItems: "center",
        top: 0,
        height: 115,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    icons: {
        position: "absolute",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        left: 30,
        marginTop: 9
    },
    backContainer: {
        position: "absolute",
        marginTop: 5,
    },
    searchIconContainerr: {
        position: "absolute",
        left: 50,
        marginTop: 12
    },
    logoContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        right: 20,
        height: 120,
    },
    logo: {
        height: 60,
        width: 200,
        marginTop: 10
    },
    searchContainer:{
        height:50,
        backgroundColor:background_color,
        position:"absolute",
        top:115,
        width:"100%",
    },
    searchInput:{
        borderColor:"#ffffff",
        borderWidth:1,
        marginHorizontal:10,
        color:"#ffffff",
        borderRadius:10
    },
})

export default Header;