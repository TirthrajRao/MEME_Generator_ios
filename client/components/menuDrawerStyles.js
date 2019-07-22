import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export default StyleSheet.create({
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
