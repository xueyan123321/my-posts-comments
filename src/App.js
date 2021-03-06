import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './mainPage/mainPage.css';
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
                    <Route path="/:category([a-zA-Z]*)?" component={MainPage} exact></Route>
                    <Route component={NoMatch}></Route>
                </Switch>
            </div>
        );
    }
}

export default App;
