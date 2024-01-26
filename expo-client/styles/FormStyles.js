import { StyleSheet } from 'react-native'

import Colors from '../utilities/Color'

const formStyles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 12
  },
  formInput: {
    color: Colors.BG_DARK,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.LIGHT,
    borderRadius: 4
  },
  formButton: {
    width: '50%',
    alignSelf: 'center',
    paddingVertical: 2,
    borderRadius: 24
  },
  formSubmitButton: {
    backgroundColor: Colors.DARK_ACCENT,
  },
  formElseButton: {
    backgroundColor: Colors.MID,
  },
  formButtonText: {
    color: Colors.LIGHTEST,
    textAlign: 'center',
  },
  forgotPasswordText: {
    textAlign: 'center',
  }
})
export default formStyles