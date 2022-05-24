import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCat: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Dodawanie Kategorii </Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ selectedCat: text }) }}
                    style={{ color: "#fff" }}
                    placeholder="Nazwa kategorii"
                    underlineColorAndroid={"#aaaaaa"}
                />

                <TouchableOpacity
                    onPress={async () => {
                        let kategorie;
                        try {
                            kategorie = JSON.parse(await SecureStore.getItemAsync("kategorie"));
                        } catch {
                            kategorie = []
                        }
                        if (kategorie == null) {
                            kategorie = []
                        }
                        console.log(kategorie)
                        kategorie.push(this.state.selectedCat)
                        await SecureStore.setItemAsync("kategorie", JSON.stringify(kategorie))

                        Alert.alert("Sukces", "Kategoria została dodana!");
                    }}
                    style={styles.button}>
                    <Text style={styles.text}>Dodaj</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={async () => {
                        let kategorie;
                        kategorie = []

                        await SecureStore.setItemAsync("kategorie", JSON.stringify(kategorie))

                        Alert.alert("Sukces", "Kategorie zostały zresetowane!");
                    }}
                    style={styles.button}>
                    <Text style={styles.text}>Reset</Text>
                </TouchableOpacity> */}
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
        margin: 5,
        padding: 5
    },
    text: {
        textAlign: 'center', color: "#eeeeee"
    },
});


export default S2;
