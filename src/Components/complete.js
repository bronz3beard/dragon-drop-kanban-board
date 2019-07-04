import React, { PureComponent } from "react";

//Components
import TaskForm from "./task-form";

class Complete extends PureComponent {
    render() {
        const { data, onDragOver, onDrop, handleTaskSubmit } = this.props;
        console.log("TCL: Complete -> render -> data", data)
        return (
            <div className="task-list-wrapper">
                <div className="complete-column" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="complete-task-header">Complete</span>
                    {data}
                    <TaskForm status="Complete" handleTaskSubmit={handleTaskSubmit} />
                </div>
            </div>
        );
    }
}

export default Complete;