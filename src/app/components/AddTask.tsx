"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { addTodo } from "../api/route";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await addTodo({ id: uuidv4(), text: taskTitle });
    setTaskTitle("");
  };
  return (
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        className="border w-full px-4 py-2 rounded-lg focus:outline-none"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskTitle(e.target.value)
        }
      />
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
