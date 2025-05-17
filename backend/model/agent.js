// const mongoose = require("mongoose");

// const TaskSchema = new mongoose.Schema({
//   FirstName: String,
//   Phone: String,
//   Notes: String,
// });

// const AgentListSchema = new mongoose.Schema({
//   agentId: Number,
//   tasks: [TaskSchema],
// });

// module.exports = mongoose.model("AgentList", AgentListSchema);

const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  mobile: { type: String },
  tasks: { type: Array, default: [] },
  agentId: { type: Number },
});
const agentModel = mongoose.model("Agent", agentSchema);
module.exports = agentModel;
