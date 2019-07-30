import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
  NetInfo,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Config from "../../config";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import styles from "./stickershopStyles";
import MenuButton from "../../components/MenuButton";
import { Header } from "native-base";
import Api from "../../service";
import Toast from "react-native-simple-toast";

export default class StickerShop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categoryName: [],
      stickers: [],
      show: false,
      animating: false,
      isCheckInternetConnection: false,
      connection_Status: ""
    };
    this.props.navigation.addListener("didFocus", payload => {
      this.componentDidMount();
    });
    this.animatedValue = new Animated.Value(-70);
  }

  /**
   *  in componentDidMount get categoryname and add key alreadyDownloaded or not
   *  Api.showCategoryName() call from service
   *  NetInfo is check internet connection
   */
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected == true) {
        this.setState({ connection_Status: "Online" });
      } else {
        this.setState({ connection_Status: "Offline" });
      }
    });
    //Show category name
    Api.showCategoryName()
      .then(async res => {
        console.log("------", res.result.category);
        const categoryData = res.result.category;

        for (let i = 0; i < categoryData.length; i++) {
          let dirs =
            Platform.OS === "android"
              ? `/storage/emulated/0/MEME_Generator/${categoryData[i].name}`
              : `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/${
                  categoryData[i].name
                }`;
          // For download and remove icon
          await RNFS.readDir(dirs)
            .then(allDownloadedCategory => {
              categoryData[i]["alreadyDownloaded"] = true;
            })
            .catch(err => {
              console.log("Internal server Error", err);
              categoryData[i]["alreadyDownloaded"] = false;
            });
        }
        this.setState({ categoryName: categoryData, animating: true });
      })
      .catch(err => {
        console.log("Internal server Error", err);
      });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }
  /** check internet connection on or off */
  _handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({ connection_Status: "Online" });
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 350
      }).start(this.closeToast());
    } else {
      this.setState({ connection_Status: "Offline" });
    }
  };

  /**
   * Toast For internet connection
   */
  closeToast() {
    setTimeout(() => {
      Animated.timing(this.animatedValue, {
        toValue: -70,
        duration: 350
      }).start();
    }, 2000);
  }
  /** on click  download button call api for get name of stickers
   * Api.DownloadStickers(data) call from service
   * @param {string} Data:name of category 
   */

  download(data) {
    Api.DownloadStickers(data).then(res => {
      let arra = [];
      console.log("data name-----", res);
      for (let i = 0; i < res.result.stickers.length; i++) {
        arra.push(res.result.stickers[i].split("/images/").reverse()[0]);
      }
      this.setState({
        stickers: arra
      });
      this.mkdirectory(data);
    });
  }
  /** make directory in device
   * @param {string} name: name of category*/

  mkdirectory(data) {
    let absolutePath =
      Platform.OS === "android"
        ? `/storage/emulated/0/MEME_Generator/` + data
        : `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/` + data;
    console.log("------android----ios-----", absolutePath);
   

    RNFS.mkdir(absolutePath)
      .then(result => {
        this.actualDownload(data);
      })
      .catch(err => {
        console.warn("err---------------", err);
      });
  }

  /**
   * download stickers in folder in device
   * @param {string} data: name of category
   */
  actualDownload = data => {
    console.log("call ios actualDownload");

    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage",
          message: "This app would like to store some files on your phone"
        }
      )
        .then(() => {
          let dirs = `/storage/emulated/0/MEME_Generator/` + data;
          console.log("dir--------in actual dowload -------", dirs);

          for (let i = 0; i < this.state.stickers.length; i++) {
            let name = this.state.stickers[i].split("/")[1];
            let stickerName = Config.medialUrl + this.state.stickers[i];

            RNFetchBlob.config({
              path: dirs + "/" + name,
              fileCache: true
            })
              .fetch("GET", stickerName, {})
              .then(res => {
                console.log("res.data============================", res.data);
              
                const existingCategories = this.state.categoryName;

                for (let i = 0; i < existingCategories.length; i++) {
                  if (existingCategories[i].name === data) {
                    existingCategories[i].alreadyDownloaded = true;
                  }
                }

                this.setState({
                  categoryName: existingCategories
                });
              });
          }
          Toast.show('Downloading....', Toast.LONG)
        })
        .catch(err => {
          console.log("Internal server error", err);
        });
    } else {
      let dirs =
        `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/` + data;
      console.log("dir---else-----in actual dowload -------", dirs);

      for (let i = 0; i < this.state.stickers.length; i++) {
        let name = this.state.stickers[i].split("/")[1];
        let stickerName = Config.medialUrl + this.state.stickers[i];

        RNFetchBlob.config({
          path: dirs + "/" + name,
          fileCache: true
        })
          .fetch("GET", stickerName, {})
          .then(res => {
            console.log("res.data============ios================", res.data);

            const existingCategories = this.state.categoryName;

            for (let i = 0; i < existingCategories.length; i++) {
              if (existingCategories[i].name === data) {
                existingCategories[i].alreadyDownloaded = true;
              }
            }

            this.setState({
              categoryName: existingCategories
            });
          })
          .catch(err => {
            console.log("Error", err);
          });
      }
    }
  };
  /** 
   * @param {string} data: category name and on click remove particular category 
   */
  remove(data) {
    let dirs =
      Platform.OS === "android"
        ? `/storage/emulated/0/MEME_Generator/${data}`
        : `${RNFS.DocumentDirectoryPath}/MEME_Generator/Stickers/${data}`;

    RNFetchBlob.fs
      .unlink(dirs)
      .then(() => {
        console.log("file is deleted");
        const existingCategories = this.state.categoryName;

        for (let i = 0; i < existingCategories.length; i++) {
          if (existingCategories[i].name === data) {
            existingCategories[i].alreadyDownloaded = false;
          }
        }
       
        this.setState({
          categoryName: existingCategories
        });
        Toast.show('Remove Stickers');
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  /** 
   * @param {string} data : name of downloaded categoty and show download and remove buttons
   */
  showButtons(data) {
    if (data.alreadyDownloaded == true) {
      return (
        <View style={{ flexDirection: "column", flex: 1 }}>
          <TouchableOpacity
            className="iconButton"
            onPress={() => this.remove(data.name)}
          >
            <Icon name={"delete"} size={25} color="#606060" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "column", flex: 1 }}>
          <TouchableOpacity
            className="iconButton"
            onPress={() => this.download(data.name)}
          >
            <Icon name={"arrow-collapse-down"} size={25} color="#606060" />
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    const animating = this.state.animating;

    const { navigation } = this.props;
    if (this.state.connection_Status == "Online") {
      return !animating ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" style={styles.activityIndicator} />
        </View>
      ) : (
        <View>
          <Header style={styles.header}>
            <MenuButton navigation={this.props.navigation} />
            <View style={styles.title}>
              <Text style={styles.text1}> Sticker Shop </Text>
            </View>
          </Header>
          {this.state.categoryName.map(data => (
            <View>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("ShowStickers", { data: data.name })
                }
              >
                <View style={{ flexDirection: "column", flex: 6 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      teztAlign: "center",
                      color: "black"
                    }}
                  >
                    {data.name}
                  </Text>
                </View>

                <View style={{ flexDirection: "column", flex: 3 }} />

                {this.showButtons(data)}
              </TouchableOpacity>
            </View>
          ))}
          <Animated.View
            style={{
              transform: [{ translateY: this.animatedValue }],
              height: 40,
              backgroundColor: "green",
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              justifyContent: "center"
            }}
          >
            <Text style={styles.animatedText}>Now you are online!!</Text>
          </Animated.View>
        </View>
      );
    } else {
      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      );
    }
  }
}
