import React, { Component } from "react";
import { Dimensions, View, Animated} from "react-native";
import styles from "./captionStyles";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
import PropTypes from "prop-types";

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
const USE_NATIVE_DRIVER = false;
const HEIGHT = Dimensions.get("window").height;

export class Caption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      captionArray: [], // captionArray contains text, color and fonts
      panArrayImage: [], // bitmoji stickers
      imageArray: [], // bitmoji stickers
      stickerArray: [], //  stickerArray contains stickers

      /* Pan Stickers*/
      onPanGestureEvent: [],
      lastOffset: [],
      translateX: [],
      translateY: [],

      /* Rotation stickers */
      onRotateGestureEvent: [],
      rotate: [],
      lastRotate: [],
      rotateStr: [],

      /* Pinching stickers */
      onPinchGestureEvent: [],
      baseScale: [],
      pinchScale: [],
      scale: [],
      lastScale: [],

      /** text pan  */
      onPanGestureEventText: [],
      lastOffsetText: [],
      translateXText: [],
      translateYText: [],

      /** text rotate */
      onRotateGestureEventText: [],
      rotateText: [],
      lastRotateText: [],
      rotateStrText: [],

      /** text pinch */
      onPinchGestureEventText: [],
      baseScaleText: [],
      pinchScaleText: [],
      scaleText: [],
      lastScaleText: [],

      /** Bitmoji pan  */
      onPanGestureEventBitmoji: [],
      lastOffsetBitmoji: [],
      translateXBitmoji: [],
      translateYBitmoji: [],

      /** Bitmoji rotate */
      onRotateGestureEventBitmoji: [],
      rotateBitmoji: [],
      lastRotateBitmoji: [],
      rotateStrBitmoji: [],

      /** Bitmoji pinch */
      onPinchGestureEventBitmoji: [],
      baseScaleBitmoji: [],
      pinchScaleBitmoji: [],
      scaleBitmoji: [],
      lastScaleBitmoji: []
    };
  }

  /** set initial value => pan, rotate and pinch for Text and Stickers */
  componentDidMount = () => {
    // onPanGestureEvent  Stickers
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
    // onPanGestureEvent  Text
    this.state.onPanGestureEventText = Animated.event(
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

    // onPanGestureEvent  Bitmoji
    this.state.onPanGestureEventBitmoji = Animated.event(
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

    // onRotateGestureEvent Stickers
    this.state.onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this.rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    // onRotateGestureEvent Text
    this.state.onRotateGestureEventText = Animated.event(
      [{ nativeEvent: { rotation: this.rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    // onRotateGestureEvent Bitmoji
    this.state.onRotateGestureEventBitmoji = Animated.event(
      [{ nativeEvent: { rotation: this.rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    // onPinchGestureEvent Stickers
    this.state.onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this.pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    // onPinchGestureEvent Text
    this.state.onPinchGestureEventText = Animated.event(
      [{ nativeEvent: { scale: this.pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    // onPinchGestureEvent Bitmoji
    this.state.onPinchGestureEventBitmoji = Animated.event(
      [{ nativeEvent: { scale: this.pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Bitmoji)
   * this function use for rotate Bitmoji
   */
  onRotateHandlerStateChangeBimoji = (event, index) => {
   
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastRotateBitmoji[index] += event.nativeEvent.rotation;
      this.state.rotateBitmoji[index].setOffset(
        this.state.lastRotateBitmoji[index]
      );
      this.state.rotateBitmoji[index].setValue(0);

      this.state.rotateStrBitmoji[index] = this.state.rotateBitmoji[
        index
      ].interpolate({
        inputRange: [-100, 100],
        outputRange: ["-100rad", "100rad"]
      });
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Bitmoji)
   * this function use for Pinch Bitmoji
   */
  onPinchHandlerStateChangeBitmoji = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let lastScaleStateBitmoji = this.state.lastScaleBitmoji;
      lastScaleStateBitmoji[index] *= event.nativeEvent.scale;
      let baseScaleStateBitmoji = this.state.baseScaleBitmoji;
      baseScaleStateBitmoji[index].setValue(lastScaleStateBitmoji[index]);
      let scaleStateBitmoji = this.state.scaleBitmoji;

      let pichScaleStateBitmoji = this.state.pinchScaleBitmoji;
      scaleStateBitmoji[index] = Animated.multiply(
        baseScaleStateBitmoji[index],
        pichScaleStateBitmoji[index]
      );

      this.setState({
        lastScaleBitmoji: lastScaleStateBitmoji,
        baseScaleBitmoji: baseScaleStateBitmoji,
        scaleBitmoji: scaleStateBitmoji
      });
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Bitmoji)
   * this function use for Move Bitmoji
   */
  onPanStateChangeBitmoji = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastOffsetBitmoji[index].x += event.nativeEvent.translationX;
      this.state.lastOffsetBitmoji[index].y += event.nativeEvent.translationY;
      this.state.translateXBitmoji[index].setOffset(
        this.state.lastOffsetBitmoji[index].x
      );
      this.state.translateXBitmoji[index].setValue(0);
      this.state.translateYBitmoji[index].setOffset(
        this.state.lastOffsetBitmoji[index].y
      );
      this.state.translateYBitmoji[index].setValue(0);
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Text)
   * this function use for rotate Text
   */
  onRotateHandlerStateChangeText = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastRotateText[index] += event.nativeEvent.rotation;
      this.state.rotateText[index].setOffset(this.state.lastRotateText[index]);
      this.state.rotateText[index].setValue(0);

      this.state.rotateStrText[index] = this.state.rotateText[
        index
      ].interpolate({
        inputRange: [-100, 100],
        outputRange: ["-100rad", "100rad"]
      });
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Text)
   * this function use for Pinch Text
   */
  onPinchHandlerStateChangeText = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let lastScaleStateText = this.state.lastScaleText;
      lastScaleStateText[index] *= event.nativeEvent.scale;
      let baseScaleStateText = this.state.baseScaleText;
      baseScaleStateText[index].setValue(lastScaleStateText[index]);
      let scaleStateText = this.state.scaleText;

      let pichScaleStateText = this.state.pinchScaleText;
      scaleStateText[index] = Animated.multiply(
        baseScaleStateText[index],
        pichScaleStateText[index]
      );

      this.setState({
        lastScaleText: lastScaleStateText,
        baseScaleText: baseScaleStateText,
        scaleText: scaleStateText
      });
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Text)
   * this function use for Move Text
   */
  onPanStateChangeText = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastOffsetText[index].x += event.nativeEvent.translationX;
      this.state.lastOffsetText[index].y += event.nativeEvent.translationY;
      this.state.translateXText[index].setOffset(
        this.state.lastOffsetText[index].x
      );
      this.state.translateXText[index].setValue(0);
      this.state.translateYText[index].setOffset(
        this.state.lastOffsetText[index].y
      );
      this.state.translateYText[index].setValue(0);
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Stickers)
   * this function use for rotate Stickers
   */
  onRotateHandlerStateChangeStickers = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastRotate[index] += event.nativeEvent.rotation;
      this.state.rotate[index].setOffset(this.state.lastRotate[index]);
      this.state.rotate[index].setValue(0);

      this.state.rotateStr[index] = this.state.rotate[index].interpolate({
        inputRange: [-100, 100],
        outputRange: ["-100rad", "100rad"]
      });
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Stickers)
   * this function use for Pinch Stickers
   */
  onPinchHandlerStateChangeStickers = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let lastScaleState = this.state.lastScale;
      lastScaleState[index] *= event.nativeEvent.scale;
      let baseScaleState = this.state.baseScale;
      baseScaleState[index].setValue(lastScaleState[index]);
      let scaleState = this.state.scale;

      // Htis sods
      let pichScaleState = this.state.pinchScale;
      scaleState[index] = Animated.multiply(
        baseScaleState[index],
        pichScaleState[index]
      );

      this.setState({
        lastScale: lastScaleState,
        baseScale: baseScaleState,
        scale: scaleState
      });
    }
  };

  /**
   * @param {object} event Event object which contains event details
   * @param {number} index which index of current element(Stickers)
   * this function use for Move Stickers
   */
  onPanStateChangeStickers = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.state.lastOffset[index].x += event.nativeEvent.translationX;
      this.state.lastOffset[index].y += event.nativeEvent.translationY;
      this.state.translateX[index].setOffset(this.state.lastOffset[index].x);
      this.state.translateX[index].setValue(0);
      this.state.translateY[index].setOffset(this.state.lastOffset[index].y);
      this.state.translateY[index].setValue(0);
    }
  };


  /**
   *  @param {*}  props :props from picture screen
   *  get in props: image, loopCount, style, lock, visible, text, color, onPress, existingIndex, sticker, offset
   * in componentWillReceiveProps set initial value for move, pinch and rotate (Text, Stickers)
   */
  componentWillReceiveProps = async props => {
    let data = []; // for text, color, font
    let stickerBitmoji = []; // for bitmoji stickers
    let stickerAndEmoji = []; //for stickers
    let arrayrotatestr = []; //for  rotate stickers
    let arrayPinch = []; // for pinch stickers
    let arraybase = []; // for pich stickers
    let arrayrotatestrText = []; // for rotate text
    let arrayPinchText = []; // for pinch text
    let arraybaseText = []; // for pich text
    let arrayrotatestrBitmoji = []; // for rotate Bitmoji
    let arrayPinchBitmoji = []; // for pinch Bitmoji
    let arraybaseBitmoji = []; // for pich Bitmoji

    /** pan stickers */
    const existingPanArraySticker = this.state.lastOffset;
    const translateX = this.state.translateX;
    const translateY = this.state.translateY;

    /** rotate stickers */
    const rotate = this.state.rotate;
    const lastRotate = this.state.lastRotate;
    const rotateStr = this.state.rotateStr;

    /** pinch stickers */
    const baseScale = this.state.baseScale;
    const pinchScale = this.state.pinchScale;
    const scale = this.state.scale;
    const lastScale = this.state.lastScale;

    /** pan text */
    const existingPanArrayText = this.state.lastOffsetText;
    const translateXText = this.state.translateXText;
    const translateYText = this.state.translateYText;

    /** rotate text */
    const rotateText = this.state.rotateText;
    const lastRotateText = this.state.lastRotateText;
    const rotateStrText = this.state.rotateStrText;

    /** pinch text */
    const baseScaleText = this.state.baseScaleText;
    const pinchScaleText = this.state.pinchScaleText;
    const scaleText = this.state.scaleText;
    const lastScaleText = this.state.lastScaleText;

    /** pan Bitmoji */
    const existingPanArrayBitmoji = this.state.lastOffsetBitmoji;
    const translateXBitmoji = this.state.translateXBitmoji;
    const translateYBitmoji = this.state.translateYBitmoji;

    /** rotate Bitmoji */
    const rotateBitmoji = this.state.rotateBitmoji;
    const lastRotateBitmoji = this.state.lastRotateBitmoji;
    const rotateStrBitmoji = this.state.rotateStrBitmoji;

    /** pinch Bitmoji */
    const baseScaleBitmoji = this.state.baseScaleBitmoji;
    const pinchScaleBitmoji = this.state.pinchScaleBitmoji;
    const scaleBitmoji = this.state.scaleBitmoji;
    const lastScaleBitmoji = this.state.lastScaleBitmoji;

    /** setState Bitmoji  */
    // if condition for Bitmoji
    if (props.image && props.image.length) {
      // for rotate Bitmoji
      rotateBitmoji.push(new Animated.Value(0));
      lastRotateBitmoji.push(0);
      // for pinch Bitmoji
      pinchScaleBitmoji.push(new Animated.Value(1));
      baseScaleBitmoji.push(new Animated.Value(1));
      lastScaleBitmoji.push(1);

      this.setState({
        rotateBitmoji: rotateBitmoji,
        lastRotateBitmoji: lastRotateBitmoji,
        pinchScaleBitmoji: pinchScaleBitmoji,
        baseScaleBitmoji: baseScaleBitmoji,
        lastScaleBitmoji: lastScaleBitmoji
      });
      /** setState bitmoji stickers */
      for (let i = 0; i < props.image.length; i++) {
        stickerBitmoji.push({
          image: props.image[i]
        });
        arrayrotatestrBitmoji = this.state.rotateBitmoji[i]; // for roatateStr
        arrayPinchBitmoji = this.state.pinchScaleBitmoji[i]; // for scale (pinch)
        arraybaseBitmoji = this.state.baseScaleBitmoji[i]; // for scale (pinch)
      }

      this.setState({
        imageArray: stickerBitmoji
      });

      scaleBitmoji.push(Animated.multiply(arraybaseBitmoji, arrayPinchBitmoji)); // set scale for pinch Bitmoji
      rotateStrBitmoji.push(
        arrayrotatestrBitmoji.interpolate({
          inputRange: [-100, 100],
          outputRange: ["-100rad", "100rad"]
        })
      );

      // for move Bitmoji
      translateXBitmoji.push(new Animated.Value(0));
      translateYBitmoji.push(new Animated.Value(374.90909090909093)); // HEIGHT/2 => 374.90909090909093
      existingPanArrayBitmoji.push({ x: 0, y: 374.90909090909093 });

      this.setState({
        translateXBitmoji: translateXBitmoji,
        translateYBitmoji: translateYBitmoji,
        lastOffsetBitmoji: existingPanArrayBitmoji,
        rotateStrBitmoji: rotateStrBitmoji,
        scaleBitmoji: scaleBitmoji
      });
    }

    // if condition for text
    if (props.text && props.text.length) {
      // for rotate text
      rotateText.push(new Animated.Value(0));
      lastRotateText.push(0);
      // for pinch text
      pinchScaleText.push(new Animated.Value(1));
      baseScaleText.push(new Animated.Value(1));
      lastScaleText.push(1);

      this.setState({
        rotateText: rotateText,
        lastRotateText: lastRotateText,
        pinchScaleText: pinchScaleText,
        baseScaleText: baseScaleText,
        lastScaleText: lastScaleText
      });
      // setState text and color
      for (let i = 0; i < props.text.length; i++) {
        if (props.text[i] != "") {
          data.push({
            text: props.text[i],
            color: props.color[i],
            font: props.font[i]
          });
          arrayrotatestrText = this.state.rotateText[i]; // for roatateStr
          arrayPinchText = this.state.pinchScaleText[i]; // for scale (pinch)
          arraybaseText = this.state.baseScaleText[i]; // for scale (pinch)
        }
      }
      this.setState({
        captionArray: data
      });
      scaleText.push(Animated.multiply(arraybaseText, arrayPinchText)); // set scale for pinch text
      rotateStrText.push(
        arrayrotatestrText.interpolate({
          inputRange: [-100, 100],
          outputRange: ["-100rad", "100rad"]
        })
      );

      // for move text
      translateXText.push(new Animated.Value(0));
      translateYText.push(new Animated.Value(374.90909090909093)); // HEIGHT/2 => 374.90909090909093
      existingPanArrayText.push({ x: 0, y: 374.90909090909093 });

      this.setState({
        translateXText: translateXText,
        translateYText: translateYText,
        lastOffsetText: existingPanArrayText,
        rotateStrText: rotateStrText,
        scaleText: scaleText
      });
    }

    /** setState stickers  */
    // Its for the rotating the emoji
    if (this.props.sticker && this.props.sticker.length) {
      // rotate stickers
      rotate.push(new Animated.Value(0));
      lastRotate.push(0);

      // pinch stickers
      pinchScale.push(new Animated.Value(1));
      baseScale.push(new Animated.Value(1));
      lastScale.push(1);

      this.setState({
        rotate: rotate,
        lastRotate: lastRotate,
        baseScale: baseScale,
        lastScale: lastScale,
        pinchScale: pinchScale
      });
      for (let i = 0; i < props.sticker.length; i++) {
        stickerAndEmoji.push({
          sticker: props.sticker[i]
        });
        arrayrotatestr = await this.state.rotate[i];
        arrayPinch = this.state.pinchScale[i];
        arraybase = this.state.baseScale[i];
      }
      scale.push(Animated.multiply(arraybase, arrayPinch));
      await rotateStr.push(
        arrayrotatestr.interpolate({
          inputRange: [-100, 100],
          outputRange: ["-100rad", "100rad"]
        })
      );
      // for move stickers
      translateX.push(new Animated.Value(0));
      translateY.push(new Animated.Value(374.90909090909093)); // HEIGHT/2 => 374.90909090909093
      existingPanArraySticker.push({ x: 0, y: 374.90909090909093 });
      this.setState({
        stickerArray: stickerAndEmoji,
        translateX: translateX,
        translateY: translateY,
        lastOffset: existingPanArraySticker,
        rotateStr: rotateStr,
        scale: scale
      });
    }
  };

  /** @param {number} index : Number, index wise call function  */
  onclickFunction(index) {
    this.props.onPress(index);
    console.log("call function ");
  }

  onCancel() {
    this.setState({
      captionArray: [], // captionArray contains text, color and fonts
      panArrayImage: [], // bitmoji stickers
      stickerArray: [],
      imageArray: []
    });
  }

  render() {
    if (this.props.visible) {
      return (
        <View>
          {/* get text and color in  captionArray*/}

          {/* <TouchableWithoutFeedback onPress = { () => this.onclickFunction()}> */}
          {this.state.captionArray.map((data, index) => (
            // <AnimatedTouchable onPress={index => this.onclickFunction(index)}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
              }}
            >
              {/* pan Text */}
              <PanGestureHandler
                key={index}
                {...this.props}
                onGestureEvent={this.state.onPanGestureEventText}
                onHandlerStateChange={e => this.onPanStateChangeText(e, index)}
                id={index + "imagedrag"}
                simultaneousHandlers={[
                  index + "imagepinch",
                  index + "imagerotation"
                ]}
                shouldCancelWhenOutside={true}
              >
                {/* Rotate Text */}
                <RotationGestureHandler
                  key={index}
                  id={index + "imagerotation"}
                  simultaneousHandlers={[
                    index + "imagepinch",
                    index + "imagedrag"
                  ]}
                  onGestureEvent={this.state.onRotateGestureEventText}
                  onHandlerStateChange={e =>
                    this.onRotateHandlerStateChangeText(e, index)
                  }
                >
                  {/* pinch Text */}
                  <PinchGestureHandler
                    key={index}
                    id={index + "imagepinch"}
                    simultaneousHandlers={[
                      index + "imagerotation",
                      index + "imagedrag"
                    ]}
                    onGestureEvent={this.state.onPinchGestureEventText}
                    onHandlerStateChange={e =>
                      this.onPinchHandlerStateChangeText(e, index)
                    }
                  >
                    <Animated.View
                      key={index}
                      style={[
                        styles.stickerContainer,
                        this.props.style,
                        {
                          transform: [
                            {
                              translateX: this.state.translateXText[index]
                            },
                            { translateY: this.state.translateYText[index] }
                          ]
                        }
                      ]}
                      collapsable={false}
                    >
                      <Animated.Text
                        key={index}
                        style={[
                          styles.text,
                          {
                            color: data.color,
                            fontFamily: data.font
                          },
                          {
                            transform: [
                              { perspective: 200 },
                              { scale: this.state.scaleText[index] },
                              { rotate: this.state.rotateStrText[index] }
                            ]
                          }
                        ]}
                      >
                        {data.text}
                      </Animated.Text>
                    </Animated.View>
                  </PinchGestureHandler>
                </RotationGestureHandler>
              </PanGestureHandler>
            </View>
            // </AnimatedTouchable>
          ))}
          {/* </TouchableWithoutFeedback>    */}
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
              {/* pan Bitmoji */}
              <PanGestureHandler
                key={index}
                {...this.props}
                onGestureEvent={this.state.onPanGestureEventBitmoji}
                onHandlerStateChange={e =>
                  this.onPanStateChangeBitmoji(e, index)
                }
                id={index + "imageDrag"}
                simultaneousHandlers={[
                  index + "imagePinch",
                  index + "imageRotation"
                ]}
                shouldCancelWhenOutside={true}
              >
                {/* Rotate Bitmoji */}
                <RotationGestureHandler
                  key={index}
                  onGestureEvent={this.state.onRotateGestureEventBitmoji}
                  onHandlerStateChange={e =>
                    this.onRotateHandlerStateChangeBimoji(e, index)
                  }
                  id={index + "imageRotation"}
                  simultaneousHandlers={[
                    index + "imagePinch",
                    index + "imageDrag"
                  ]}
                >
                  {/* pinch Bitmoji */}
                  <PinchGestureHandler
                    key={index}
                    onGestureEvent={this.state.onPinchGestureEventBitmoji}
                    onHandlerStateChange={e =>
                      this.onPinchHandlerStateChangeBitmoji(e, index)
                    }
                    id={index + "imagePinch"}
                    simultaneousHandlers={[
                      index + "imageRotation",
                      index + "imageDrag"
                    ]}
                  >
                    <Animated.View
                      key={index}
                      style={[
                        styles.stickerContainer,
                        this.props.style,
                        {
                          transform: [
                            { translateX: this.state.translateXBitmoji[index] },
                            { translateY: this.state.translateYBitmoji[index] }
                          ]
                        }
                      ]}
                      collapsable={false}
                    >
                      <Animated.Image
                        key={index}
                        style={[
                          styles.preview,
                          {
                            transform: [
                              { perspective: 200 },
                              { scale: this.state.scaleBitmoji[index] },
                              { rotate: this.state.rotateStrBitmoji[index] }
                            ]
                          }
                        ]}
                        source={{ uri: data.image }}
                      />
                    </Animated.View>
                  </PinchGestureHandler>
                </RotationGestureHandler>
              </PanGestureHandler>
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
              {/* pan Stickers */}
              <PanGestureHandler
                key={index}
                {...this.props}
                onGestureEvent={this.state.onPanGestureEvent}
                onHandlerStateChange={e =>
                  this.onPanStateChangeStickers(e, index)
                }
                id={index + "image_drag"}
                simultaneousHandlers={[
                  index + "image_pinch",
                  index + "image_rotation"
                ]}
                shouldCancelWhenOutside={true}
              >
                {/* Rotate Stickers */}
                <RotationGestureHandler
                  key={index}
                  onGestureEvent={this.state.onRotateGestureEvent}
                  onHandlerStateChange={e =>
                    this.onRotateHandlerStateChangeStickers(e, index)
                  }
                  id={index + "image_rotation"}
                  simultaneousHandlers={[
                    index + "image_pinch",
                    index + "image_drag"
                  ]}
                >
                  {/* pinch Stickers */}
                  <PinchGestureHandler
                    key={index}
                    onGestureEvent={this.state.onPinchGestureEvent}
                    onHandlerStateChange={e =>
                      this.onPinchHandlerStateChangeStickers(e, index)
                    }
                    id={index + "image_pinch"}
                    simultaneousHandlers={[
                      index + "image_rotation",
                      index + "image_drag"
                    ]}
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
                      <Animated.Image
                        key={index}
                        style={[
                          styles.preview,
                          {
                            transform: [
                              { perspective: 200 },
                              { scale: this.state.scale[index] },
                              { rotate: this.state.rotateStr[index] }
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
