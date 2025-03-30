import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "Pending",
      enum: ["Pending", "InProcess", "Completed"],
    },
  },
  { timestamps: true }
);

// model name, model schema, collection name
const TaskModel = new mongoose.model("Task", TaskSchema, "tasks");

export default TaskModel;
