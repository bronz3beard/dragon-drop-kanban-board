import React, { PureComponent, Fragment } from "react";

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
                            <a href="/">Board 2</a>
                            <a href="/">Board 3</a>
                            <a href="/">Board 4</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NavBar;