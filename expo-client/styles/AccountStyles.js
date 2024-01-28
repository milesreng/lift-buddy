import { StyleSheet } from 'react-native'

import Colors from '../utilities/Color'

export default accountStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: Colors.BG
  },
  modalView: {
    height: '60%',
    width: '80%',
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
    justifyContent: 'space-between'
  },
  buttonLogout: {
    backgroundColor: Colors.DARK_ACCENT,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 5,
    height: 28,
    paddingHorizontal: 10,
    elevation: 2, 
  },
  buttonText: {
    color: 'white'
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  buttonSubmit: {
    backgroundColor: Colors.MID
  },
  buttonCloseText: {
    color: 'red',
    fontWeight: 'bold'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  profileImage: {
    borderRadius: 300,
    aspectRatio: 1,
    flex: 1
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileSummary: {
    flex: 4,
    verticalAlign: 'middle'
  },
  profileSummaryText: {
    fontSize: 16
  }
})