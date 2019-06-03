import React, { PureComponent } from "react";

//Components
import TaskForm from "./task-form";

class ToDo extends PureComponent {
    constructor(props) {
        super(props); // super passes the props into the React.Component
    }
    render() {
        const { data, onDragOver, onDrop, handleTaskSubmit } = this.props;
        return (
            <div className="task-list-wrapper">
                <div className="todo" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="todo-task-header">ToDo</span>
                    {data}
                    <TaskForm status="ToDo" handleTaskSubmit={handleTaskSubmit} />
                </div>
            </div>
        );
    }
}

export default ToDo;