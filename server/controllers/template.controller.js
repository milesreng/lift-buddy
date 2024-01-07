const { ObjectId } = require('mongodb')
const Template = require('../models/template.model')
const { WorkoutDetail } = require('../models/detail.model')

const templateController = {
  get_template: async (req, res) => {
    try {
      const template_id = req.body.template_id
      const template = await Template.findById(new ObjectId(template_id))
  
      return res.status(200).json(template)
  
    } catch (e) {
      console.log(e)
      return res.status(404).json({ message: 'template not found' })
    }
  },
  get_user_templates: async (req, res) => {
    try {
      const user_id = req.body.user_id
      const template = await Template.find({ user_id: new ObjectId(user_id)})
  
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
        user_id: new ObjectId(user_id),
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
      const template_id = req.body.template_id
      const exercise_id = req.body.exercise_id

      // ideally the default reps/weight will be set to the last value as a placeholder

      const newDetail = new WorkoutDetail({
        exercise_id: new ObjectId(exercise_id),
        sets: []
      })

      const template = await Template.findById(new ObjectId(template_id))

      console.log(template)
      template.exercises.push(newDetail)

      await newDetail.save()
      await template.save()

      return res.status(200).json(template)

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'detail could not be added' })
    }
  }, 
  add_exercise_set: async (req, res) => {
    try {
      const set_details = req.body
      const detail_id = set_details.detail_id
      const reps = set_details.reps
      const weight = set_details.weight
      
      // find detail record
      const detail = await WorkoutDetail.findById(new ObjectId(detail_id))
      console.log(detail);

      // add set to detail (we should also have ordering so that they can be manually reordered)
      const newSet = {
        reps, weight
      }

      console.log(newSet);
      detail.sets.push(newSet)
      await detail.save()

      return res.status(200).json({ message: 'set successfully saved', detail})

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'set could not be added' })
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