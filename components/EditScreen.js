import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';


class EditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            title: this.props.route.params.title,
            desc: this.props.route.params.desc,
            date: this.props.route.params.date,
            index: this.props.route.params.index,
            selectedCat: this.props.route.params.cat
        };
    }
    componentDidMount = async () => {
        this.funkcja = this.props.navigation.addListener('focus', async () => {
            this.setState({
                categories: JSON.parse(await SecureStore.getItemAsync("kategorie")),
                title: this.props.route.params.title,
                desc: this.props.route.params.desc,
                date: this.props.route.params.date,
                index: this.props.route.params.index,
                selectedCat: this.props.route.params.cat
            });
        });
        this.setState({
            categories: JSON.parse(await SecureStore.getItemAsync("kategorie")),
            title: this.props.route.params.title,
            desc: this.props.route.params.desc,
            date: this.props.route.params.date,
            index: this.props.route.params.index,
            selectedCat: this.props.route.params.cat
        });

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Edycja </Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ title: text }) }}
                    value={this.state.title}
                    style={{ color: "#fff" }}
                    placeholder="Title"
                    underlineColorAndroid={"#aaaaaa"}
                />
                <TextInput
                    onChangeText={(text) => { this.setState({ desc: text }) }}
                    value={this.state.desc}
                    style={{ color: "#fff" }}
                    placeholder="Description"
                    underlineColorAndroid={"#aaaaaa"}
                />
                <Picker
                    selectedValue={this.state.selectedCat}
                    onValueChange={(item) => { this.setState({ selectedCat: item }) }}
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
                        let notatki = JSON.parse(await SecureStore.getItemAsync("notatki"))
                        let item = {
                            title: this.state.title,
                            desc: this.state.desc,
                            color: this.props.route.params.color,
                            cat: this.state.selectedCat,
                            date: this.props.route.params.date,
                        }
                        console.log(item)
                        console.log(notatki)
                        notatki[this.props.route.params.index] = item

                        await SecureStore.setItemAsync("notatki", JSON.stringify(notatki))
                        Alert.alert("Sukces", "Notatka zmieniona!");
                        this.props.navigation.navigate("notatki")
                    }}
                    style={styles.button}>
                    <Text style={styles.text}>Zapisz</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#444444",
        flex: 1,
        flexDirection: 'column'
    },
    button: {
        backgroundColor: "#777777",
        padding: 5
    },
    flatlist: { alignSelf: "center" },
    text: { textAlign: 'center', color: "#eeeeee" },
});
export default EditScreen;
