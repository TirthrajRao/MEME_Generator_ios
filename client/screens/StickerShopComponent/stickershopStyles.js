import { StyleSheet, Platform, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    
    flexDirection: "row",
  
    borderBottomWidth: 2,
    borderBottomColor: '#e7e7e7',
    padding: 10
  },
  iconButton: {
    height: 35,
    width: 35,
    right: 0
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    color: "#bc2b78"
  },
  text1: {
    fontSize: 21,
    color: "black",
    justifyContent: "center",
    margin: 10,
    fontWeight: "bold",
    marginLeft: 45
  },
  header: {
    backgroundColor: "#ffffff",
    height: Platform.OS === "android" ? 55 : 65
  },
  title: {
    flex: 7,
    flexDirection: "column"
  },
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: WIDTH,
    position: "absolute",
    top: 30
  },
  offlineText: {
    color: "#fff"
  },
  animatedView: {
    height: 40,
    backgroundColor: "green",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    justifyContent: "center"
  },
  animatedText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  }
});
