/** Info about Application in a About Screen  */

import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Header } from "native-base";
import styles from "./aboutStyles";
import MenuButton from "../../components/MenuButton";

export default class About extends React.Component {
  render() {
    return (
      <View>
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.title}>
            <Text style={styles.text1}> About us </Text>
          </View>
        </Header>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image style={styles.img} source={require("../../assets/logo2.jpg")} />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textTitle}>MEME Generator</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.contain}>
            MEME Generator is an app that is very much helpful to make meme.
            Using this app you can easily make MEME. User will able to add
            Stickers and also create own emoji using Bitmoji. User will able to
            add Text and also change fontcolor and fontFamily.
          </Text>
        </View>
      </View>
    );
  }
}
