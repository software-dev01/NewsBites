import Agent from "../models/Agent.js";


// CREATE AGENT
export const createAgent = async (req, res) => {
  try {
    const agent = await Agent.create(req.body);

    res.status(201).json(agent);

  } catch (error) {
    res.status(500).json({
      message: "Agent creation failed",
      error: error.message
    });
  }
};


// GET ALL AGENTS
export const getAgents = async (req, res) => {
  try {

    const agents = await Agent.find();

    res.json(agents);

  } catch (error) {
    res.status(500).json({
      message: "Fetching agents failed"
    });
  }
};


// UPDATE AGENT
export const updateAgent = async (req, res) => {
  try {

    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        // runValidators: true
      }
    );

    res.json(agent);

  } catch (error) {
    res.status(500).json({
      message: "Update failed"
    });
  }
};


// DELETE AGENT
export const deleteAgent = async (req, res) => {
  try {

    await Agent.findByIdAndDelete(req.params.id);

    res.json({
      message: "Agent deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Delete failed"
    });
  }
};