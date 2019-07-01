import React, { PureComponent } from "react";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE = process.env.REACT_APP_TABLE;

class TaskForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                taskOwner: {
                    value: "",
                    placeholder: "Task Owner...",
                },
                task: {
                    value: "",
                    placeholder: "Add Task...",
                },
                status: {
                    value: this.props.status,
                },
            },
            addTask: false,
        };
    }
    postToAirTable = () => {
        const { formControls } = this.state;
        //const base = new Airtable({ apiKey: REACT_APP_API_KEY }).base('appuhJdBl6QlAoRLl');
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;
        const fields = {
            "fields": {
                "Task Owner": formControls.taskOwner.value,
                "Task": formControls.task.value,
                "Status": formControls.status.value,
            }
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        }).then(() => {
            //alert("Form Sent!");
            window.location.reload();
        }).catch(error => alert(error));
    }
    handleSubmit = (event) => {  		
        event.preventDefault();
        const { formControls } = this.state;
        const owner = formControls.taskOwner.value.trim();
        const task = formControls.task.value.trim();

        if (!task || !owner) {
            return alert("Please add a task along with an owner");;
        }
        this.setState({
            addTask: false,
        });
        this.postToAirTable();        
    }
    changeHandler = (event) => {
        const { formControls } = this.state;
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...formControls,
                [name]: {
                    ...formControls[name],
                    value
                }
            }
        });
    }
    handleAddTask = () => {
        const { addTask } = this.state;

        this.setState({
            addTask: !addTask,
        });
    }
    render() {
        const { formControls, addTask } = this.state;

        const taskForm = addTask ?
            <form className="taskForm" onSubmit={this.handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="taskOwner"
                        placeholder={formControls.taskOwner.placeholder}
                        value={formControls.taskOwner.value}
                        onChange={this.changeHandler} />
                </div>
                <textarea
                    className="task-textarea"
                    type="input"
                    name="task"
                    placeholder={formControls.task.placeholder}
                    value={formControls.task.value}
                    onChange={this.changeHandler}
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