import React, { PureComponent, Fragment } from "react";
import { airtableFetchRecords } from "../api/airTable";
import Airtable from "airtable";

//Components
import ToDo from "./todo";
import Doing from "./doing";
import Complete from "./complete";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE_TASKS = process.env.REACT_APP_TABLE_BOARDS;

class Board extends PureComponent {
  state = {
    boardData: [],
  };

  componentDidMount() {
    this.getAirTableTasks();
  }

  getAirTableTasks = async () => {
    const records = await airtableFetchRecords();

    this.setState({
      boardData: records,
    });
  };

  updateAirTable = (id, status) => {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
    base(AIRTABLE_TABLE_TASKS).update(
      id,
      {
        Status: status,
      },
      (err) => {
        if (err) {
          console.error("Board -> updateAirTable -> err", err);
        }
      }
    );
  };

  handleDragStart = (id, key, event) => {
    event.dataTransfer.setData("id", id);
  };

  handleDragOver = (event) => {
    event.preventDefault();
  };

  handleDrop = (status, event) => {
    let id = event.dataTransfer.getData("id");
    let updateStatus = this.state.boardData.filter((task) => {
      if (task.id === id) {
        task.fields.Status = status;
      }
      return task;
    });
    this.targetItems.sort((a, b) => {
      // Implement your own sorting logic
      // e.g., return a.id - b.id;
    });
    this.setState({
      ...this.state.boardData,
      updateStatus,
    });
    this.updateAirTable(id, status);
  };

  getDateTimeNow = (dateTime) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateTime).toLocaleTimeString([], options);
  };

  render() {
    const { boardData } = this.state;
    const currentUrl = window.location.pathname.split("-")[1];
    const boardIdNumber = Number(currentUrl);

    const taskStatusList = {
      ToDo: [],
      Doing: [],
      Complete: [],
    };

    boardData.map((type, key) => {
      if (type.fields.BoardId === boardIdNumber) {
        taskStatusList[type.fields.Status].push(
          <div
            key={type.id}
            draggable
            onDragStart={(event) => this.handleDragStart(type.id, key, event)}
            className="task-card "
          >
            <div className="text">
              <div className="owner">
                {`${type.fields["Task Owner"]} - ${this.getDateTimeNow(
                  type.fields["Time Stamp"]
                )}`}
              </div>
              <span className="task">
                <p>{type.fields.Task}</p>
              </span>
            </div>
          </div>
        );
      }
    });

    return (
      <div className="container">
        <ToDo
          data={taskStatusList.ToDo}
          getAirTableTasks={this.getAirTableTasks}
          onDragOver={(event) => this.handleDragOver(event)}
          onDrop={(event) => this.handleDrop("ToDo", event)}
          defaultFormData={boardData}
        />
        <Doing
          data={taskStatusList.Doing}
          getAirTableTasks={this.getAirTableTasks}
          onDragOver={(event) => this.handleDragOver(event)}
          onDrop={(event) => this.handleDrop("Doing", event)}
          defaultFormData={boardData}
        />
        <Complete
          data={taskStatusList.Complete}
          getAirTableTasks={this.getAirTableTasks}
          onDragOver={(event) => this.handleDragOver(event)}
          onDrop={(event) => this.handleDrop("Complete", event)}
          defaultFormData={boardData}
        />
      </div>
    );
  }
}

export default Board;
