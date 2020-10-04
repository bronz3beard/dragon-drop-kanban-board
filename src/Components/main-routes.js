import React, { PureComponent } from "react";
import { Route } from "react-router-dom";

//Components
import Board from "./board";

class BoardRoutes extends PureComponent {
  render() {
    const { boards } = this.props;

    return (
      <>
        {boards &&
          boards.length > 0 &&
          boards.map((board) => {
            return (
              <Route
                path={`/board/${board.fields.BoardUrl}`}
                render={(props) => <Board {...props} />}
                key={board.fields.BoardId}
              />
            );
          })}
      </>
    );
  }
}

export default BoardRoutes;
