import React, { StrictMode } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

//Components
import BoardContainer from './BoardContainer';

//Styles
import "./Styles/navi.css";
import "./Styles/landing.css"
import "./Styles/drogondrop.css";
import "./Styles/form.css";

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <BoardContainer />
        </BrowserRouter>
    </StrictMode>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
