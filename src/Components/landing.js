import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class Landing extends PureComponent {

    render() {

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

        return (
            <div>
                <div className="card-container" >
                    <div className="titleLink">
                        <Link to="/board/board-1" className="divLink" />
                    </div>
                </div>
                <div className="titleLink-1">
                    <Link to="/board/board-2" className="divLink" />
                </div>
            </div>

        );
    }
}

export default Landing;



