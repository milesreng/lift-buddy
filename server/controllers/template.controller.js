const Template = require('../models/template.model')
const { WorkoutDetail } = require('../models/detail.model')

const templateController = {
  get_template: async (req, res) => {
    try {
      const template_id = req.params.wid
      const template = await Template.findById(template_id)
  
      return res.status(200).json(template)
  
    } catch (e) {
      return res.status(404).json({ message: 'template not found' })
    }
  },
  create_template: async (req, res) => {
    try {
      const uid = req.params.uid
      const template = req.body
  
      const newTemplate = new Template({
        user_id: uid,
        name: template.name
      })
      
      await newTemplate.save()
  
      return res.status(200).json({ message: 'template successfully created' })
  
    } catch (e) {
      return res.status(404).json({ message: 'template could not be created' })
    } 
  },
  add_template_detail: async (req, res) => {
    try {
      const template_id = req.params.template_id
      const exercise_id = req.params.exercise_id

      const newDetail = new WorkoutDetail({
        exercise_id: ObjectId(exercise_id),
        sets: [{
          reps: null,
          weight: null
        }]
      })

      const template = await Template.findById(ObjectId(template_id))
      template.exercises.push(newDetail)

      await template.save()

      return res.status(200).json(template)

    } catch (e) {
      return res.status(400).json({ message: 'detail could not be added' })
    }
  }
}

module.exports = templateController