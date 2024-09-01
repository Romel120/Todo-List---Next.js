"use client"
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex , setEditIndex] = useState(null) ;

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editHandler = (i) => {
    let editTask = mainTask[i] ;
    setTitle(editTask.title) ;
    setDescription(editTask.description) ;
    setEditIndex(i) ;
  }

  const saveHandler = (i) => {
    let saveTask = [...mainTask] ;
    saveTask[i] = {title , description} ;
    setMainTask(saveTask) ;
    setTitle("") ;
    setDescription("") ;
    setEditIndex(null) ;
  }

  const formHandler = (e) => {
    e.preventDefault();
    if(editIndex !== null){
      saveHandler() ;
    }
    setMainTask([...mainTask, { title, description }]);
    setTitle("");
    setDescription("");
  };

  let renderTask = (
    <h3 className="text-center text-gray-500">No tasks added yet.</h3>
  );

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li
        key={i}
        className="mb-4 p-4 bg-white shadow-md rounded-md flex justify-between items-start overflow-hidden"
      >
        <div className="flex-1 pr-4 overflow-hidden">
          <p className="text-xl font-semibold text-gray-800 truncate">
            {t.title}
          </p>
          <p className="text-sm text-gray-600 break-words">
            {t.description}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => editHandler(i)}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => deleteHandler(i)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Todo App
        </h1>
        <form
          onSubmit={formHandler}
          className="bg-white p-6 shadow-lg rounded-lg mb-6"
        >
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
              >
              {editIndex !== null ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md overflow-hidden">
          <ul>{renderTask}</ul>
        </div>
      </div>
    </div>
  );
}
