import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

//Components
import NavBar from "./Components/nav";
import Landing from "./Components/landing";
import BoardRoutes from "./Components/main-routes";

const Airtable = require("airtable");

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE_BOARDS = process.env.REACT_APP_TABLE_BOARDS;

const BoardContainer = (props) => {
  const [boards, setBoards] = useState([]);
  const { location } = props;

  useEffect(() => {
    getAirTableBoards();
  }, []);

  const getAirTableBoards = () => {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
    base(AIRTABLE_TABLE_BOARDS)
      .select({
        view: "Grid view",
      })
      .firstPage((err, records) => {
        console.log("BoardContainer -> getAirTableBoards -> records", records);
        if (err) {
          console.error("BoardContainer -> getAirTableBoards -> err", err);
          return;
        }
        setBoards(records);
      });
  };

  const updateAirTable = (id, status) => {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
    base(AIRTABLE_TABLE_BOARDS).update(
      id,
      {
        Status: status,
      },
      (err) => {
        if (err) {
          console.error("BoardContainer -> updateAirTable -> err", err);
          return;
        }
      }
    );
  };

  return (
    <>
      <NavBar boards={boards} />
      <Switch>
        <Route
          exact
          path="/boards"
          render={(props) => <Landing {...props} boards={boards} />}
        />
        <BoardRoutes boards={boards} />
      </Switch>
    </>
  );
};

export default withRouter(BoardContainer);
