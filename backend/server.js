const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_URL")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    text: String
  })
);

app.post("/add", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.send(newTask);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
