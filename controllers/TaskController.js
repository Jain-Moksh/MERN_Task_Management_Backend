import TaskModel from "../models/TaskModel.js";

// controller for creating tasks
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // creating obj of task model and sending title and description to it
    const newTask = new TaskModel({
      title,
      description,
    });
    // as it is async function we are explicity waiting for newTask to save in mongodb
    await newTask.save();
    res.status(200).json({
      status: true,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Failed to create task",
    });
  }
};

// controller to get all the task to be displayed
export const getAllTask = async (req, res) => {
  try {
    const taskData = await TaskModel.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      status: true,
      taskData,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

// controller to get a single task
export const showTask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const taskData = await TaskModel.findById(taskid).lean().exec();

    res.status(200).json({
      status: true,
      taskData,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

// controller to update existing task
export const updateTask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const { title, description, status } = req.body;

    const taskData = await TaskModel.findByIdAndUpdate(
      taskid,
      { title, description, status },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: "Failed to create task",
    });
  }
};

// controller to delete task
export const deleteTask = async (req, res) => {
  try {
    const { taskid } = req.params;

    await TaskModel.findByIdAndDelete(taskid);

    res.status(200).json({
      status: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};
