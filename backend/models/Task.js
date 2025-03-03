const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' }
});

module.exports = mongoose.model('Task', TaskSchema);