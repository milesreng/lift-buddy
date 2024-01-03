const Template = require('../models/template.model')
const { WorkoutDetail } = require('../models/detail.model')

const templateController = {
  get_template: async (req, res) => {
    try {
      const template_id = req.params.template_id
      const template = await Template.findById(ObjectId(template_id))
  
      return res.status(200).json(template)
  
    } catch (e) {
      return res.status(404).json({ message: 'template not found' })
    }
  },
  get_user_templates: async (req, res) => {
    try {
      const user_id = req.params.user_id
      const template = await Template.find({ user_id: ObjectId(user_id) })
  
      return res.status(200).json(template)
  
    } catch (e) {
      return res.status(404).json({ message: 'template not found' })
    }
  },
  create_template: async (req, res) => {
    try {
      const template = req.body
      const user_id = template.user_id
  
      const newTemplate = new Template({
        user_id: user_id,
        name: template.name,
        exercises: []
      })
      
      await newTemplate.save()
  
      return res.status(200).json({ message: 'template successfully created' })
  
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'template could not be created' })
    } 
  },
  update_template: async (req, res) => {
    try {
      const template_id = req.params.template_id
      const details = req.body

      const template = await Template.findById(ObjectId(template_id))

      // this works, but only if we ensure that details contains all info in template.details
      template.details = details

      await template.save()

      return res.status(200).json({ message: 'template successfully updated'})

    } catch (e) {
      return res.status(400).json({ message: 'template could not be updated' })
    }
  },
  add_template_detail: async (req, res) => {
    try {
      const template_id = req.params.template_id
      const exercise_id = req.params.exercise_id

      const newDetail = new WorkoutDetail({
        exercise_id: exercise_id,
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
  },
  delete_template: async (req, res) => {
    try {
      const template_id = req.params.template_id

      await Template.findByIdAndDelete(ObjectId(template_id))

      return res.status(200).json({ message: 'template successfully deleted' })
    } catch (e) {
      return res.status(400).json({ message: 'template could not be deleted' })
    }
  }
}

module.exports = templateController