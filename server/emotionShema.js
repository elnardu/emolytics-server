var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Emotion', new Schema({
  scores: Object,
  faceRectangle: Object,
  id: String
  // faceId: String
}, { timestamps: { createdAt: 'created_at' } }));
