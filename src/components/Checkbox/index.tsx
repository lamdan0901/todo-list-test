import React from "react";
import "./Checkbox.css";

interface CheckboxProps {
  id: string;
  title: string;
  onChooseTask(checked: boolean, taskId: string): void;
}

const Checkbox = ({ id, title, onChooseTask }: CheckboxProps) => {
  return (
    <div className="checkbox">
      <input
        id={id}
        type="checkbox"
        onChange={(e) => onChooseTask(e.target.checked, id)}
      />
      <span className="check"></span>
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

export default Checkbox;
