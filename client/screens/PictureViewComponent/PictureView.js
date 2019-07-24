/** PictureView call when image select from Image picker or edit image*/

import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Animated,
  Platform,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Header } from "native-base";
import Editimg from "../EditimgComponent/Editimg";
import { Caption } from "../CaptionCompoent/Caption";
import { captureScreen } from "react-native-view-shot";
import RNFS from "react-native-fs";
import AwesomeAlert from "react-native-awesome-alerts";
import ImagePicker from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import AddedStickers from "../addedStickerComponent/AddedStickers";

import styles from "./pictureViewStyles";


class PictureView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cEditorEnabled: false,
      text: [],
      color: [],
      font: [],
      image: undefined,
      images: "",
      savedImage: "",
      loopCount: 0,
      screenshortImage: "",
      status: true,
      statusButton: true,
      existingIndex: 0,
      stickers: [],
      animation: new Animated.Value(0),
      stickersName: [],
      visible: true
    };
    this.child = React.createRef();
    this.caption = null;
    this.finishEditingCaption = this.finishEditingCaption.bind(this);
    this.stickersandemoji = this.stickersandemoji.bind(this);
    this.closeRBSheet = this.closeRBSheet.bind(this);
    this.onCancel = this.onCancel.bind(this)
  }

  /** on click text open caption editor */

  openCaptionEditor = () => {
    this.setState({
      cEditorEnabled: true,
      loopCount: this.state.loopCount + 1
    });
    this.child.current.addTextInput(this.state.loopCount);
    
  };
  /** for edit text */
  openCaptionEditorOnPress = () => {
    this.setState({ cEditorEnabled: true });
  };
  /** close caption editor */

  closeCaptionEditor = () => {
    this.setState({ cEditorEnabled: false });
  };

  /**
   * @param {array} text : onFinish text pass in caption screen 
   * @param {array} color :  onFinish color pass in caption screen 
   * @param {number} existingIndex : onFinish pass  index in caption screen
   * @param {array}  font : onFinish font pass in caption screen
  */

  finishEditingCaption = (text, color, existingIndex, font) => {
    this.closeCaptionEditor();

    let NewValue = text;
    let NewColor = color;
    let NewFont = font;

    this.setState({
      text: NewValue,
      color: NewColor,
      existingIndex: existingIndex,
      font: NewFont
    });
  };
  /** 
   * setState image from Add image screen and saved image screen
   *  get image in paramas */
  componentDidMount = () => {
    this.setState({
      images: this.props.navigation.state.params.image, // from AddImage screen 
      savedImage: this.props.navigation.state.params.savedImage // from saved image screen 
    });
  };

  /** snapshot of screen and download image in device*/
  snapshot = () => {
    this.setState({ status: false, statusButton: false });

    setTimeout(() => {
      captureScreen({
        format: "jpg",
        quality: 1
        // justifyContent: "center",
        // alignItems: "center",
        // resizeMode: "cover",
        // width: WIDTH,
        // height: 400
      })
        .then(uri => {
          this.setState({ screenshortImage: uri });
          this.mkdirectory(uri);
        })
        .catch(err => {
          console.error("Oops, snapshot failed", err);
        });
    }, 1000);
  };
  /** mkdir when take snapshot */
  mkdirectory = uri => {
    let absolutePath =
      Platform.OS === "android"
        ? `/storage/emulated/0/MEME-Generator`
        : `${RNFS.DocumentDirectoryPath}/MEME_Generator/SavePictures`;

    RNFS.mkdir(absolutePath)
      .then(result => {

        if (Platform.OS === "android") {
          this.moveFile(uri);
        }else{
          this.actualDownload(uri);
        }
        
      })
      .catch(err => {
        console.warn("Error", err);
      });
  };

  /** move file */
  moveFile = uri => {
    const realPath = `/storage/emulated/0/MEME-Generator`;
    const destPath = `/storage/emulated/0/MEME-Generator`;

    RNFS.moveFile(realPath, destPath)
      .then(success => {
        this.actualDownload(uri);
        console.log("file moved!");
      })
      .catch(err => {
        console.log("Error: " + err.message);
      });
  };

  /** download snapshort in device */
  actualDownload = uri => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage",
          message: "This app would like to store some files on your phone"
        }
      )
        .then(() => {
          let name = uri.split("/")[8];
          let url = uri;
          let dirs = `/storage/emulated/0/MEME-Generator`;
          const file_path = dirs + "/" + name;

          RNFS.readFile(this.state.screenshortImage, "base64").then(res => {
            this.setState({ resBase64: res });
            let base64 = this.state.resBase64;
            RNFS.writeFile(file_path, base64, "base64");
            this.setState({ showAlert: true });
            Alert.alert("Your file has been downloaded!");
            this.setState({ statusButton: true });
            this.setState({ status: true }).catch(error => {
              console.log("err", error);
              // alert(JSON.stringify(error));
            });
          });
        })
        .catch(err => {
          console.log("Error", err);
        });
    } else {
      //let name = uri.split("/")[15]; // for emulator
      let name = uri.split("/")[10];  // for device
      console.log("---------uri", name);
      let url = uri;
      let dirs = `${RNFS.DocumentDirectoryPath}/MEME_Generator/SavePictures`;
      const file_path = dirs + "/" + name;

      RNFS.readFile(this.state.screenshortImage, "base64").then(res => {
        this.setState({ resBase64: res });
        let base64 = this.state.resBase64;
        RNFS.writeFile(file_path, base64, "base64");

        Alert.alert("Success", "Photo added to camera roll!");
        this.setState({ statusButton: true, status: true }).catch(error => {
          console.log("Error:", error);
        });
      });
    }
  };
  /** 
   *  @param {*} uri:sticker path, stickers function for bitmoji stickers
   */
  stickers = uri => {
    let stickers = this.state.stickers;
    stickers.push(uri);
  };

  /**
   *  @param {*} item: on click Emoji and show added stickers 
  */
  stickersandemoji = item => {
    this.RBSheet.close();

    let existinSticker = this.state.stickersName;
    existinSticker.push(item);
    this.setState({ stickersName: existinSticker });
  };
  /** 
   * For colse RBSheet 
   */
  closeRBSheet = () => {
    this.RBSheet.close();
  };

  /** on click cancle edited text, color, Font, Stickers removed */
  onCancel = () => {
    console.log("call oncancle function ");
    this.setState({
      text: [],
      color: [],
      font:[],
      stickers: [],
      stickersName: [],
    });
    this.caption.onCancel() // this function call in caption screen 
    this.closeCaptionEditor();
    this.props.onCancel();
  };

  render() {
    const { navigation } = this.props;
    if (this.state.images || this.state.savedImage) {
      return (
        <View style={this.props.style}>
          <View>
            {this.state.statusButton ? (
              <View>
                <Header style={styles.header}>
                  <TouchableOpacity
                    style={[styles.iconButton, styles.floatingTopLeftButton]}
                    onPress={this.onCancel.bind(this)}
                  >
                    <Icon name={"close"} size={34} color="#606060" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.iconButton, styles.floatingTopLeftButton1]}
                    onPress={() => navigation.navigate("AddImage")}
                  >
                    <Icon name={"arrow-left"} size={34} color="#606060" />
                  </TouchableOpacity>

                  <View style={styles.toolBar}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={this.openCaptionEditor.bind(this)}
                    >
                      <Icon name={"format-text"} size={34} color="#606060" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.saveIcon}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={this.snapshot.bind(this)}
                    >
                      <Icon
                        name={"arrow-down-bold-circle"}
                        size={34}
                        color="#606060"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cameraIcon}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => this._pickImage("image")}
                    >
                      <Icon name={"camera"} size={34} color="#606060" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.emojiIcon}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => this.RBSheet.open()}
                    >
                      <Icon
                        name={"emoticon-happy-outline"}
                        size={34}
                        color="#606060"
                      />
                    </TouchableOpacity>
                  </View>

                  <RBSheet
                    ref={ref => {
                      this.RBSheet = ref;
                    }}
                    height={350}
                    duration={250}
                    closeOnDragDown={true}
                    customStyles={{
                      container: {
                        justifyContent: "center",
                        alignItems: "center"
                      }
                    }}
                  >
                    <AddedStickers
                      close={this.closeRBSheet.bind(this)}
                      propsValue={this.props}
                      propsfunction={this.stickersandemoji.bind(this)}
                    />
                  </RBSheet>


                </Header>

             
              </View>
            ) : null}
          </View>

          <Editimg
            ref={this.child}
            onCancel={this.closeCaptionEditor.bind(this)}
            image={this.state.image}
            onFinish={this.finishEditingCaption}
            enabled={this.state.cEditorEnabled}
            loopCount={this.state.loopCount}
            style={styles.captionEditor}
          />
          <Caption
            ref={ref => {
              this.caption = ref;
            }}
            image={this.state.stickers}
            loopCount={this.state.loopCount}
            style={{ zIndex: 1 }}
            lock={false}
            visible={!this.state.cEditorEnabled}
            text={this.state.text}
            color={this.state.color}
            font={this.state.font}
            onPress={this.openCaptionEditorOnPress.bind(this)}
            existingIndex={this.state.existingIndex}
            sticker={this.state.stickersName}
            onCancel={this.onCancel.bind(this)}
          />

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              flex: 1
            }}
          >
            {this.state.images ? (
              <Image
                source={{ uri: this.state.images }}
                style={styles.preview}
              />
            ) : (
              <Image
                source={{ uri: this.state.savedImage }}
                style={styles.preview}
              />
            )}
          </View>

          <View style={styles.lasticon}>
                    <TouchableOpacity 
                      style={styles.iconButton} 
                      onPress={() => this.RBSheet.open()} >
                      <Icon
                        name={"emoticon-happy-outline"}
                        size={34}
                        color="#606060"
                      />
                    </TouchableOpacity>
                  </View>
        </View>
      );
    } else {
      return null;
    }
  }
  _pickImage = type => {
    this.setState({ show: true });

    console.log("function call", this.props.navigation.state.params.projectId);
    const options = {
      allowsEditing: true,
      base64: false
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const uri = response.uri;
        this.setState({ image: uri });
        this.stickers(uri);
        this.setState({ animating: true });
      }
    });
  };
}

PictureView.propTypes = {
  style: PropTypes.obj,
  path: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onSubmit: PropTypes.func
};

PictureView.defaultProps = {
  style: styles.container,
  path: null,
  onCancel: () => {},
  onSave: () => {},
  onSubmit: () => {}
};

export default PictureView;
