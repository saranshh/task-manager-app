import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Plus,
  Loader2,
  CheckCircle2,
  Circle,
  Trash2,
  ListTodo,
} from "lucide-react";
import { RootState } from "../../store";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../store/slices/tasksSlice";
import { Task } from "../../types";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector(
    (state: RootState) => state.tasks
  );
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(createTask({ title: newTask.trim(), description }));
      setNewTask("");
      setDescription("");
    }
  };

  const handleToggleStatus = (task: Task) => {
    dispatch(
      updateTask({
        ...task,
        status: task.status === "completed" ? "pending" : "completed",
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gray-100 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <ListTodo className="w-8 h-8 text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-700">My Tasks</h1>
        </div>
        <form
          onSubmit={handleCreateTask}
          className="space-y-4 bg-white rounded-lg p-6"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-md font-semibold text-gray-700 mb-2"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="block w-full rounded-lg border-gray-300 outline-none p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="What needs to be done?"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-md font-semibold text-gray-700 mb-2"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full rounded-lg border-gray-300 p-1 outline-none shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Add more details about your task..."
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-600 outline-none focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </button>
        </form>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-5">
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <button
                      onClick={() => handleToggleStatus(task)}
                      className="flex-shrink-0 group"
                    >
                      {task.status === "completed" ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 group-hover:text-green-600 transition-colors duration-150" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 group-hover:text-gray-500 transition-colors duration-150" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-base font-medium text-gray-900 ${
                          task.status === "completed"
                            ? "line-through text-gray-500"
                            : ""
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="ml-4 flex-shrink-0 p-1 rounded-full hover:bg-red-100 group transition-colors duration-150"
                  >
                    <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="px-4 py-12 text-center text-gray-500">
                <ListTodo className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">No tasks yet</p>
                <p className="text-sm">
                  Add your first task above to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
