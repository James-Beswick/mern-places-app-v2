const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true }, // speeds up process, requires unique-validator
  password: { type: String, require: true, minlength: 6 },
  image: { type: String, require: true }, //references url
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
