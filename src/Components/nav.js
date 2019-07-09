import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";

class NavBar extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="header">
                    <span>Board 1</span>
                </div>
                <div className="navbar">
                    <div className="dropdown">
                    <button className="dropbtn">Boards</button>
                        <div className="dropdown-content">
                            <Link to="/board/board-1">Board 1</Link>
                            <Link to="/board/board-2">Board 2</Link>
                        </div>
                    </div>
                </div>
                <Link to="/boards" className="home">home</Link>
            </Fragment>
        );
    }
}

export default NavBar;