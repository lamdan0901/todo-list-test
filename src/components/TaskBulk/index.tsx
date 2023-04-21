import React from "react";
import "./TaskBulk.css";

interface TaskBulkProps {
  onRemoveTasks(): void;
}

const TaskBulk = ({ onRemoveTasks }: TaskBulkProps) => {
  return (
    <div className="bulk-action">
      <div className="bulk-action-wrapper">
        <div className="title">Bulk Action: </div>
        <div>
          <button className="done-btn btn" type="button">
            Done
          </button>
          <button
            onClick={onRemoveTasks}
            className="remove-btn btn"
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskBulk;
