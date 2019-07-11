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
      stickerArray: []
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

    /* Rotation */
    this.rotate = new Animated.Value(0);
    this.rotateStr = this.rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ["-100rad", "100rad"]
    });
    this.lastRotate = 0;
    this.onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this.rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    /* Pan */

    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.lastOffset = { x: 0, y: 0 };
    this.onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: 
           { translationX: this.translateX,
             translationY: this.translateY
           }

        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
      );
  }


  onRotateHandlerStateChange = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastRotate += event.nativeEvent.rotation;
      this.rotate.setOffset(this.lastRotate);
      this.rotate.setValue(0);
      // console.log("======rotate===,", this.lastRotate);
    }
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
    console.log("-----index", index);
    let nativeEvent = [];
    nativeEvent.push(event.nativeEvent);

    if (event.nativeEvent.oldState === State.ACTIVE) {
      console.log( index, "========nativeEvent[index].oldState=====",nativeEvent[index]);
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);
    }
  };

  /**@param {*} index: Number , index wise moving text  */
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
    console.log("props value====caption==============", props.font);

    let data = [];
    let stickerBitmoji = [];
    let stickerAndEmoji = [];

    const existingPanArray = this.state.panArray;
    const existingPanArrayImage = this.state.panArrayImage;
    const existingPanArraySticker = this.state.panArraySticker;
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

    for (let i = 0; i < props.sticker.length; i++) {
      stickerAndEmoji.push({
        sticker: props.sticker[i]
      });
      existingPanArraySticker.push(
        new Animated.ValueXY({ x: 0, y: this.props.offset })
      );
    }

    this.setState({ captionArray: data, panArray: existingPanArray });
    this.setState({
      imageArray: stickerBitmoji,
      panArrayImage: existingPanArrayImage
    });
    this.setState({
      stickerArray: stickerAndEmoji,
      panArraySticker: existingPanArraySticker
    });
    console.log("this.=============================", this.state.stickerArray);
  }
  /** @param {*} index : Number, index wise call function  */
  onclickFunction(index) {
    this.props.onPress(index);
  }

  render() {
    const translateX = this.translateX;
    const translateY = this.translateY;

    console.log("call render in caption");
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
                onGestureEvent={(index) => this.onPanGestureEvent(index)}
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
                  onGestureEvent={this.onRotateGestureEvent}
                  onHandlerStateChange={index =>
                    this.onRotateHandlerStateChange(index)
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
                        { transform: [{ translateX }, { translateY }] }
                      ]}
                      collapsable={false}
                    >
                      <Animated.Image
                        style={[
                          styles.preview,
                          {
                            transform: [
                              { perspective: 200 },
                              { scale: this.scale },
                              { rotate: this.rotateStr }
                            ]
                          }
                        ]}
                        source={{ uri: "file://" + data.sticker }}
                      />
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

{
  /* <Animated.View
key={index}
{...(this.props.lock
  ? null
  : this.getPanResponderSticker(index).panHandlers)}
style={[
  this.props.style,
  styles.container,
  {
    transform: [
      { translateX: this.state.panArraySticker[index].x },
      { translateY: this.state.panArraySticker[index].y }
    ]
  }
]}
>
<TouchableWithoutFeedback>
  <Image
    source={{ uri: "file://" + data.sticker }}
    style={styles.preview}
  />
</TouchableWithoutFeedback>
</Animated.View> */
}
