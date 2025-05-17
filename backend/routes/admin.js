const express = require("express");
const adminrouter = require('express').Router();
const jwt = require("jsonwebtoken");
const agentModel = require("../model/agent.js")
const adminModel = require("../model/admin.js")
const AgentList = require("../model/AgentList.js")
const bcrypt = require("bcryptjs");
const multer = require("multer");
const XLSX = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { distribute, parseXLS, parseCSV } = require("../utils/distribute.js");
const { loginSchema, addAgentSchema } = require("../validation.js");

// const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /csv|xlsx|xls/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (filetypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV, XLSX, and XLS files are allowed'));
    }
  },
});


adminrouter.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors });
    }
    const { email, password } = parsed.data;
    if (!email || !password) {
      console.log("Please fill all fields");
      throw new Error("Please fill all fields");
    }
    const user = await adminModel.findOne({ email });
    if (!user) {
      console.log("User not found, please register");
      throw new Error("User not found, please register");
    }

    const passMatch = await bcrypt.compare(password,user.password);
    if (!passMatch) {
      console.log("invalid password");
      throw new Error("Invalid Password");
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
        },
        token,
         message: "User  found, login successful",
         });
  } catch (error) {
    return res.status(500).json({ message: error.message }, "error in login");
  }
});

adminrouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name  || !email || !password) {
      console.log("Please fill all fields");
      throw new Error("Please fill all fields");
    }

    const user = await adminModel.findOne({ email });
    if (user) {
      console.log("user already exists");
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new adminModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ user: {
        _id : newUser._id,
        name : newUser.name,
        email : newUser.email,
        password : newUser.password,
    },
    token,
    message:"user registered successfully"
 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message }, "error in registering admin");
  }
});

adminrouter.post("/addAgents", async (req, res) => {
  try {
    const parsed = addAgentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors });
    }

    const { name, email, password, mobile } = parsed.data;

    if (!name || !email || !password || !mobile) {
        console.log("please fill all fields");
      // return res.status(400).json({message:"Please fill all fields"});
      throw new Error("Please fill all fields");
    }

    const existingAgent = await agentModel.findOne({ email, mobile });
    if (existingAgent) {
        console.log("Agent already exists");
      // return res.status(400).json({message:"Agent already exists"});
      throw new Error("Agent already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new agentModel({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    await agent.save();

    return res.status(200).json({
        agent:{
            _id:agent._id,
            name:agent.name,
            email:agent.email,
            mobile:agent.mobile,
        },
        message: "Agent added successfully",
    });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: error.message }, "error in adding agents");
  }
});

adminrouter.post("/upload", upload.single('file') ,async (req, res) => {
  try {
    console.log("hit upload")
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded.");

    let parsedData;
    if (file.mimetype === "text/csv") parsedData = await parseCSV(file.buffer);
    else parsedData = parseXLS(file.buffer);

    if (!Array.isArray(parsedData) || parsedData.length === 0)
      return res.status(400).send("Invalid or empty file.");

    for (const item of parsedData) {
      if (!item.FirstName || !item.Phone) {
        return res.status(400).send("Each row must have FirstName and Phone.");
      }
    }

    const existingAgents = await agentModel.find();
    if (!existingAgents.length)
      return res

    const distributed = distribute(parsedData,existingAgents.length);
    console.log(distributed)

    for (let i = 0; i < existingAgents.length; i++) {
      const updatedAgent = await agentModel.findByIdAndUpdate(
        existingAgents[i]._id,
        { $push: { tasks: { $each: distributed[i] } } },
        { new: true }
      );
      console.log(`updated agent ${existingAgents[i]._id},`,updatedAgent);
    }

    // const agents = distributed.map((tasks, index) => ({
    //   agentId: index + 1,
    //   tasks,
    // }));
    // await agentModel.insertMany(agents, { validateBeforeSave: false });

    // const agentLists = distributed.map((tasks, index) => ({
    //   agentId: index + 1,
    //   tasks,
    // }));
    // await AgentList.insertMany(agentLists);

    res.status(200).send("Upload and distribution successful.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

adminrouter.get("/getAgents", async (req, res) => {
  try {
    const agents = await agentModel.find();
    if (!agents) {
      console.log("No agents found");
      throw new Error("No agents found");
    }
    return res.status(200).json({ agents });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message }, "error in getting agents");
  }
});

adminrouter.get("/getAgentLists", async (req, res) => {
  try {
    const lists = await AgentList.find();
    if (!lists) throw new Error("No agent lists found");
    return res.status(200).json({ lists });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

adminrouter.delete("/deleteAgent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAgent = await agentModel.findByIdAndDelete(id);
    if (!deletedAgent) {
      return res.status(404).json({ message: "Agent not found." });
    }
    return res.status(200).json({ message: "Agent deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
});

adminrouter.delete("/deleteAgentList/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedList = await AgentList.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(404).json({ message: "Agent list not found." });
    }
    return res.status(200).json({ message: "Agent list deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = adminrouter;
