"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Task } from "../types";
import { deleteTodo, editTodo } from "../api/route";

type TodoProps = {
  todo: Task;
};

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTitle);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <li className="flex justify-between border-l-4 p-4 bg-white border-blue-500 rounded shadow-md">
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="border px-2 py-1 rounded"
          value={editedTaskTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {isEditing ? (
          <button className="text-blue-500 mr-2" onClick={handleSave}>
            save
          </button>
        ) : (
          <button className="text-green-500 mr-2" onClick={handleEdit}>
            edit
          </button>
        )}
        <button className="text-red-500" onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
