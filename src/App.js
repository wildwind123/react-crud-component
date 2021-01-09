import React, { Component } from "react";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Route } from "react-router-dom";
import User from "./Page/Users/User";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/user" component={User} exact/>
                    <Route path="/user/:id" component={User} exact/>
                    <Route path="/user/:id/:action" component={User} exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;