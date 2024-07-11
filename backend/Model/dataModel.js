const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  // Define your schema fields based on jsondata.json structure
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: [String],
  region: String,
  city: String,
  // Add other fields as per your JSON structure
});

module.exports = mongoose.model('Data', dataSchema);
