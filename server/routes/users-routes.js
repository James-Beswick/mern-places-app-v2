const express = require('express');
const { check } = require('express-validator');

const {
  getListOfUsers,
  signup,
  login,
} = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', getListOfUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(), //normalise: Test@test.com => test@test.com
    check('password').isLength({ min: 7 }),
  ],
  signup
);

router.post('/login', login);

module.exports = router;
