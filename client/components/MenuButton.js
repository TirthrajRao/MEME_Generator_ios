import React from "react";
import { StyleSheet , Platform } from "react-native";
// import { Ionicons } from '@expo/vector-icons'
import Icon from "react-native-vector-icons/MaterialIcons";

export default class MenuButton extends React.Component {
  render() {
    return (
      <Icon
        name="reorder"
        color="black"
        size={25}
        style={styles.menuIcon}
        onPress={() => this.props.navigation.toggleDrawer()}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: Platform.OS === "android" ? 15 : 25,
    left: 20
  }
});
