const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const templateController = require('../../controllers/template.controller')

// @route   GET api/templates
// @desc    Get template
// @access  Public
router.get('/', checkAuth, templateController.get_template)

// @route   POST api/templates
// @desc    Create new template
// @access  Public
router.post('/create', checkAuth, templateController.create_template)

module.exports = router