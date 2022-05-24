import * as React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import S1 from "./components/S1"
import S2 from "./components/S2"
import EditScreen from "./components/EditScreen"
import AddCategoryScreen from "./components/AddCategoryScreen"
function App() {



  return (
    <NavigationContainer >
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: "#333" }
        }}
        drawerContent={(props) =>
          <DrawerContentScrollView {...props} >
            <Image source={require("./assets/notepad.png")} style={{ width: 150, height: 150, alignSelf: 'center', margin: 20 }} />
            <DrawerItemList {...props} />
            <DrawerItem
              label="info"
              labelStyle={{ color: "#fff" }}
              icon={() => <Image source={require("./assets/info.png")}
                style={{ width: 30, height: 30 }} />}
              onPress={() => { Alert.alert("Autor", "Szymon Konieczny 3P grupa 1 \nVersion 2.0.0") }}
            />
          </DrawerContentScrollView>
        }
      >
        <Drawer.Screen name="notatki" component={S1}
          options={{
            headerStyle: { backgroundColor: "#bb0000" },
            headerTintColor: "#fff",
            drawerIcon: () => <Image source={require("./assets/note.png")}
              style={{ width: 30, height: 30 }} />,
            drawerLabelStyle: { color: "#fff" }
          }}
        />
        <Drawer.Screen name="dodaj notatke" component={S2}
          options={{
            headerStyle: { backgroundColor: "#0000bb" },
            headerTintColor: "#fff",
            drawerIcon: () => <Image source={require("./assets/add.png")}
              style={{ width: 30, height: 30 }} />,
            drawerLabelStyle: { color: "#fff" }
          }} />
        <Drawer.Screen name="dodaj kategorie" component={AddCategoryScreen}
          options={{
            headerStyle: { backgroundColor: "#0000bb" },
            headerTintColor: "#fff",
            drawerIcon: () => <Image source={require("./assets/add.png")}
              style={{ width: 30, height: 30 }} />,
            drawerLabelStyle: { color: "#fff" }
          }} />
        <Drawer.Screen name="EditScreen" component={EditScreen}
          options={{
            headerStyle: { backgroundColor: "#bbbb00" },
            drawerItemStyle: { display: 'none' }
          }}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;
