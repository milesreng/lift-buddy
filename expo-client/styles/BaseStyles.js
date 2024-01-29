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
    paddingBottom: 12,
    textTransform: 'capitalize'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: Colors.BG
  },
  categoryText: {
    fontWeight: 'bold'
  },
  recordModalView: {

  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.LIGHTEST,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between'
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
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