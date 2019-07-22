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
      newText:[],
      fontStyle: []
    };

    this.input = null;
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  componentDidMount = () => {
    if (Platform.OS == "android") {
      AndroidKeyboardAdjust.setAdjustNothing();
    }

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
  };

  componentWillUnmount = () => {
    if (Platform.OS == "android") {
      AndroidKeyboardAdjust.setAdjustResize();
    }
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
  };

  /** on Back press call function */
  _handleBackPress = () => {
    this._keyboardDidHide();
    return true;
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
    var bg;
    bg = color == "#000000" ? FADEDWHITE : FADEDBLACK;
    let existingColor = this.state.color;
    existingColor[this.state.existingIndex] = color;
    this.setState({ color: existingColor, backgroundColor: bg });
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

  /** display color bar */
  renderColorBar = () => {
    return (
      <View style={styles.colorBar}>
        <TouchableOpacity
          onPressOut={() => {
            this.onColorSelected(COLORS[0]);
          }}
          style={[styles.colorButton]}
        >
          <View
            style={[styles.colorButtonView, { backgroundColor: COLORS[0] }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPressOut={() => {
            this.onColorSelected(COLORS[1]);
          }}
          style={[styles.colorButton]}
        >
          <View
            style={[styles.colorButtonView, { backgroundColor: COLORS[1] }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPressOut={() => {
            this.onColorSelected(COLORS[2]);
          }}
          style={[styles.colorButton]}
        >
          <View
            style={[styles.colorButtonView, { backgroundColor: COLORS[2] }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPressOut={() => {
            this.onColorSelected(COLORS[3]);
          }}
          style={[styles.colorButton]}
        >
          <View
            style={[styles.colorButtonView, { backgroundColor: COLORS[3] }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPressOut={() => {
            this.onColorSelected(COLORS[4]);
          }}
          style={[styles.colorButton]}
        >
          <View
            style={[styles.colorButtonView, { backgroundColor: COLORS[4] }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPressOut={() => {
            this.onColorSelected(COLORS[5]);
          }}
          style={[styles.colorButton]}
        >
          <View
            style={[styles.colorButtonView, { backgroundColor: COLORS[5] }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPressOut={() => {
            this.onColorSelected(COLORS[6]);
          }}
          style={[styles.colorButton]}
        >
          <View
            style={[styles.colorButtonView, { backgroundColor: COLORS[6] }]}
          />
        </TouchableOpacity>
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
