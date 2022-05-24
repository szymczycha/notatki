import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Notatka from './Notatka';
import * as SecureStore from 'expo-secure-store';

class S1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notatki: [],
            searchedNotatki: [],
            searchTerm: "",
        };
        this.getNotatki = this.getNotatki.bind(this)
        this.getNotatki();
    }
    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            this.getNotatki();
        });
        this.getNotatki();
    }
    async getNotatki() {
        let notatki = JSON.parse(await SecureStore.getItemAsync("notatki"))
        console.log(notatki)
        this.setState({ notatki: notatki, searchedNotatki: notatki, searchTerm: "" })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text) => { this.setState({ searchTerm: text, searchedNotatki: this.state.notatki.filter((item) => item.cat.toLowerCase().includes(text.toLowerCase()) || item.title.toLowerCase().includes(text.toLowerCase()) || item.desc.toLowerCase().includes(text.toLowerCase())) }) }}
                    style={styles.searchBar}
                    placeholder="Wyszukaj"
                    underlineColorAndroid={"#555"}
                />
                <FlatList
                    keyExtractor={item => item.color.toString()}
                    style={styles.flatlist}
                    numColumns="2"
                    data={
                        this.state.searchedNotatki
                    }
                    renderItem={({ item, index }) => <Notatka title={item.title} category={item.cat} desc={item.desc} date={item.date} color={item.color} index={index} getNotatki={this.getNotatki} navigation={this.props.navigation} />}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#444444",
        flex: 1
    },
    button: {
        backgroundColor: "#777777",
        padding: 5
    },
    flatlist: { alignSelf: "center" },
    text: { textAlign: 'center', color: "#eeeeee" },
    searchBar: { backgroundColor: "#555", color: "#fff", padding: 5, margin: 5 }
});
export default S1;
