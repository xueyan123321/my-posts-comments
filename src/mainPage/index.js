import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, sortPosts } from "./action";
import { mutatePostVotes, deletePostRequest} from "../postDetail/action";
import { List, Radio, Button, Icon, Popconfirm } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment'
import './mainPage.css'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MainPage extends Component{
    componentDidMount(){
        this.props.fetchCategories()
        this.props.fetchPosts()
    }
    render(){
        const { categories, posts, fetchPosts, sortPosts, mutatePostVotes, deletePost, history } = this.props
        return <div className="main-page">
                    <div className="radio-container">
                        <RadioGroup onChange={(e) => {
                            fetchPosts(e.target.value)
                            this.props.history.push(`/${e.target.value}`)
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
                            itemLayout="vertical"
                            renderItem={item => (<List.Item actions={[<Link to={`/createEditPost/${item.id}`}>edit</Link>,
                                <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => {
                                    deletePost(item.id)
                                    history.push('/')
                                }}>
                                    <a>Delete</a>
                                </Popconfirm>
                            ]}>
                                <List.Item.Meta title={item.title} description={
                                    <div>
                                        <p>{item.body}</p>
                                        <span>-{item.author}</span>
                                    </div>
                                }></List.Item.Meta>
                                <div className="comments-number">comment number: {item.commentCount}</div>
                                <div className='vote-container'>
                                    <span className='vote'>vote:</span>{item.voteScore}
                                    <Icon type="like"  className="like" onClick={() => {
                                        mutatePostVotes(item.id, 'upVote')
                                    }}/>
                                    <Icon type="dislike" className="dislike" onClick={() => {
                                        mutatePostVotes(item.id, 'downVote')
                                    }}/>
                                </div>
                                <div className='time-container'>
                                    <span className='time'>time:</span>{moment(item.timestamp).format()}
                                </div>
                                <Link to={`/${item.category}/${item.id}`}>The detail</Link>
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
                            <Link to="/createEditPost/"><Button  type='danger' size='small' icon='plus'>Create new post!</Button></Link>
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
    mutatePostVotes:(id, method) => dispatch(mutatePostVotes(id, method)),
    deletePost:(id) => dispatch(deletePostRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);