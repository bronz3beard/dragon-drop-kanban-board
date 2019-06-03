import React, { PureComponent } from "react";

//Components
import TaskForm from "./task-form";

class Complete extends PureComponent {
    constructor(props) {
        super(props); // super passes the props into the React.Component
    }

    render() {
        const { data, onDragOver, onDrop, handleTaskSubmit } = this.props;
        return (
            <div className="task-list-wrapper">
                <div className="complete" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="complete-task-header">Complete</span>
                    {data}
                    <TaskForm status="Complete" handleTaskSubmit={handleTaskSubmit} />
                </div>
            </div>
        );
    }
}

export default Complete;