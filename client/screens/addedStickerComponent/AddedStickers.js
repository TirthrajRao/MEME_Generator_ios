//** Downloaded Stickers show in AddedStickers Screen */

import React, { Component } from "react";
import { FlatList, 
  View, 
  Image, 
  TouchableOpacity,
  Text,
  Platform } from "react-native";
import RNFS from "react-native-fs";
import styles from "./addedStickerstyles";
import Config from "../../config";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";

export default class AddedStickers extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      Emoji: [],
      show: false,
      categoryName: []
    };
  }
  /** read directory of device and fetch downloaded emoji */
  async componentDidMount() {

    let dirs = Platform.OS === 'android' ? `/storage/emulated/0/MEME_Generator/`
      : `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/`;

    console.log("----------read dir -----ios", dirs)
    // let dirs = `/storage/emulated/0/MEME_Generator/`;
    await RNFS.readDir(dirs)
      .then(async allFolderName => {

        let dirs = Platform.OS === 'android' ? `/storage/emulated/0/MEME_Generator/${allFolderName[0].name}`
          : `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/${allFolderName[0].name}`;

        RNFS.readDir(dirs)
          .then(allImages => {
            this.setState({ Emoji: allImages , show: true});
          })
          .catch(err => {
            console.log(err);
          });
        let data = [];
        for (let i = 0; i < allFolderName.length; i++) {

          let dirs = Platform.OS === 'android' ? `/storage/emulated/0/MEME_Generator/${allFolderName[i].name}`
            : `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/${allFolderName[i].name}`;
         /** read directory for tabs,
          *  first image fetch and show in tabs */
          await RNFS.readDir(dirs).then(allFiles => {
      
            data.push({
              path: Platform.OS === 'android' ? allFiles[0].path.split("/MEME_Generator/")[1] : allFiles[0].path.split("/Stickers/")[1],
              name: allFolderName[i].name
            });
          });
        }

        this.setState({ categoryName: data });

      })
      .catch(err => { 
        console.log("Error",err)
      });
  }
  //  Show tabs in bottom

  showTabs() {
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        {this.state.categoryName.map(data => (
          <TouchableOpacity onPress={() => this.emoji(data.name)}>
            <View style={{ width: 50, paddingBottom: (Platform.OS === 'android') ? 0 : 10 }}>
              <Image
                source={{ uri: Config.medialUrl + data.path }}
                style={{ width: 35, height: 35, elevation: 5 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  /**  @param {string} data: String ,data is  name of category and category wise read directory  */
  emoji(data) {
    let dirs = Platform.OS === 'android' ? `/storage/emulated/0/MEME_Generator/${data}`
      : `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/${data}`;

    RNFS.readDir(dirs)
      .then(allImages => {
        this.setState({ Emoji: allImages ,  show: true });
       
      })
      .catch(err => {
        console.log("Error",err)
        this.setState({ error: err.code });
       
      });
  }
  render() {
    const { navigation } = this.props.propsValue;

    return (
      <>
        {this.state.show ? (
          <>
            <View>
              <ScrollView vertical={true}>
                <FlatList
                  data = { this.state.Emoji }
                  keyExtractor = {( item, index ) => index.toString()}
                  renderItem = {({ item }) => (
                    <View style = {{ marginTop: (Platform.OS === 'ios') ? 10 : 5 }}>
                      <TouchableOpacity
                        onPress = { () => this.props.propsfunction(item.path) }
                      >
                        <Image
                          source={{ uri: "file://" + item.path }}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  numColumns={(Platform.OS === 'ios') ? 6 : 8}
                />
              </ScrollView>
            </View>
            <View style={styles.MainContainer}>
              <View style={styles.bottomView}>{this.showTabs()}</View>
            </View>
          </>
        ) : (
            <View>
              <Text>Please Download stickers</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("StickerShop"), this.props.close();
                }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    color: "blue",
                    marginTop: 20
                  }}
                >
                  Click here
                  </Text>
              </TouchableOpacity>

            </View>
          )}
      </>
    );
  }
}


