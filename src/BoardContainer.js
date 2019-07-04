import React, { PureComponent, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

//Components
import NavBar from "./Components/nav";
import Landing from "./Components/landing";
import Board from "./Components/board";

class BoardContainer extends PureComponent {
    render() {
        return (
            <Fragment>
                <NavBar />
                <Switch>
                    <Route exact path="/landing" component={Landing} />
                    <Route path="/board/board-1" component={Board} />
                    <Route path="/board/board-2" component={Board} />
                </Switch>
            </Fragment>
        )
    }
}

export default BoardContainer;