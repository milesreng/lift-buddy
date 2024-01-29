import { StyleSheet } from 'react-native'

import Colors from '../utilities/Color'

export default recordStyles = StyleSheet.create({
  modalView: {
    height: '90%',
    width: '90%',
  },
  recordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-evenly',
    width: 'screen',
    padding: 12
  },
  record: {
    width: '45%',
    backgroundColor: Colors.BG_LIGHT_ACCENT,
    padding: 8,
    borderColor: Colors.BG_DARK,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryText: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  exerciseRecordContainer: {
    padding: 12,
  },
  exerciseModalView: {
    width: '80%',
    height: '70%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12
  },
  exerciseImageContainer: {
    height: '40%',
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    margin: 'auto',
    justifyContent: 'center',
    backgroundColor: Colors.BG_LIGHT
  },
  exerciseImageText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.BG_DARK
  },
  recordHeaderText: {
    fontWeight: 'bold'
  },
  recordDateText: {

  },
  scrollContainer: {
    paddingVertical: 20,
    marginBottom: 80
  }
})