const express = require('express');
const router = express.Router();

const schemeController = require('../controllers/schemeController');
const applicationController = require('../controllers/applicationController');
const userController = require('../controllers/userController');

// User Routes
router.get('/users/:id', userController.getUserProfile);

// Scheme Routes
router.get('/schemes/eligible/:userId', schemeController.getEligibleSchemesForUser);
router.get('/schemes/:id', schemeController.getSchemeById);

// Application Routes
router.post('/applications', applicationController.createApplication);
router.get('/applications/user/:userId', applicationController.getUserApplications);

module.exports = router;