import React, { PureComponent } from "react";

//Components
import TaskForm from "./form-task";

class ToDo extends PureComponent {
    render() {
        const { data, defaultFormData, onDragOver, onDrop, handleTaskSubmit } = this.props;

        return (
            <div className="task-list-wrapper">
                <div className="todo-column" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="todo-task-header">ToDo</span>
                        {data}
                    <TaskForm status="ToDo" handleTaskSubmit={handleTaskSubmit} defaultFormData={defaultFormData} />
                </div>
            </div>
        );
    }
}

export default ToDo;