import React, { PureComponent } from "react";

class TaskForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            owner: "",
            task: "",
            addTask: false,
        };
    }
    handleOwnerChange = (event) => {
        this.setState({
            owner: event.target.value
        });
    }
    handleTaskChange = (event) => {
        this.setState({
            task: event.target.value
        });
    }
    handleStatustChange = (event) => {
        this.setState({
            status: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const owner = this.state.owner.trim();
        const task = this.state.task.trim();
        const status = this.props.status;
        console.log(status);
        if (!task || !owner || !status) {
            return alert("Please add a task and the owner");;
        }
        this.props.handleTaskSubmit({
            Owner: owner,
            Task: task,
            Status: status,
        });
        this.setState({
            owner: '',
            task: '',
            status: '',
            addTask: false,
        });
    }
    handleAddTask = () => {
        const { addTask } = this.state;

        this.setState({
            addTask: !addTask,
        });
        console.log(addTask)
    }
    render() {
        const { owner, task, addTask } = this.state;

        const taskForm = addTask ?
            <form className="taskForm" onSubmit={this.handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Task Owner..."
                        value={owner}
                        onChange={this.handleOwnerChange} />
                </div>
                <textarea
                    className="task-textarea"
                    type="input"
                    placeholder="Add Task..."
                    value={task}
                    onChange={this.handleTaskChange}
                />
                <input className="button-submit" type="submit" value="Post" />
            </form> : null

        return (
            <React.Fragment>
                <button className="add-task" onClick={this.handleAddTask}>Add Task</button>
                {taskForm}
            </React.Fragment>
        );
    }
}

export default TaskForm;