import { StyleSheet } from "react-native";
const imageSize = 400
const stickerCanvasSize = imageSize * 2
export default StyleSheet.create({
  container: {
    height: "auto",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    height: "auto",
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 25
  },
  preview: {
    height: 80,
    width: 80,
  },
  stickerContainer: {
     position: 'absolute',
    height: imageSize, 
    width: imageSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
 
});
