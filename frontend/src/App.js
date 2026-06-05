import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!text) return;

    axios
      .post("http://localhost:5000/add", { text })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setText("");
      });
  };

  return (
    <div>
      <h1>MERN ToDo App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
