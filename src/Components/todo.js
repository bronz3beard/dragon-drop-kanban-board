import React, { PureComponent } from "react";

//Components
import TaskForm from "./task-form";

class ToDo extends PureComponent {
    render() {
        const { data, onDragOver, onDrop, handleTaskSubmit } = this.props;


        return (
            <div className="task-list-wrapper">
                <div className="todo-column" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="todo-task-header">ToDo</span>
                        {data}
                    <TaskForm status="ToDo" handleTaskSubmit={handleTaskSubmit} />
                </div>
            </div>
        );
    }
}

export default ToDo;