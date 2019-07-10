import React, { PureComponent } from "react";

//Components
import TaskForm from "./form-task";

class Doing extends PureComponent {
    render() {
        const { data, onDragOver, onDrop, handleTaskSubmit } = this.props;

        return (
            <div className="task-list-wrapper">
                <div className="grid-task" onDrop={onDrop} onDragOver={onDragOver}>
                    <span className="task-header">                    
                        <TaskForm status="Doing" handleTaskSubmit={handleTaskSubmit} />
                        Doing
                    </span>
                    {data}
                </div>
            </div>
        );
    }
}

export default Doing;