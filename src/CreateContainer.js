import React, { PureComponent, Fragment } from "react";
import Airtable from "airtable";

//Components
import NavBar from "./Components/nav";
import ToDo from "./Components/todo";
import Doing from "./Components/doing";
import Complete from "./Components/complete";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE = process.env.REACT_APP_TABLE;

class CreateContainer extends PureComponent {
    state = {
        data: [],
    };
    componentDidMount() {
        this.getAirTableTasks();
    }
    getAirTableTasks = () => {
        const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE);
        base(AIRTABLE_TABLE).select({
            view: 'Grid view'
        }).firstPage((err, records) => {
            if (err) { console.error(err); return; }
            this.setState({
                data: records,
            })
        });
    }
    updateAirTable = (id, status) => {
        const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE);
        base(AIRTABLE_TABLE).update(id, {
            "Status": status,
          }, function(err) {
            if (err) {
              alert(err);
              return;
            }
        });
    }
    handleDragStart = (event, id) => {
        console.log("dragstart: ", id);
        event.dataTransfer.setData("id", id)        
    }
    handleDragOver = (event) => {
        event.preventDefault();
    }
    handleDrop = (event, status) => {
        let id = event.dataTransfer.getData("id");
        //const idNumber = Number(id);
        let updateStatus = this.state.data.filter((task) => {
            if (task.id === id) {
                task.fields.Status = status;
            }
            console.log(task.fields.Status, " ", task.fields["Task Owner"]);
            return task;
        });

        this.setState({
            ...this.state.data,
            updateStatus
        });
        this.updateAirTable(id, status);
    }
    getDateTimeNow = (dateTime) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateTime).toLocaleTimeString([], options);
    }

    render() {
        const { data } = this.state;

        console.log("TCL: CreateContainer -> render -> data ", data )
        var taskStatusList = {
            ToDo: [],
            Doing: [],
            Complete: [],
        };

        data.map((type) => {
            taskStatusList[type.fields.Status].push(
                <div
                    key={type.id}
                    draggable
                    onDragStart={(event) => this.handleDragStart(event, type.id)}
                    className="draggable"
                >
                    <div className={type.fields.Status}>
                        <div className="owner">{type.fields["Task Owner"] + " - " + this.getDateTimeNow(type.fields["Time Stamp"])}</div>
                        {true ? "" : <div>{type.fields.Email}</div>}
                        <span className="task"><p>{type.fields.Task}</p></span>
                    </div>
                </div>
            );
        })
        return (
            <Fragment>
                <NavBar />
                <div className="container">
                    <ToDo
                        data={taskStatusList.ToDo}
                        onDragOver={(event) => this.handleDragOver(event)}
                        onDrop={(event) => this.handleDrop(event, "ToDo")}
                        handleTaskSubmit={this.handleTaskSubmit} />
                    <Doing
                        data={taskStatusList.Doing}
                        onDragOver={(event) => this.handleDragOver(event)}
                        onDrop={(event) => this.handleDrop(event, "Doing")}
                        handleTaskSubmit={this.handleTaskSubmit} />
                    <Complete
                        data={taskStatusList.Complete}
                        onDragOver={(event) => this.handleDragOver(event)}
                        onDrop={(event) => this.handleDrop(event, "Complete")}
                        handleTaskSubmit={this.handleTaskSubmit} />
                </div>
            </Fragment>
        )
    }
}


export default CreateContainer;