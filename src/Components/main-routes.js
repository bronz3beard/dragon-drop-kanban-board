import React, { PureComponent, Fragment } from "react";
import { Route } from "react-router-dom";

//Components
import Board from "./board";

class BoardRoutes extends PureComponent {
    render() {
        const { boards } = this.props;

        return (
            <Fragment>
                {
                    boards.map((board) => {
                        return (
                            <Route 
                                path={`/board/${board.fields.BoardUrl}`} 
                                render={props => (<Board {...props} />)} 
                                key={board.fields.BoardId} 
                            />
                        );
                    })
                }
            </Fragment>
        );
    }
}

export default BoardRoutes;



