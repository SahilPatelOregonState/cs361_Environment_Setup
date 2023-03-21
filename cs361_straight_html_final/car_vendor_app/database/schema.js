const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const carSchema = new Schema({
  car_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const car_profile =  mongoose.model('car_profile', carSchema);

module.exports = car_profile