import React, { Component } from 'react';
import { mainUrl } from "./globalConfig";
import { Route, Switch } from 'react-router-dom';
import './mainPage/App.css';
import MainPage from './mainPage/index'
import CreateEditPost from './CreateEditPost/index'
import NoMatch from './noMatch/index'
import PostDetail from './postDetail/index'


class App extends Component {
    componentDidMount() {
        /**
         * @description get all the categories
         */

        /**
         * @description get all the posts
         */
    }
    // onChange(e) {
    //     console.log(`radio checked: ${e.target.value}`)
    //     if(e.target.value === 'all'){
    //         fetch(`${mainUrl}/posts`,{
    //             headers: {
    //                 Authorization: 'whatever-you-want'
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(res => this.setState({
    //                 posts:res
    //             }))
    //     } else{
    //         fetch(`${mainUrl}/${e.target.value}/posts`,{
    //             headers: {
    //                 Authorization: 'whatever-you-want'
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(res => this.setState({
    //                 posts:res
    //             }))
    //     }
    // }
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact component={MainPage}></Route>
                    <Route path="/createEditPost/:id?" component={CreateEditPost}></Route>
                    <Route path="/posts/:id" component={PostDetail}></Route>
                    <Route component={NoMatch}></Route>
                </Switch>
            </div>
        );
    }
}

export default App;
