import React, { PureComponent } from "react";

//Components
import TaskForm from "./form-task";

class Complete extends PureComponent {
  render() {
    const { data, onDragOver, onDrop, getAirTableTasks } = this.props;

    return (
      <div className="grid-task" onDrop={onDrop} onDragOver={onDragOver}>
        <span className="task-header">
          <TaskForm status="Complete" getAirTableTasks={getAirTableTasks} />
          Complete
        </span>
        {data}
      </div>
    );
  }
}

export default Complete;
