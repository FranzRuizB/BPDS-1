"use client";

import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;

    setTasks([
      ...tasks,
      {
        text: newTask.trim(),
        completed: false,
      },
    ]);

    setNewTask("");
  };

  const saveEdit = (index: number) => {
    if (editingText.trim() === "") {
      setEditingIndex(null);
      return;
    }

    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      text: editingText.trim(),
    };

    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };

    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter(
      (_, taskIndex) => taskIndex !== index
    );

    setTasks(updatedTasks);
  };

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl">

        
        <section className="rounded-2xl border-2 border-slate-700 bg-slate-900 p-6 shadow-sm sm:p-10">

          
          <div className="mb-8 border-b border-slate-700 pb-6">
            <h1 className="font-serif text-3xl font-bold tracking-wide sm:text-4xl">
              MI LISTA DE TAREAS
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Organiza, administra y realiza seguimiento a tus tareas
            </p>
          </div>

          
          <div className="mb-6">
            <input
              type="text"
              placeholder="+ Escribe una nueva tarea..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
              className="w-full rounded-lg border-2 border-dashed border-slate-600 bg-slate-800 px-5 py-4 text-lg text-white transition focus:border-teal-500 focus:bg-slate-800 focus:outline-none"
            />

            <p className="mt-2 text-sm text-slate-400">
              Presiona Enter para agregar una tarea
            </p>
          </div>

          
          <div className="space-y-3">

            {tasks.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-700 py-10 text-center text-slate-400">
                Aún no tienes tareas.
              </div>
            )}

            {tasks.map((task, index) => (
              <div
                key={index}
                className={`group flex items-center justify-between rounded-lg border-2 border-dashed p-4 transition duration-200 sm:p-5 ${
                  task.completed
                    ? "border-teal-300 bg-teal-50"
                    : "border-slate-700 bg-slate-800 hover:border-teal-400 hover:bg-slate-700"
                }`}
              >

                
                <div className="flex min-w-0 flex-1 items-center gap-4">

                  
                  <button
                    onClick={() => toggleTask(index)}
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-lg transition ${
                      task.completed
                        ? "border-teal-500 bg-teal-500 text-white"
                        : "border-slate-500 bg-slate-800 text-transparent hover:border-teal-500"
                    }`}
                    aria-label="Completar tarea"
                  >
                    ✓
                  </button>

                  
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) =>
                        setEditingText(e.target.value)
                      }
                      onBlur={() => saveEdit(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEdit(index);
                        }
                      }}
                      autoFocus
                      className="w-full rounded-md border-2 border-teal-500 bg-slate-800 px-4 py-2 text-lg text-white outline-none"
                    />
                  ) : (
                    <div className="min-w-0 flex-1">
                      <p
                        onDoubleClick={() => {
                          setEditingIndex(index);
                          setEditingText(task.text);
                        }}
                        className={`cursor-pointer truncate text-lg transition ${
                          task.completed
                            ? "text-slate-500 line-through"
                            : "text-slate-100"
                        }`}
                      >
                        {task.text}
                      </p>

                       <p className="mt-1 hidden text-xs text-teal-600 group-hover:block">
                           Doble clic para editar
                        </p>

                    </div>
                  )}

                </div>
                
                <button
                  onClick={() => deleteTask(index)}
                  className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Eliminar tarea"
                  title="Eliminar tarea"
                >
                  🗑
                </button>

              </div>
            ))}

          </div>

         
          {tasks.length > 0 && (
            <div className="mt-8 border-t border-slate-700 pt-5 text-sm text-slate-400">
              Total de tareas:{" "}
              <span className="font-semibold text-slate-200">
                {tasks.length}
              </span>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}