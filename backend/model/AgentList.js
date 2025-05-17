const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  Phone: { type: Number, required: true },
  Notes: { type: String }
});

const AgentListSchema = new mongoose.Schema({
  agentId: { type: Number, required: true },
  tasks: { type: [TaskSchema], default: [] }
});

module.exports = mongoose.model("AgentList", AgentListSchema);