import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";

class NavBar extends PureComponent {
    render() {
        const { boards } = this.props;
        
        return (
            <Fragment>
                <div className="nav-header">
                    <span>Organise</span>
                </div>
                <div className="navbar">
                    <div className="dropdown">
                        <button className="dropbtn">Boards</button>
                        <div className="dropdown-content">
                            {
                                boards.map((board) => {
                                    return (
                                        <Link to={`/board/${board.fields.BoardUrl}`} key={board.fields.BoardId}>{board.fields.BoardName}</Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NavBar;