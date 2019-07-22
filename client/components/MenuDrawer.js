import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";


class MenuDrawer extends React.Component {
  navLink(nav, text) {
    return (
      <TouchableOpacity
        style={{ height: 50 }}
        onPress={() => this.props.navigation.navigate(nav)}
      >
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={require("../assets/logo.png")}
                />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.name}>MEME_Generator</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomLinks}>
            <View style={{ flex: 2, flexDirection: "row" }}>
              <Icon
                name="image-filter"
                size={25}
                style={{ marginTop: 15, color: "white", marginLeft: 10 }}
              />
              {this.navLink("AddImage", "Add Image")}
            </View>
            <View style={{ flex: 2, flexDirection: "row" }}>
              <Icons
                name="shop-two"
                size={25}
                style={{ marginTop: 15, color: "white", marginLeft: 10 }}
              />
              {this.navLink("StickerShop", "Sticker Shop")}
            </View>

            <View style={{ flex: 2, flexDirection: "row" }}>
              <Icons
                name="photo-library"
                size={25}
                style={{ marginTop: 15, color: "white", marginLeft: 10 }}
              />
              {this.navLink("SavedImage", "Saved Image")}
            </View>

            <View style={{ flex: 2, flexDirection: "row" }}>
              <Icon
                name="information-outline"
                size={25}
                style={{ marginTop: 15, color: "white", marginLeft: 10 }}
              />
              {this.navLink("About", "About")}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MenuDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181123"
  },
  scroller: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#4b415a"
  },
  profileText: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center"
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    color: "white",
    textAlign: "left"
  },
  imgView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  img: {
    height: Platform.OS === "android" ? 70 : 70,
    width: Platform.OS === "android" ? 70 : 70,
    borderRadius: Platform.OS === "android" ? 50 : 35
  },
  topLinks: {
    height: 120,
    backgroundColor: "#181123"
  },

  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: "left",
    color: "white"
  },

  version: {
    flex: 1,
    textAlign: "right",
    marginRight: 20,
    color: "gray"
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: "#181123",
    paddingTop: 10,
    color: "white"
  },
  description: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16
  },
  btnlogout: {
    backgroundColor: "#181123",
    color: "white",
    flexDirection: "row"
  }
});
