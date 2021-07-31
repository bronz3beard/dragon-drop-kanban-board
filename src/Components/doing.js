import React, { PureComponent } from "react";

//Components
import TaskForm from "./form-task";

class Doing extends PureComponent {
  render() {
    const { data, onDragOver, onDrop, getAirTableTasks } = this.props;

    return (
      <div className="grid-task" onDrop={onDrop} onDragOver={onDragOver}>
        <span className="task-header">
          <TaskForm status="Doing" getAirTableTasks={getAirTableTasks} />
          Doing
        </span>
        {data}
      </div>
    );
  }
}

export default Doing;
