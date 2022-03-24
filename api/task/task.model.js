const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
})

module.exports = mongoose.model('Task', TaskSchema);
