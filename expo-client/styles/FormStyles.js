import { StyleSheet } from "react-native"

import Colors from "../utilities/Color"

const formStyle = StyleSheet.create({
  formContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 6,
    flexDirection: 'column',
    gap: 12
  },
  formInput: {
    width: "50%",
    backgroundColor: Colors.LIGHT_ACCENT,
    margin: 'auto',
    padding: 2
  }
})

export default formStyle