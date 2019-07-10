import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";

//Components
import BoardForm from "./form-board";

class Landing extends PureComponent {
    state = {
        hover: false,
    };
    componentDidMount() {
        document.addEventListener("mouseenter", this.handleMouseOver);
    }
    handleMouseOver = () => {
        const { hover } = this.state;
        this.setState({
            hover: !hover,
        });
    }
    render() {
        const { boards } = this.props;

        /*const bgImage = `${this.props.landingImage}?h=1200&fm=jpg&q=80`;
        <div style={bgimg1}></div>

        const bgimg1 = { style={mStyle}
            The image used
            "backgroundImage": `url(${bgImage})`,
            Set a specific height
            "minHeight": 1200 + "px",
            Create the parallax scrolling effect
            "backgroundAttachment": "fixed",
            "backgroundPosition": "center",
            "backgroundRepeat": "no-repeat",
            "backgroundSize": "cover",
        }*/
        const BoardType = boards.map((board) => {
            return (
                <Fragment key={board.fields.BoardId}>
                    <div className="grid-container">
                        <Link to={`/board/${board.fields.BoardUrl}`} className="grid-item">{board.fields.BoardName}</Link>
                    </div>
                </Fragment>
            )
        })
        return (
            <Fragment>
                <BoardForm />
                <div className="card-container ">
                    {BoardType}
                </div>
            </Fragment>
        );
    }
}

export default Landing;



