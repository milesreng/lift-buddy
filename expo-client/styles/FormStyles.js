import { StyleSheet } from 'react-native'

import Colors from '../utilities/Color'

const formStyles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 12,
    verticalAlign: 'center',
    height: '100%'
  },
  accountFormContainer: {
    justifyContent: 'center',
    gap: 6,
    marginTop: -24
  },
  formInput: {
    color: Colors.BG_DARK,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.LIGHT,
    borderRadius: 4
  },
  formInputLabel: {
    paddingVertical: 8
  },
  passwordMatchInput: {
    borderColor: 'green',
    borderWidth: 1
  },
  passwordMismatchInput: {
    borderColor: 'red',
    backgroundColor: Colors.ERROR_RED,
    borderWidth: 1
  },
  formButton: {
    width: '50%',
    alignSelf: 'center',
    paddingVertical: 4,
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
    fontSize: 16
  },
  forgotPasswordText: {
    textAlign: 'center',
  }
})
export default formStyles