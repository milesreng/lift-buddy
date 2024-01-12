const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const templateController = require('../../controllers/template.controller')

// @route   GET api/templates
// @desc    Get all user templates
// @status  Testing
router.get('/', checkAuth, templateController.get_user_templates)

// @route   GET api/templates/:id
// @desc    Get template
// @status  Testing
router.get('/:id', checkAuth, templateController.get_template)

// @route   POST api/templates
// @desc    Create new template
// @status  Testing
router.post('/', checkAuth, templateController.create_template)

// @route   PUT api/templates/update/:id
// @desc    Update template information
// @status  Testing
router.put('/update/:id', checkAuth, templateController.update_template)

// @route   PUT api/templates/detail
// @desc    Add detail to template
// @status  Testing
router.put('/detail/:id', checkAuth, templateController.add_template_detail)

// @route   PUT api/templates/set
// @desc    Add set to exercise in template
// @status  Testing
router.put('/set/:id', checkAuth, templateController.add_exercise_set)

// @route   DELETE api/templates/:id
// @desc    Delete template
// @status  Testing
router.delete('/:id', checkAuth, templateController.delete_template)

module.exports = router