import React, { Component } from 'react'
import { Card, List, Icon, Button, Popconfirm} from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPostDetail, fetchPostComments, deletePostRequest, mutatePostVotes, mutateCommentVotes, postComment, requestEditComment, requestDeleteComment} from "./action";
import './postDetail.css'
import { CommentForm } from "../commentForm/index";


class PostDetail extends Component{
    state = {
        visible:false,
        commentDetails:{}
    }
    componentDidMount(){
        const { params } = this.props.match
        this.props.receivePostDetail(params.id)
        this.props.receivePostComments(params.id)

    }
    componentWillReceiveProps(){
        if(this.props.postDetails.error){
            this.props.history.push('/404')
        }
    }
    handleCancel = () => {
        this.setState({
            visible:false
        })
    }
    /**
     * @description when don't provide the commentId, it creates a new comment, otherwise, it edits existing post.
     * @param commentId
     */
    handleCreateOrEdit = (commentId = '') => {
        const form = this.form;
        const { postComment, match, editComment } = this.props
        form.validateFields((err, values) => {
            if(err){
                return
            }

            const {body, author} = values
            if(!commentId){
                postComment(body, author, match.params.id)
                form.resetFields();

            } else {
                editComment(body, author, commentId)
            }
            this.setState({
                visible:false
            })
        })
    }
    saveFormRef = (form) => {
        this.form = form
    }
    render(){
        const { body,id,title,author, timestamp, voteScore, commentCount } = this.props.postDetails
        const { postComments, mutatePostVotes, deletePost, match, mutateCommentVotes, history} = this.props
        return (
            <div>
                <div className="post-detail-header" >
                    <Card
                        title={title}
                        extra={<div>
                            <Link to={`/createEditPost/${match.params.id}`} className="edit">Edit</Link>
                            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => {
                                deletePost(match.params.id)
                                history.push('/')
                            }}>
                                <a>Delete</a>
                            </Popconfirm>
                        </div>}>
                        <p>{body}</p>
                        <p>
                            <span className="author">Author: {author}</span>
                            <span className="time">Time: {new Date(timestamp).toUTCString()}</span>
                            <span className= "vote">VoteScore:{voteScore}<Icon type="like"  className="like" onClick={() => {
                                mutatePostVotes(id, 'upVote')
                            }}/><Icon type="dislike" className="dislike" onClick={() => {
                                mutatePostVotes(id, 'downVote')
                            }}/></span>
                            <span>commentCount: {commentCount}</span>
                        </p>
                    </Card>
                </div>
                <div className="post-comments">
                    <List
                        header={<h3>Comments</h3>}
                        dataSource={postComments.filter((postComment) => postComment.deleted === false && postComment.parentDeleted === false)}
                        bordered
                        renderItem={item => ( <List.Item actions={[<a onClick={() => {
                            this.setState({
                                visible: true,
                                commentDetails: item
                            })
                        }}>edit</a> ,
                            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={
                                () => {
                                    this.props.deletedComment(item.id)
                                }
                            }>
                                <a>delete</a>
                            </Popconfirm>
                        ]}>
                            <div className="comment-body">{item.body} -- {item.author}</div>
                            <div className="comment-vote">
                                voteScore:{item.voteScore}
                                <span className= "vote">
                                    <Icon type="like"  className="like" onClick={() => {
                                        // mutatePostVotes(id, 'upVote')
                                        mutateCommentVotes(item.id, 'upVote')
                                    }}/>
                                    <Icon type="dislike" className="dislike" onClick={() => {
                                        // mutatePostVotes(id, 'downVote')
                                        mutateCommentVotes(item.id, 'downVote')
                                    }}/>
                                </span>
                            </div>
                            </List.Item> )}
                    >
                    </List>
                    <CommentForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel = {this.handleCancel}
                        onCreateOrEdit = {this.handleCreateOrEdit}
                        commentDetails = {this.state.commentDetails}
                    >
                    </CommentForm>
                    <Button type="primary" className="create-button" onClick={() => {
                        this.setState({
                            visible:true,
                            commentDetails:{
                                body:'',
                                author:''
                            }
                        })
                    }}>Create New Comment</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({postDetails, postComments}) => (
    {
        postDetails,
        postComments
    }
)

const mapDispatchToProps = dispatch => (
    {
        receivePostDetail:(id) => dispatch(fetchPostDetail(id)),
        receivePostComments: (id) => dispatch(fetchPostComments(id)),
        deletePost: (id) => dispatch(deletePostRequest(id)),
        mutatePostVotes: (id, method) => dispatch(mutatePostVotes(id, method)),
        mutateCommentVotes: (id, method) => dispatch(mutateCommentVotes(id, method)),
        postComment: (body, author, parentId) => dispatch(postComment(body, author, parentId)),
        editComment: (body, author, id) => dispatch(requestEditComment(body, author, id)),
        deletedComment:(id) => dispatch(requestDeleteComment(id))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
