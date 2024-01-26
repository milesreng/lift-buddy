import { StyleSheet } from 'react-native'

import Colors from '../utilities/Color'

export default recordStyles = StyleSheet.create({
  workoutContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-evenly',
    width: 'screen',
    padding: 12
  },
  workoutRecord: {
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
  }
})