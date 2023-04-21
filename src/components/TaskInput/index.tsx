import React from "react";
import "./TaskInput.css";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

interface TaskInputProps {
  submitBtnText: string;
  task?: Task;
  onSubmitForm(e: React.FormEvent): void;
}

const TaskInput = ({ task, submitBtnText, onSubmitForm }: TaskInputProps) => {
  const today = new Date().toISOString().substr(0, 10);
  const priorities = ["Low", "Normal", "High"];

  return (
    <form onSubmit={onSubmitForm} className="task-form">
      <input
        type="text"
        name="title"
        defaultValue={task?.title}
        required
        placeholder="Add new task..."
      />

      <div>
        <label className="desc-label" htmlFor="description">
          Description
        </label>
        <textarea
          title="description"
          name="description"
          rows={5}
          defaultValue={task?.description}
          className="task-desc"
        />
      </div>

      <div className="task-date-n-priority">
        <input
          type="date"
          name="dueDate"
          className="due-date"
          defaultValue={task?.dueDate ?? today}
          min={today}
        />
        <select
          className="priority"
          name="priority"
          defaultValue={task?.priority ?? priorities[0]}
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <button className="submit-btn btn" type="submit">
        {submitBtnText}
      </button>
    </form>
  );
};

export default TaskInput;
