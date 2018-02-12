import React, { Component } from 'react';
import { mainUrl } from "./globalConfig";
import { Route, Switch } from 'react-router-dom';
import './mainPage/App.css';
import MainPage from './mainPage/index'
import CreateEditPost from './CreateEditPost/index'
import NoMatch from './noMatch/index'
import PostDetail from './postDetail/index'


class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/createEditPost/:id?" component={CreateEditPost}></Route>
                    <Route path="/:category/:id" component={PostDetail}></Route>
                    <Route path="/:category?" component={MainPage}></Route>
                    <Route component={NoMatch}></Route>
                </Switch>
            </div>
        );
    }
}

export default App;
