import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import Airtable from "airtable";

//Components
import ToDo from "./todo";
import Doing from "./doing";
import Complete from "./complete";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE_TASKS = process.env.REACT_APP_TABLE_TASKS;

class Board extends PureComponent {
  state = {
    boardData: [],
  };

  componentDidMount() {
    this.getAirTableTasks();
  }

  getAirTableTasks = () => {
    fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE_TASKS}?api_key=${AIRTABLE_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("BoardContainer -> data", data);
        this.setState({
          boardData: data.records,
        });
      })
      .catch((err) => {
        // Error :(
      });
    // const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
    // base(AIRTABLE_TABLE_TASKS)
    //   .select({
    //     view: "Grid view",
    //   })
    //   .firstPage((err, records) => {
    //     if (err) {
    //       console.error("Board -> getAirTableTasks -> err", err);
    //     }
    //     this.setState({
    //       boardData: records,
    //     });
    //   });
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

  handleDragStart = (id, event) => {
    event.dataTransfer.setData("id", id);
  };

  handleDragOver = (event) => {
    event.preventDefault();
  };

  handleDrop = (status, event) => {
    let id = event.dataTransfer.getData("id");
    //const idNumber = Number(id);
    let updateStatus = this.state.boardData.filter((task) => {
      if (task.id === id) {
        task.fields.Status = status;
      }
      return task;
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

    var taskStatusList = {
      ToDo: [],
      Doing: [],
      Complete: [],
    };

    boardData.map((type) => {
      if (type.fields.BoardId === boardIdNumber) {
        taskStatusList[type.fields.Status].push(
          <div
            key={type.id}
            draggable
            onDragStart={(event) => this.handleDragStart(type.id, event)}
            className="task-card "
          >
            <div className="text">
              <div className="owner">
                {type.fields["Task Owner"] +
                  " - " +
                  this.getDateTimeNow(type.fields["Time Stamp"])}
              </div>
              {true ? "" : <div>{type.fields.Email}</div>}
              <span className="task">
                <p>{type.fields.Task}</p>
              </span>
            </div>
          </div>
        );
      }
    });

    return (
      <Fragment>
        <Link to="/boards" className="home">
          home
        </Link>
        <div className="container">
          <ToDo
            data={taskStatusList.ToDo}
            onDragOver={(event) => this.handleDragOver(event)}
            onDrop={(event) => this.handleDrop("ToDo", event)}
            defaultFormData={boardData}
          />
          <Doing
            data={taskStatusList.Doing}
            onDragOver={(event) => this.handleDragOver(event)}
            onDrop={(event) => this.handleDrop("Doing", event)}
            defaultFormData={boardData}
          />
          <Complete
            data={taskStatusList.Complete}
            onDragOver={(event) => this.handleDragOver(event)}
            onDrop={(event) => this.handleDrop("Complete", event)}
            defaultFormData={boardData}
          />
        </div>
      </Fragment>
    );
  }
}

export default Board;
