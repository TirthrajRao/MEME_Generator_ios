import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  Image
} from "react-native";
import PropTypes from "prop-types";
const HEIGHT = Dimensions.get("window").height;
export const COLORS = [
  "#ffffff",
  "#000000",
  "#ffee58",
  "#4db6ac",
  "#42a5f5",
  "#ab47bc",
  "#f44336"
];

export const FONTS = [
  "Barriecito-Regular",
  "MountainsofChristmas-Regular",
  "AbrilFatface-Regular",
  "Anton-Regular",
  "ConcertOne-Regular",
  "DMSerifText-Regular",
  "JosefinSans-Regular",
  "Lobster-Regular",
  "PermanentMarker-Regular",
  "Righteous-Regular"
];

export const FADEDBLACK = "rgba(0,0,0,.51)";
export const FADEDWHITE = "rgba(255,255,255,.51)";
import styles from "./captionStyles";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State
} from "react-native-gesture-handler";
const USE_NATIVE_DRIVER = false;
const MINIMUM_STICKER_SCALE = 0.25;
const MAXIMUM_STICKER_SCALE = 2.5;

export class Caption extends Component {
  // onPanGestureEvent: (...args: any[]) => void;
  lastOffset: { x: number, y: number };
  translateY: Animated.Value;
  translateX: Animated.Value;
  onRotateGestureEvent: (...args: any[]) => void;
  lastRotate: number;
  rotateStr: Animated.AnimatedInterpolation;
  rotate: Animated.Value;
  onPinchGestureEvent: (...args: any[]) => void;
  lastScale: number;
  scale: Animated.AnimatedMultiplication;
  pinchScale: Animated.Value;
  baseScale: Animated.Value;

  constructor(props) {
    super(props);

    this.state = {
      lastPanY: 0,
      captionArray: [],
      existingIndex: 0,
      panArray: [],
      panArrayImage: [],
      panArraySticker: [],
      imageArray: [],
      stickerArray: [],
      lastOffset: [],
      onPanGestureEvent: [],
      translateX: [],
      translateY: [],
      onRotateGestureEvent: [],
      rotate: [],
      lastRotate: [],
      rotateStr: []
    };

    /* Pinching */
    this.baseScale = new Animated.Value(1);
    this.pinchScale = new Animated.Value(1);
    this.scale = this.pinchScale.interpolate({
      inputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
      outputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
      extrapolate: "clamp"
    });
    this.lastScale = 1;

    this.onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this.pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  
  }

