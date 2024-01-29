import React, { useState } from 'react'
import { View, Text , Pressable, Modal } from 'react-native'

import baseStyles from '../styles/BaseStyles'
import recordStyles from '../styles/RecordStyles'

const ExerciseRecord = ({ exercise, lastExercise }) => {
  const [viewModal, setViewModal] = useState(false)

  return (
    <View>
    {lastExercise !== null ? ( lastExercise.primary_category === exercise.primary_category ? (
      <View>
      </View>
    ) : (
      <View>
        <Text style={recordStyles.categoryText}>{exercise.primary_category}</Text>
      </View>
    )) : (
      <View>
        <Text style={recordStyles.categoryText}>{exercise.primary_category}</Text>
      </View>
    )}
      <Pressable onPress={() => setViewModal(true)} style={recordStyles.exerciseRecordContainer}>
        <Text>{exercise.name}</Text>
      </Pressable>
      <Modal
        animationType='slide'
        visible={viewModal}
        onRequestClose={() => setViewModal(false)}>
          <View style={baseStyles.centeredView}>
            <View style={[baseStyles.modalView, recordStyles.exerciseModalView]}>
              <View style={baseStyles.modalButtonsContainer}>
                <Text style={baseStyles.headerText}>{exercise.name}</Text>
                <Pressable 
                  style={[accountStyles.buttonClose, accountStyles.button]}
                  onPress={() => setViewModal(false)}>
                  <Text style={accountStyles.buttonCloseText}>X</Text>
                </Pressable>
              </View>
              <View style={recordStyles.exerciseImageContainer}>
                <Text style={recordStyles.exerciseImageText}>Image goes here.</Text>
              </View>
              <Text>{exercise.machine}</Text>
            </View>
          </View>  
      </Modal>
    </View>
  )
}

export default ExerciseRecord