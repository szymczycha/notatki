import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

class Notatka extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={[{ backgroundColor: this.props.color }, styles.container]}
                onLongPress={async () => {
                    Alert.alert(
                        "Usunąć?",
                        "Bez możliwości przywrócenia?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => { },
                                style: "cancel"
                            },
                            {
                                text: "Ok",
                                onPress: async () => {
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
                                    notatki.splice(this.props.index, 1);
                                    await SecureStore.setItemAsync("notatki", JSON.stringify(notatki))
                                    this.props.getNotatki();
                                },
                                style: "default",
                            }
                        ],
                        {
                            cancelable: true,
                            onDismiss: () => {

                            }
                        }
                    )

                }}
                onPress={() => {
                    this.props.navigation.navigate("EditScreen", { index: this.props.index, title: this.props.title, desc: this.props.desc, date: this.props.date, cat: this.props.category, color: this.props.color })
                }}>
                {/* generalnie to tu usuwanie zrobisz z rodzica */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Text style={[styles.category, { color: this.props.color }]}>{this.props.category}</Text>
                    <Text style={styles.date}>{this.props.date}</Text>
                </View>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.desc}>{this.props.desc}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    title: { color: "#ffffff", fontSize: 30 },
    desc: { color: "#ffffff", fontSize: 15, flexWrap: "wrap" },
    date: { color: "#ffffff", fontSize: 15, textAlign: "right" },
    category: { color: "#000", fontSize: 15, textAlign: "left", backgroundColor: "#fff", padding: 5, borderRadius: 5 },
    container: {
        borderRadius: 20,
        padding: 20,
        margin: 5,
        width: 150,
        minHeight: 150
    },
});
export default Notatka;
