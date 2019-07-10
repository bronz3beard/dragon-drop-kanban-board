import React, { PureComponent } from "react";

//Components
import TaskForm from "./form-task";

class Complete extends PureComponent {
    render() {
        const { data, onDragOver, onDrop, handleTaskSubmit } = this.props;

        return (
            <div className="task-list-wrapper">
                <div className="grid-task" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="task-header">
                        <TaskForm status="Complete" handleTaskSubmit={handleTaskSubmit} />
                        Complete
                    </span>
                    {data}
                </div>
            </div>
        );
    }
}

export default Complete;