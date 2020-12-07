const express = require('express');
const router = express.Router();
const Campground = require('../model/campground');
const { campgroundSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { index, newCamp, addNewCamp, showCamp, editCamp, editCampForm, deleteCamp } = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.get('/', catchAsync(index));

router.get('/new', isLoggedIn, newCamp);

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(addNewCamp));

router.get('/:id', catchAsync(showCamp));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(editCampForm));

router.patch('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(editCamp));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(deleteCamp));

module.exports = router;