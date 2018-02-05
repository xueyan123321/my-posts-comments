import React, { Component } from 'react'
import { Card, List, Icon, Modal, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPostDetail, fetchPostComments, mutatePostVotes, mutateCommentVotes} from "./action";
import './postDetail.css'
import { CommentForm } from "../commentForm/index";

const FormItem = Form.Item

class PostDetail extends Component{
    state = {
        visible:false
    }
    componentDidMount(){
        const { params } = this.props.match
        this.props.receivePostDetail(params.id)
        this.props.receivePostComments(params.id)
    }
    handleCancel= () => {
        this.setState({
            visible:false
        })
    }
    handleCreate= () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if(err){
                return
            }

            console.log('Received values of form:', values)
            form.resetFields();
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
        const { postComments, mutatePostVotes, match, mutateCommentVotes } = this.props
        return (
            <div>
                <div className="post-detail-header" >
                    <Card
                        title={title}
                        extra={<div>
                            <Link to={`/createEditPost/${match.params.id}`}>Edit</Link>
                            <a className="delete-button">Delete</a>
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
                        dataSource={postComments}
                        itemLayout = "horizontal"
                        bordered
                        renderItem={item => ( <List.Item extra={<div>
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
                            </div>}>{item.body}</List.Item> )}
                    >
                    </List>
                    {/*<Modal*/}
                        {/*title="Comment Dialogue"*/}
                        {/*visible={this.state.visible}*/}
                        {/*onCancel= {() => {*/}
                            {/*this.setState({*/}
                                {/*visible:false*/}
                            {/*})*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Form layout="vertical">*/}
                            {/*<FormItem label="body">*/}
                                {/*{}*/}
                            {/*</FormItem>*/}
                        {/*</Form>*/}
                    {/*</Modal>*/}
                    <CommentForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel = {this.handleCancel}
                        onCreate = {this.handleCreate}
                    >
                    </CommentForm>
                    <Button type="primary" onClick={() => {
                        this.setState({
                            visible:true
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
        mutatePostVotes: (id, method) => dispatch(mutatePostVotes(id, method)),
        mutateCommentVotes: (id, method) => dispatch(mutateCommentVotes(id, method))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
