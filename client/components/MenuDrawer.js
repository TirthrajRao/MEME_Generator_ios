import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";
import styles from './menuDrawerStyles'

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
                  source={require("../assets/logo2.jpg")}
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
