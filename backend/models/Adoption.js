const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  adopterName: { type: String, required: true },
  contact: { type: String, required: true },
  reason: { type: String },
  dogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }
}, { timestamps: true });

module.exports = mongoose.model('Adoption', adoptionSchema);
