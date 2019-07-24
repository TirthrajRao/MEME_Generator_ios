import { StyleSheet , Platform} from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      textInputView: {
        height: '60%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        height: 'auto',
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        color: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
        fontSize: 25,
      },
      iconButton: {
        width: 50, height: 50
      },
      colorBar: {
        width: '100%',
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
    
      },
      FontBar: {
        width: '100%',
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        paddingBottom:20,
        backgroundColor: '#fff'
      },
   
      colorButton: {
        width: 30,
        height: 30,
        margin:10
      },
      FontButton: {
        width: 80,
        height: 60,
      },
    
      colorButtonView: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        elevation:5,
        

      },
      textFont:{
        fontSize: 20,
        textAlign:'center',
     
      },
    
      iconButton:{
        height: 50,
        width:50,
      },
      floatingBottomRightButton:{
        // position: 'absolute',
        bottom: 0,
        right: 0,
        paddingRight: 15,
        paddingBottom: 15,
        // zIndex: 1
      },
      toolBar: {
        position: 'absolute',
        bottom:0,
        right: 0,
        paddingTop: 15,
        width: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    
      },



































      container: {
        flex: 1
      },
      header: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "ios" ? 20 : 0,
        paddingBottom: 16
      },
      content: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column"
      },
      headerText: {
        marginTop: 24,
        fontSize: 34,
        lineHeight: 41,
        ...Platform.select({
          android: {
            fontFamily: "sans-serif-bold"
          },
          ios: {
            fontWeight: "700",
            letterSpacing: 0.41
          }
        })
      },
      gradient: {
        alignSelf: "stretch",
        marginLeft: 12,
        marginTop: 12,
        marginBottom: 16,
        height: 4
      },
      sliderRow: {
        alignSelf: "stretch",
        marginLeft: 12,
        marginTop: 12
        // marginTop:250
      },
      sliderRow1: {
        margin: 10,
    
        alignSelf: "stretch",
        marginLeft: 12,
        marginTop: 12
      }

    })