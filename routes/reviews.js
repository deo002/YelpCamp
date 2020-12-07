const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isAuthorReview, validateReview } = require('../middleware');
const { addReview, deleteReview } = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(addReview));

router.delete('/:review_id', isLoggedIn, isAuthorReview, catchAsync(deleteReview));

module.exports = router;