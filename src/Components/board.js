import React, { PureComponent, Fragment } from "react";
import Airtable from "airtable";

//Components
import ToDo from "./todo";
import Doing from "./doing";
import Complete from "./complete";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE = process.env.REACT_APP_TABLE;
const AIRTABLE_TABLE_TWO = process.env.REACT_APP_TABLE_TWO;

class Board extends PureComponent {
    state = {
        data: [],
    };
    componentDidMount() {
        const currentUrl = this.getUrl();
        console.log("TCL: TaskForm -> componentDidMount -> currentUrl", currentUrl)
        this.getAirTableTasks();
    }
    getUrl = () => {
        const currentURL = window.location.pathname.split('/')[2];
        //console.log("TCL: App -> getUrl -> currentURL", currentURL)
        return `/${currentURL}`;
    }
    getAirTableTasks = () => {
        const currentUrl = this.getUrl();
        const Table = currentUrl === "/board-1" ? AIRTABLE_TABLE : AIRTABLE_TABLE_TWO;

        const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE);
        base(Table).select({
            view: 'Grid view'
        }).firstPage((err, records) => {
            if (err) { console.error(err); return; }
            this.setState({
                data: records,
            })
        });
    }
    updateAirTable = (id, status) => {
        const currentUrl = this.getUrl();
        const Table = currentUrl === "/board-1" ? AIRTABLE_TABLE : AIRTABLE_TABLE_TWO;
        
        const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE);
        base(Table).update(id, {
            "Status": status,
          }, function(err) {
            if (err) {
              alert(err);
              return;
            }
        });
    }
    handleDragStart = (id, event) => {
        event.dataTransfer.setData("id", id)        
    }
    handleDragOver = (event) => {
        event.preventDefault();
    }
    handleDrop = (status, event) => {
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
                    onDragStart={(event) => this.handleDragStart(type.id, event)}
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
        <div className="container">
            <ToDo
                data={taskStatusList.ToDo}
                onDragOver={(event) => this.handleDragOver(event)}
                onDrop={(event) => this.handleDrop("ToDo", event)}
            />
            <Doing
                data={taskStatusList.Doing}
                onDragOver={(event) => this.handleDragOver(event)}
                onDrop={(event) => this.handleDrop("Doing", event)}
            />
            <Complete
                data={taskStatusList.Complete}
                onDragOver={(event) => this.handleDragOver(event)}
                onDrop={(event) => this.handleDrop("Complete", event)}
            />
        </div>
        );
    }
}
    
export default Board;














