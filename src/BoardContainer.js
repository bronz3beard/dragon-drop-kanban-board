import React, { PureComponent, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Airtable from "airtable";

//Components
import NavBar from "./Components/nav";
import Landing from "./Components/landing";
import BoardRoutes from "./Components/main-routes";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE_BOARDS = process.env.REACT_APP_TABLE_BOARDS;

class BoardContainer extends PureComponent {
    state = {
        boards: [],
    };
    componentDidMount() {
        this.getAirTableBoards();
    }
    getAirTableBoards = () => {
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
        base(AIRTABLE_TABLE_BOARDS).select({
            view: 'Grid view'
        }).firstPage((err, records) => {
            if (err) {
                alert.error(err); 
                return; 
            }
            this.setState({
                boards: records,
            });
        });
    }
    updateAirTable = (id, status) => {
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE);
        base(AIRTABLE_TABLE_BOARDS).update(id, {
            "Status": status,
        }, function (err) {
            if (err) {
                alert(err);
                return;
            }
        });
    }
    render() {
        const { boards } = this.state;

        return (
            <Fragment>
                <NavBar />
                <Switch>
                    <Route exact path="/boards" render={props => (<Landing {...props} boards={boards} />)} />
                    <BoardRoutes boards={boards} />
                </Switch>
            </Fragment>
        )
    }
}

export default BoardContainer;