import mongoose from 'mongoose';
import Compare from './compare';

let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  text: String,
  compare: {
    type: Schema.Types.ObjectId,
    ref: 'compare',
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
