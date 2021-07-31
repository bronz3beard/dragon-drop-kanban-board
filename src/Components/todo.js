import React, { PureComponent } from "react";

//Components
import TaskForm from "./form-task";

class ToDo extends PureComponent {
  render() {
    const { data, defaultFormData, onDragOver, onDrop, handleTaskSubmit } =
      this.props;

    return (
      <div className="grid-task" onDrop={onDrop} onDragOver={onDragOver}>
        <span className="task-header">
          <TaskForm
            status="ToDo"
            handleTaskSubmit={handleTaskSubmit}
            defaultFormData={defaultFormData}
          />
          ToDo
        </span>
        {data}
      </div>
    );
  }
}

export default ToDo;
