import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: "",
            categories: [],
            selectedCategory: "",
        };
    }
    componentDidMount = async () => {
        this.funkcja = this.props.navigation.addListener('focus', async () => {
            this.setState({
                categories: JSON.parse(await SecureStore.getItemAsync("kategorie"))
            });
        });
        this.setState({
            categories: JSON.parse(await SecureStore.getItemAsync("kategorie"))
        });

    }
    render() {
        let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Dodawanie Notatek </Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ title: text }) }}
                    style={{ color: "#fff", marginTop: 10 }}
                    placeholder="Tytuł..."
                    underlineColorAndroid={"#aaaaaa"}
                />
                <TextInput
                    onChangeText={(text) => { this.setState({ desc: text }) }}
                    style={{ color: "#fff", marginTop: 10 }}
                    placeholder="Treść..."
                    underlineColorAndroid={"#aaaaaa"}
                />
                <Picker
                    selectedValue={this.state.selectedCategory}
                    key={this.state.selectedCategory}
                    onValueChange={(item) => { this.setState({ selectedCategory: item }) }}
                    style={{
                        marginTop: 10,
                        color: "#fff"
                    }}
                >
                    {
                        this.state.categories.map((category) => <Picker.Item label={category} value={category} />)
                    }
                </Picker>
                <TouchableOpacity
                    onPress={async () => {
                        let notatki;
                        try {
                            notatki = JSON.parse(await SecureStore.getItemAsync("notatki"));
                        } catch {
                            notatki = []
                        }
                        if (notatki == null) {
                            notatki = []
                        }
                        console.log(notatki)
                        let miesiace = ["STYC", "LUTY", "MARZ", "KWIE", "MAJ", "CZER", "LIPI", "SIER", "WRZE", "PAŹD", "LIST", "GRUD"]
                        let date = new Date().getDate() + " " + miesiace[new Date().getMonth()]
                        notatki.push({
                            title: this.state.title,
                            desc: this.state.desc,
                            cat: this.state.selectedCategory,
                            color: "#" + chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)],
                            date: date.toLocaleString("pl-PL", { day: "numeric", month: "short" })
                        })
                        await SecureStore.setItemAsync("notatki", JSON.stringify(notatki))
                        Alert.alert("Sukces!", "Dodano notatkę!")
                    }} //TUTAJ PRZEKAZ FUNKCJE Z RODZICA DO DODAWANIA
                    style={styles.button}>
                    <Text style={styles.text}>Dodaj</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#444444",
        height: '100%'
    },
    button: {
        backgroundColor: "#777777",
        padding: 5,
        marginTop: 10
    },
    text: {
        textAlign: 'center', color: "#eeeeee"
    },
});


export default S2;
