import React, { PureComponent } from "react";

//Components
import TaskForm from "./task-form";

class Doing extends PureComponent {
    constructor(props) {
        super(props); // super passes the props into the React.Component
    }

    render() {
        const { data, onDragOver, onDrop, handleTaskSubmit } = this.props;
        return (
            <div className="task-list-wrapper">
                <div className="doing" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="doing-task-header">Doing</span>
                    {data}
                    <TaskForm status="Doing" handleTaskSubmit={handleTaskSubmit} />
                </div>
            </div>
        );
    }
}

export default Doing;