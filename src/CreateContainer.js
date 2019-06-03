import React, { PureComponent } from "react";

//Components
import ToDo from "./Components/todo";
import Doing from "./Components/doing";
import Complete from "./Components/complete";

class CreateContainer extends PureComponent {
    constructor(props) {
        super(props); // super passes the props into the React.Component
        this.state = {
            data: [{
                Id: 0,
                Owner: "Bob",
                Task: "Get Food",
                Icon: "",
                Items: null,
                IsContainer: true,
                Collapse: true,
                Status: "Doing",
                NewStatus: null,
            }, {
                Id: 2,
                Owner: "Jhon Doe",
                Task: "Find a Friend",
                Icon: "",
                Items: null,
                IsContainer: false,
                Collapse: true,
                Status: "ToDo",
                NewStatus: null,
            }, {
                Id: 3,
                Owner: "Billy",
                Task: "Buy Pet Food",
                Icon: "",
                Items: null,
                IsContainer: true,
                Collapse: true,
                Status: "ToDo",
                NewStatus: null,
            }],
        };
    }

    handleTaskSubmit = (task) => {
        const tasks = this.state.data;
        task.Id = tasks.length + 1;

        const newTasks = tasks.concat([task]);
        this.setState({
            data: newTasks
        });

        const data = new FormData();
        data.append('Owner', task.Owner);
        data.append('Task', task.Task);
        data.append('Status', task.Status);

        const xmlhr = new XMLHttpRequest();
        xmlhr.open("POST", this.props.submitUrl, true);
        xmlhr.onload = () => this.loadTasksFromServer();
        xmlhr.send(data);
    }
    handleNewCardSubmit = (addStatus) => {
        const tasks = this.state.data;
        addStatus.Id = tasks.length + 1;

        const newStatus = tasks.concat([addStatus]);
        this.setState({
            data: newStatus,
        });

        const data = new FormData();
        data.append('Status', addStatus.Status);

        const xmlhr = new XMLHttpRequest();
        xmlhr.open("POST", this.props.submitUrl, true);
        xmlhr.onload = () => this.loadTasksFromServer();
        xmlhr.send(data);
    }
    handleDragStart = (event, Id) => {
        console.log("dragstart: ", Id);
        event.dataTransfer.setData("Id", Id)
    }
    handleDragOver = (event) => {
        event.preventDefault();
    }
    handleDrop = (event, status) => {
        let Id = event.dataTransfer.getData("Id");

        let Status = this.state.data.filter((task) => {
            if (task.Id == Id) {
                task.Status = status;
            }
            console.log(task.Status, " ", task.Owner);
            return task;
        });

        this.setState({
            ...this.state.data,
            Status
        });
        console.log(Status);
    }
    render() {

        var status = {
            ToDo: [],
            Doing: [],
            Complete: [],
        };
        { console.log(status, " ") }

        this.state.data.map((type) => {
            status[type.Status].push(
                <div
                    key={type.Id}
                    draggable
                    onDragStart={(event) => this.handleDragStart(event, type.Id)}
                    className="draggable"
                >
                    <div>
                        <span>{type.Owner} - </span>
                        {type.Task}
                    </div>
                </div>
            );
        })

        return (
            <div className="container">
                <ToDo
                    data={status.ToDo}
                    onDragOver={(event) => this.handleDragOver(event)}
                    onDrop={(event) => this.handleDrop(event, "ToDo")}
                    handleTaskSubmit={this.handleTaskSubmit} />
                <Doing
                    data={status.Doing}
                    onDragOver={(event) => this.handleDragOver(event)}
                    onDrop={(event) => this.handleDrop(event, "Doing")}
                    handleTaskSubmit={this.handleTaskSubmit} />
                <Complete
                    data={status.Complete}
                    onDragOver={(event) => this.handleDragOver(event)}
                    onDrop={(event) => this.handleDrop(event, "Complete")}
                    handleTaskSubmit={this.handleTaskSubmit} />
            </div>
        )
    }
}

export default CreateContainer;