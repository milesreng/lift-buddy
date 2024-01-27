import { StyleSheet } from 'react-native'

import Colors from '../utilities/Color'

export default accountStyles = StyleSheet.create({
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
    flex: 3,
    verticalAlign: 'middle'
  },
  profileSummaryText: {
    fontSize: 16
  }
})