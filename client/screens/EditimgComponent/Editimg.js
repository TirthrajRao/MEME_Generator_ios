/** Editimg call from Picture screen as a child component
 * in Editimg add text and color
 */

import React from "react";
import {
  Platform,
  View,
  Keyboard,
  BackHandler,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  ScrollView
} from "react-native";
import AndroidKeyboardAdjust from "react-native-android-keyboard-adjust";
import PropTypes from "prop-types";
import {
  COLORS,
  FADEDBLACK,
  FADEDWHITE,
  FONTS
} from "../CaptionCompoent/Caption";
import styles from "./editimgstyles";
import { ColorPicker, toHsv } from 'react-native-color-picker'
import tinycolor from 'tinycolor2'; 

/** on click outside DismissKeyboard */

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Editimg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: undefined,
      backgroundColor: "transparent",
      textInput: [],
      totalText: 0,
      color: [],
      text: [],
      onChangeValue: "",
      existingIndex: -1,
      newText: [],
      fontStyle: []
    };

    this.input = null;
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    // this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  componentDidMount = () => {
    if (Platform.OS == "android") {
      AndroidKeyboardAdjust.setAdjustNothing();
    }

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    // this.keyboardDidHideListener = Keyboard.addListener(
    //   "keyboardDidHide",
    //   this._keyboardDidHide
    // );
  };

  componentWillUnmount = () => {
    if (Platform.OS == "android") {
      AndroidKeyboardAdjust.setAdjustResize();
    }
    this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();
  };

  _keyboardDidShow = () => {};
  /** on Back press set text, color and existingIndex */
  _keyboardDidHide = () => {
    if (this.state.text.length == 0) {
      this.props.onCancel();
    }
    this.props.onFinish(
      this.state.text,
      this.state.color,
      this.state.existingIndex,
      this.state.fontStyle
    );
  };
  /** @param {string} newText add  text  */
  onChangeText = (newText, index) => {
    const ExistingText = this.state.text;
    ExistingText[index] = newText;
    this.setState({
      text: ExistingText,
      backgroundColor: this.state.color == "#000000" ? FADEDWHITE : FADEDBLACK
    });
  };
  /** @param {string} color selected color  */
  onColorSelected = color => {
    let colors =  tinycolor(color).toHexString()
    var bg;
    bg = colors == "#000000" ? FADEDWHITE : FADEDBLACK;
    let existingColor = this.state.color;
    existingColor[this.state.existingIndex] = colors;
    this.setState({ color: existingColor, backgroundColor: bg });
    console.log(this.state.color,"========call",color);
  };

  /** @param {string}  selectedValue: selected font*/
  onFontSelected = selectedValue => {
    let existingFont = this.state.fontStyle;
    existingFont[this.state.existingIndex] = selectedValue;
    this.setState({ fontStyle: existingFont });
  };

  /** display font styles */
  renderFontBar = () => {
    return (
      <View style={styles.FontBar}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[0]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[0] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[0],
                    fontSize: 20
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[1]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[1] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[1]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[2]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[2] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[2]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[3]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[3] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[3]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[4]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[4] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[4]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[5]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[5] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[5]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[6]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[6] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[6]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[7]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[7] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[7]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[8]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[8] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[8]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              this.onFontSelected(FONTS[9]);
            }}
            style={[styles.FontButton]}
          >
            <View style={{ fontFamily: FONTS[9] }}>
              <Text
                style={[
                  styles.textFont,
                  {
                    fontFamily: FONTS[9]
                  }
                ]}
              >
                Label
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  /** display color picker */
  renderColorBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 150,
          position: "absolute",
          marginTop: 300,
          bottom: 0,
          right: 0,
          left: 0,
          paddingRight: 15,
          paddingBottom: 15,
          marginTop: 10
        }}
      >
        <ColorPicker
          onColorChange={color => this.onColorSelected(color)}
          style={{ flex: 1 }}
        />
      </View>
    );
  };
  /** @param {Number} key : Number , addTextInput function call from picture view and key is loopcount */

  addTextInput = key => {
    let textInput = this.state.textInput;
    textInput.push(key);

    let existinColor = this.state.color;
    existinColor.push("#fff");

    let existinFont = this.state.fontStyle;
    existinFont.push();

    let existinText = this.state.text;
    existinText.push("Sample Text");
    this.setState({
      text: existinText,
      textInput,
      color: existinColor,
      fontStyle: existinFont,
      existingIndex: this.state.existingIndex + 1
    });
  };

  render() {
    let len = this.state.text.length;

    if (this.props.enabled) {
      return (
        <DismissKeyboard>
          <View
            style={[
              this.props.style,
              { backgroundColor: this.state.backgroundColor }
            ]}
          >
            <View style={styles.textInputView}>
              <View style={styles.doneBtn}>
                <TouchableOpacity onPress={() => this._keyboardDidHide()}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
              {len > 0 ? this.renderFontBar() : null}
              {len > 0 ? this.renderColorBar() : null}

              {this.state.textInput.map((value, index) => {
                return (
                  <TextInput
                    key={index}
                    autoFocus={true}
                    style={[
                      styles.textInput,
                      {
                        color: this.state.color[index],
                        fontFamily: this.state.fontStyle[index]
                      }
                    ]}
                    multiline={true}
                    autoGrow={true}
                    maxLength={140}
                    underlineColorAndroid="transparent"
                    name="text"
                    onChangeText={text => this.onChangeText(text, index)}
                    value={this.state.text[index]}
                    editable={true}
                  />
                );
              })}
            </View>
          </View>
        </DismissKeyboard>
      );
    } else {
      return null;
    }
  }
}

Editimg.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  enabled: PropTypes.bool,
  children: PropTypes.element.isRequired
};

Editimg.defaultProps = {
  onCancel: () => {},
  onFinish: () => {},
  enabled: false
};
