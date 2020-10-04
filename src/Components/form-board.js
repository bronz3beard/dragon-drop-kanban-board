import React, { PureComponent } from "react";
import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE_BOARDS = process.env.REACT_APP_TABLE_BOARDS;

class BoardForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      existingTableData: 0,
      formControls: {
        boardName: {
          value: "",
          placeholder: "Board Name...",
        },
      },
      addTask: false,
    };
  }

  componentDidUpdate() {
    this.getAirTableBoards();
  }

  getAirTableBoards = () => {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
    base(AIRTABLE_TABLE_BOARDS)
      .select({
        view: "Grid view",
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("BoardForm -> getAirTableBoards -> err", err);
        }
        this.setState({
          existingTableData: records.length,
        });
      });
  };

  createBoardToAirTable = () => {
    const { formControls, existingTableData } = this.state;
    const boardIdNumber = existingTableData + 1;
    const boardUrl = `board-${boardIdNumber}`;

    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
    base(AIRTABLE_TABLE_BOARDS).create(
      {
        BoardName: formControls.boardName.value,
        BoardUrl: boardUrl,
        BoardId: boardIdNumber,
      },
      function (err, record) {
        if (err) {
          console.error("BoardForm -> createBoardToAirTable -> err", err);
        }
        //   window.location.reload();
      }
    );
    /*const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE_BOARDS}`;
        const fields = {
            "fields": {

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
        }).catch(error => alert(error));*/
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { formControls } = this.state;
    const name = formControls.boardName.value.trim();

    if (!name) {
      // return alert("Please enter a name for your board");
    }
    this.setState({
      addTask: false,
    });
    this.createBoardToAirTable();
  };

  changeHandler = (event) => {
    const { formControls } = this.state;
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...formControls,
        [name]: {
          ...formControls[name],
          value,
        },
      },
    });
  };

  handleAddTask = () => {
    const { addTask } = this.state;

    this.setState({
      addTask: !addTask,
    });
  };

  render() {
    const { formControls, addTask } = this.state;

    const taskForm = addTask ? (
      <form className="boardForm" onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="boardName"
            placeholder={formControls.boardName.placeholder}
            value={formControls.boardName.value}
            onChange={this.changeHandler}
          />
        </div>
        <input className="button-submit" type="submit" value="Post" />
      </form>
    ) : null;

    return (
      <React.Fragment>
        <button className="add-board" onClick={this.handleAddTask}>
          Add Board
        </button>
        {taskForm}
      </React.Fragment>
    );
  }
}

export default BoardForm;
