import Checkbox from "@/components/Checkbox";
import TaskInput, { Task } from "@/components/TaskInput";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import TaskBulk from "../../components/TaskBulk";
import "./Home.css";

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") ?? "[]")
  );
  const [chosenTasks, setChosenTasks] = useState<Task["id"][]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText);

  useEffect(() => {
    if (!debouncedSearch) {
      setTasks(JSON.parse(localStorage.getItem("tasks") ?? "[]"));
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.filter(({ title }) => title.includes(debouncedSearch))
    );
  }, [debouncedSearch]);

  const handleChooseTask = (checked: boolean, taskId: string) => {
    if (checked) {
      setChosenTasks((prevTasks) => [...prevTasks, taskId]);
    } else {
      setChosenTasks((prevTasks) => prevTasks.filter((id) => id !== taskId));
    }
  };

  const handleSelectTask = (task: Task, e: React.MouseEvent) => {
    if (task.id === selectedTask?.id) {
      setSelectedTask(null);
      return;
    }
    setSelectedTask(task);
  };

  const handleRemoveTasks = (taskIds: string[]) => {
    const filteredTasks = tasks.filter(({ id }) => !taskIds.includes(id));
    setTasks(filteredTasks);
    setChosenTasks([]);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const updatedTask = {
      id: selectedTask?.id ?? new Date().getTime().toString(),
      title: formData.get("title")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      dueDate: formData.get("dueDate")?.toString() ?? "",
      priority: formData.get("priority")?.toString() ?? "",
    };

    const updatedTasks = selectedTask?.id
      ? tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      : [...tasks, updatedTask];

    updatedTasks.sort(
      (t1, t2) =>
        new Date(t1.dueDate).getTime() - new Date(t2.dueDate).getTime()
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setSelectedTask(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container">
      <div className="new-task-container">
        <h1 className="header-title">New Task</h1>
        <TaskInput onSubmitForm={handleSubmitForm} submitBtnText="Add" />
      </div>

      <div className="todo-container">
        <h1 className="header-title">Todo List</h1>
        <input
          type="search"
          name="search"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
        />

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id}>
              <div className="task-item">
                <Checkbox
                  onChooseTask={handleChooseTask}
                  id={task.id}
                  title={task.title}
                />

                <div className="action-btn">
                  <button
                    onClick={(e) => handleSelectTask(task, e)}
                    className="detail-btn btn"
                    type="button"
                  >
                    {selectedTask?.id !== task.id ? "Detail" : "Cancel"}
                  </button>
                  <button
                    onClick={() => handleRemoveTasks([task.id])}
                    className="remove-btn btn"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {selectedTask?.id === task.id && (
                <div className="task-detail">
                  <TaskInput
                    submitBtnText="Update"
                    task={selectedTask}
                    onSubmitForm={handleSubmitForm}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {chosenTasks.length > 0 && (
          <TaskBulk onRemoveTasks={() => handleRemoveTasks(chosenTasks)} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
