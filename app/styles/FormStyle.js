import { StyleSheet } from "react-native";

import {
  focusedInputColor,
  fontFamilyRegular,
  fontSizeMedium,
  fontSizeSmall,
  unfocusedInputColor,
} from "./constants.js";

const FormStyle = StyleSheet.create({
  buttonsContainer: {
    alignItems: "center",
    width: "100%",
  },

  calendarIcon: {
    padding: 10,
    fontSize: 24,
  },

  container: {
    backgroundColor: "white",
    flex: 1,
  },

  dateContainer: {
    alignItems: "center",
    backgroundColor: unfocusedInputColor,
    borderRadius: 5,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "center",
  },

  dateTextField: {
    flex: 1,
    fontFamily: fontFamilyRegular,
    fontSize: fontSizeMedium,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },

  errorMessage: {
    color: "red",
    fontFamily: fontFamilyRegular,
    fontSize: fontSizeSmall,
    marginBottom: 7,
    paddingLeft: 3,
    paddingTop: 3,
  },

  formsContainer: {
    padding: 10,
  },

  formTextInputContainer: {
    flexDirection: "row",
  },

  iconContainer: {
    borderColor: "black",
    paddingLeft: 10,
    paddingTop: 8,
  },

  inputContainerSmall: {
    width: 200,
  },

  inputContainerMedium: {
    width: 250,
  },

  inputContainerLarge: {
    width: 300,
  },

  inputHeaderText: {
    fontFamily: fontFamilyRegular,
    fontSize: fontSizeMedium,
  },

  secureTextIcon: {
    fontSize: 24,
  },

  textInput: {
    backgroundColor: unfocusedInputColor,
    borderRadius: 5,
    borderWidth: 0,
    fontFamily: fontFamilyRegular,
    fontSize: fontSizeMedium,
    height: 40,
    paddingLeft: 15,
    width: "90%",
  },

  textInputFocused: {
    backgroundColor: focusedInputColor,
    borderRadius: 5,
    borderWidth: 0,
    fontFamily: fontFamilyRegular,
    fontSize: fontSizeMedium,
    height: 40,
    paddingLeft: 15,
    width: "90%",
  },
});

export default FormStyle;
