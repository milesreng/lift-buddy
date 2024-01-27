import { StyleSheet } from 'react-native'
import Colors from '../utilities/Color'

const baseStyles = StyleSheet.create({
  lightMode: {
    backgroundColor: Colors.BG_LIGHT,
    minHeight: '100%'
  },
  darkMode: {
    backgroundColor: Colors.BG_DARK,
    minHeight: '100%'
  },
  screenContainer: {
    padding: 12
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 12
  }
})

export default baseStyles

// 'dark': '#040D12',
//           'dark-accent': '#183D3D',
//           'mid-accent': '#497061',
//           'mid': '#5C8374',
//           'light-accent': '#93B1A6',
//           'light': '#c3d6ce',
//           'lightest': '#e1ebe7',
//           'bg': '#e5ebe9'