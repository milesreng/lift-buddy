const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const templateController = require('../../controllers/template.controller')

// @route   GET api/templates
// @desc    Get template
// @access  Public
router.get('/', checkAuth, templateController.get_template)

// @route   GET api/templates/all
// @desc    Get all user templates
// @access  Public
router.get('/all', checkAuth, templateController.get_user_templates)

// @route   POST api/templates/create
// @desc    Create new template
// @access  Public
router.post('/create', checkAuth, templateController.create_template)

// @route   POST api/templates/update
// @desc    Update template information
// @access  Public
router.post('/update', checkAuth, templateController.update_template)

// @route   POST api/templates/add/detail
// @desc    Add detail to template
// @access  Public
router.post('/add/detail', checkAuth, templateController.add_template_detail)

// @route   POST api/templates/add/set
// @desc    Add set to detail in template
// @access  Public
router.post('/add/set', checkAuth, templateController.add_exercise_set)

// @route   DELETE api/templates/delete
// @desc    Delete template
// @access  Public
router.post('/delete', checkAuth, templateController.delete_template)

module.exports = router