  componentDidMount = () => {
    this.state.onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY
          }
        }
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
    this.state.onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this.rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  };

  onRotateHandlerStateChange = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastRotate[index] += event.nativeEvent.rotation;
      this.state.rotate[index].setOffset(this.state.lastRotate[index]);
      this.state.rotate[index].setValue(0);

      this.state.rotateStr[index] = this.state.rotate[index].interpolate({
        inputRange: [-100, 100],
        outputRange: ['-100rad', '100rad'],
      });
    }

   
    console.log(index, "this.state.rotateStr============" ,this.state.rotateStr )
  };

  onPinchHandlerStateChange = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale;
      this.baseScale.setValue(this.lastScale);
      // console.log("---------lastScale---------", this.lastScale);
      // console.log("---------baseScale---------", this.baseScale);
    }
  };

  onPanStateChange = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastOffset[index].x += event.nativeEvent.translationX;
      this.state.lastOffset[index].y += event.nativeEvent.translationY;
      this.state.translateX[index].setOffset(this.state.lastOffset[index].x);
      this.state.translateX[index].setValue(0);
      this.state.translateY[index].setOffset(this.state.lastOffset[index].y);
      this.state.translateY[index].setValue(0);
    }
  };

  /**@param {*} index: Number ,index wise moving text  */
  getPanResponder(index) {
    console.log("call ", index);
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panArray[index].x,
          dy: this.state.panArray[index].y
        }
      ]),

      onPanResponderGrant: (e, gestureState) => {
        const selectedPanArray = this.state.panArray[index];

        selectedPanArray.setOffset({
          x: this.state.panArray[index].x._value,
          y: this.state.panArray[index].y._value
        });
        selectedPanArray.setValue({
          x: this.state.panArray[index].x._value,
          y: this.state.panArray[index].y._value
        });

        const existingPanArray = this.state.panArray;

        existingPanArray[index] = selectedPanArray;

        this.setState({
          panArray: existingPanArray
        });
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.panArray[index].flattenOffset();
      }
    });
  }
  /**@param {*} index:Number, index wise moving bitmoji sticker  */
  getPanResponderImage(index) {
    console.log("call ", index);
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panArrayImage[index].x,
          dy: this.state.panArrayImage[index].y
        }
      ]),
      onPanResponderGrant: (e, gestureState) => {
        const selectedPanArray = this.state.panArrayImage[index];
        selectedPanArray.setOffset({
          x: this.state.panArrayImage[index].x._value,
          y: this.state.panArrayImage[index].y._value
        });
        selectedPanArray.setValue({
          x: this.state.panArrayImage[index].x._value,
          y: this.state.panArrayImage[index].y._value
        });

        const existingPanArray = this.state.panArrayImage;

        existingPanArray[index] = selectedPanArray;

        this.setState({
          panArrayImage: existingPanArray
        });
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.panArrayImage[index].flattenOffset();
      }
    });
  }
  /**@param {*} index: Number, index wise moving  emoji  */
  getPanResponderSticker(index) {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panArraySticker[index].x,
          dy: this.state.panArraySticker[index].y
        }
      ]),
      onPanResponderGrant: (e, gestureState) => {
        const selectedPanArray = this.state.panArraySticker[index];
        selectedPanArray.setOffset({
          x: this.state.panArraySticker[index].x._value,
          y: this.state.panArraySticker[index].y._value
        });
        selectedPanArray.setValue({
          x: this.state.panArraySticker[index].x._value,
          y: this.state.panArraySticker[index].y._value
        });

        const existingPanArray = this.state.panArraySticker;

        existingPanArray[index] = selectedPanArray;

        this.setState({
          panArraySticker: existingPanArray
        });
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.panArraySticker[index].flattenOffset();
      }
    });
  }
  /**@param {*} props :  props from picture screen
   * get in props: image, loopCount, style, lock, visible, text, color, onPress, existingIndex, sticker, offset */
  componentWillReceiveProps(props) {
    console.log("props value====caption==============", props.sticker);

    let data = [];
    let stickerBitmoji = [];
    let stickerAndEmoji = [];

    const existingPanArray = this.state.panArray;
    const existingPanArrayImage = this.state.panArrayImage;
    const existingPanArraySticker = this.state.lastOffset;
    const translateX = this.state.translateX;
    const translateY = this.state.translateY;
    const rotate = this.state.rotate;
    const lastRotate = this.state.lastRotate;
    const rotateStr = this.state.rotateStr;
    /** setState text and color */

    for (let i = 0; i < props.text.length; i++) {
      if (props.text[i] != "") {
        data.push({
          text: props.text[i],
          color: props.color[i],
          font: props.font[i]
        });
        existingPanArray.push(
          new Animated.ValueXY({ x: 0, y: this.props.offset })
        );
      }
    }
    /** setState bitmoji stickers */

    for (let i = 0; i < props.image.length; i++) {
      stickerBitmoji.push({
        image: props.image[i]
      });
      existingPanArrayImage.push(
        new Animated.ValueXY({ x: 0, y: this.props.offset })
      );
    }
    /** setState Emoji  */
    rotate.push(new Animated.Value(0));
    lastRotate.push(0);
    for (let i = 0; i < props.sticker.length; i++) {
      stickerAndEmoji.push({
        sticker: props.sticker[i]
      });
      
      rotateStr.push(
        this.state.rotate[i].interpolate({
          inputRange: [-100, 100],
          outputRange: ["-100rad", "100rad"]
        })
      );
    }
   
    translateX.push(new Animated.Value(0));
    translateY.push(new Animated.Value(0));
    
 
    existingPanArraySticker.push({ x: 0, y: 0 });
    this.setState({
      captionArray: data,
      panArray: existingPanArray,
      imageArray: stickerBitmoji,
      panArrayImage: existingPanArrayImage,
      stickerArray: stickerAndEmoji,
      translateX: translateX,
      translateY: translateY,
      lastOffset: existingPanArraySticker,
      rotate: rotate,
      lastRotate: lastRotate,
      rotateStr: rotateStr
    });
  }
  /** @param {*} index : Number, index wise call function  */
  onclickFunction(index) {
    this.props.onPress(index);
  }

  render() {
    var bg = this.props.color == "#000000" ? FADEDWHITE : FADEDBLACK;
    if (this.props.visible) {
      return (
        <View>
          {/* get text and color in  captionArray*/}

          {this.state.captionArray.map((data, index) => (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
              }}
            >
              <Animated.View
                key={index}
                {...(this.props.lock
                  ? null
                  : this.getPanResponder(index).panHandlers)}
                style={[
                  this.props.style,
                  styles.container,
                  {
                    transform: [
                      { translateX: this.state.panArray[index].x },
                      { translateY: this.state.panArray[index].y }
                    ]
                  }
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.onclickFunction(index)}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        backgroundColor: bg,
                        color: data.color,
                        fontFamily: data.font,
                        width: 100
                      }
                    ]}
                  >
                    {data.text}
                  </Text>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          ))}
          {/* get Bitmoji stickers in  imageArray*/}
          {this.state.imageArray.map((data, index) => (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
              }}
            >
              <Animated.View
                key={index}
                {...(this.props.lock
                  ? null
                  : this.getPanResponderImage(index).panHandlers)}
                style={[
                  this.props.style,
                  styles.container,
                  {
                    transform: [
                      { translateX: this.state.panArrayImage[index].x },
                      { translateY: this.state.panArrayImage[index].y }
                    ]
                  }
                ]}
              >
                <TouchableWithoutFeedback>
                  <Image source={{ uri: data.image }} style={styles.preview} />
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          ))}
          {/* get  stickers in  stickerArray*/}
          {this.state.stickerArray.map((data, index) => (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
              }}
            >
              <PanGestureHandler
                key={index}
                {...this.props}
                onGestureEvent={this.state.onPanGestureEvent}
                onHandlerStateChange={e => this.onPanStateChange(e, index)}
                id={index + "image_drag"}
                simultaneousHandlers={[
                  index + "image_pinch",
                  index + "image_rotation"
                ]}
                shouldCancelWhenOutside={true}
              >
                <RotationGestureHandler
                  key={index}
                  id={index + "image_rotation"}
                  simultaneousHandlers={[
                    index + "image_pinch",
                    index + "image_drag"
                  ]}
                  onGestureEvent={this.state.onRotateGestureEvent}
                  onHandlerStateChange={e =>
                    this.onRotateHandlerStateChange(e, index)
                  }
                >
                  <PinchGestureHandler
                    key={index}
                    id={index + "image_pinch"}
                    simultaneousHandlers={[
                      index + "image_rotation",
                      index + "image_drag"
                    ]}
                    onGestureEvent={this.onPinchGestureEvent}
                    onHandlerStateChange={index =>
                      this.onPinchHandlerStateChange(index)
                    }
                  >
                    <Animated.View
                      key={index}
                      style={[
                        styles.stickerContainer,
                        this.props.style,
                        {
                          transform: [
                            { translateX: this.state.translateX[index] },
                            { translateY: this.state.translateY[index] }
                          ]
                        }
                      ]}
                      collapsable={false}
                    >
                      <TouchableWithoutFeedback>
                        <Animated.Image
                          style={[
                            styles.preview,
                            {
                              transform: [
                                { perspective: 200 },
                                { scale: this.scale },
                                { rotate: this.state.rotateStr[index] }
                              ]
                            }
                          ]}
                          source={{ uri: "file://" + data.sticker }}
                        />
                      </TouchableWithoutFeedback>
                    </Animated.View>
                  </PinchGestureHandler>
                </RotationGestureHandler>
              </PanGestureHandler>
            </View>
          ))}
        </View>
      );
    } else {
      return null;
    }
  }
}

Caption.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  text: PropTypes.string,
  lock: PropTypes.bool,
  offset: PropTypes.number,
  visible: PropTypes.bool
};

Caption.defaultProps = {
  text: "",
  lock: true,
  offset: HEIGHT / 2,
  visible: true,
  onPress: () => {}
};
