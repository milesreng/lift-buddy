import React, { useState } from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import { formatDistanceToNow } from 'date-fns'

import baseStyles from '../styles/BaseStyles'
import RecordStyles from '../styles/RecordStyles'

const WorkoutRecord = ({ workout }) => {
  const [viewModal, setViewModal] = useState(false)


  return (
    <>
      <View style={recordStyles.record}>
        <Pressable onPress={() => setViewModal(true)}>
          <Text style={recordStyles.recordHeaderText}>
            {workout.name}
          </Text>
          <Text style={recordStyles.recordDateText}>
            {formatDistanceToNow(workout.startTime)} ago
          </Text>
          <Text>
            {workout.exercises.length} {workout.exercises.length === 1 ? 'exercise' : 'exercises'}
          </Text>
        </Pressable>
      </View>
      <Modal
        animationType='slide'
        visible={viewModal}
        onRequestClose={() => setViewModal(false)}>
          <View style={baseStyles.centeredView}>
              <View style={[baseStyles.modalView, RecordStyles.modalView]}>
                <View style={baseStyles.modalButtonsContainer}>
                  <Text style={baseStyles.headerText}>{workout.name}</Text>
                  <Pressable 
                    style={[accountStyles.buttonClose, accountStyles.button]}
                    onPress={() => setViewModal(false)}>
                    <Text style={accountStyles.buttonCloseText}>X</Text>
                  </Pressable>
                </View>
                <View>
                  <Text>hello???</Text>
                  {/* {workout.exercises_info.map((exercise, i) => (
                    <View key={i}>
                      <Text>{exercise.name}</Text>
                    </View>
                  ))} */}
                </View>
                <View style={baseStyles.modalButtonsContainer}>
                  <Pressable style={[accountStyles.button]}>
                    <Text></Text>
                  </Pressable>
                  <Pressable style={[accountStyles.buttonSubmit, accountStyles.button]}>
                    <Text></Text>
                  </Pressable>
                </View>
              </View>
            </View>
      </Modal>
    </>
  )
}

export default WorkoutRecord