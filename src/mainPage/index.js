import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, sortPosts } from "./action";
import { mutatePostVotes } from "../postDetail/action";
import { List, Radio, Button, Icon } from 'antd';
import { Link } from 'react-router-dom'
import './App.css'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MainPage extends Component{
    componentDidMount(){
        this.props.fetchCategories()
        this.props.fetchPosts()
    }
    render(){
        const { categories, posts, fetchCategories, fetchPosts, sortPosts, mutatePostVotes } = this.props
        console.log('posts', posts)
        return <div className="main-page">
                    <div className="radio-container">
                        <RadioGroup onChange={(e) => {
                            fetchPosts(e.target.value)
                        }}>
                            {categories && (categories.map(category => <RadioButton key={category.name}
                                                                     value={category.path}>{category.name}</RadioButton>))}
                            <RadioButton value=''>all</RadioButton>
                        </RadioGroup>
                    </div>
            <div className="list-container">
                <List
                    size="large"
                    header={<div>Posts</div>}
                    dataSource={posts.filter((post) => post.deleted === false)}
                    renderItem={item => (<List.Item><List.Item.Meta title={item.title}
                                                                    description={item.body}></List.Item.Meta>
                        <div className='vote-container'>
                            <span className='vote'>vote:</span>{item.voteScore}
                            <Icon type="like"  className="like" onClick={() => {
                                // mutatePostVotes(id, 'upVote')
                                console.log('upVote', item.id)
                                mutatePostVotes(item.id, 'upVote')
                            }}/>
                            <Icon type="dislike" className="dislike" onClick={() => {
                                // mutatePostVotes(id, 'downVote')
                                mutatePostVotes(item.id, 'downVote')
                            }}/>
                        </div>
                        <div className='time-container'>
                            <span className='time'>time:</span>{new Date(item.timestamp).toISOString().replace('T', ' ').slice(0, -5)}
                        </div>
                        <Link to={`/posts/${item.id}`}>The detail</Link>
                        </List.Item>)}
                        >
                </List>
            </div>
            <div className="button-container">
                <span>sort by:
                    <span className='vote-button'>
                        <Button type="primary" size='small' onClick={(e) => {
                            sortPosts('voteScore')
                        }}>vote</Button>
                    </span>
                    <span className='time-button'>
                        <Button type="primary" size='small' onClick={(e) => {
                            sortPosts('timestamp')
                        }}>time</Button>
                    </span>
                    <span className='create'>
                        <Link to="/createEditPost/"><Button  type='primary' size='small' icon='plus'>create</Button></Link>
                    </span>
                </span>
            </div>
        </div>
    }
}



const mapStateToProps = ({categories, posts}, props) =>({
        categories,
        posts
})

const mapDispatchToProps = dispatch => ({
    fetchCategories:() => dispatch(fetchCategories()),
    fetchPosts:(category) => dispatch(fetchPosts(category)),
    sortPosts: (method) => dispatch(sortPosts(method)),
    mutatePostVotes:(id, method) => dispatch(mutatePostVotes(id, method))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);