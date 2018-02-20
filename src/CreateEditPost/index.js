import React, { Component } from 'react'
import { Form, Input, DatePicker, Select, Button} from 'antd'
import { connect } from 'react-redux'
import { fetchPostDetail } from "../postDetail/action";
import "./createEditPost.css"
import moment from 'moment'
import * as fetchUrl from '../utilAPI'
import NoMatch from '../noMatch/index'

const FormItem = Form.Item;
const Option = Select.Option

class CreateEditPost extends Component{
    componentDidMount(){
        const { id } = this.props.match.params
        if(id){
            this.props.receivePostDetails(id)
        } else {
            this.props.form.setFieldsValue({
                title: '',
                body: '',
                dateTimePicker:moment(),
                author: '',
                category:''
            })
        }
    }

    /**
     * @description handle the submit of the create or edit post.If it doesn't have an match.prams.id, it will create a new post.
     * @param e
     */
    handleSubmit=(e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            const {title, body, author, category} = values
            if(!err && this.props.match.params.id){
                fetchUrl.editPost(this.props.match.params.id, title, body, author, category
                ).then(res => console.log('resEdit', res))
                this.props.history.push('/')
            } else if(!err){
                fetchUrl.createPost(title,body, author, category).then(res => console.log('res', res))
                this.props.history.push('/')
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { postDetails } = this.props
        const config = {
          rules: [{
              type: 'object',
              required: true,
              message: 'Please select time!'
          }]
        };
        const formItemLayout = {
            labelCol:{
                span: 4
            },
            wrapperCol: {
                span: 10,
                offset:1,
            }
        }
        return (
            <div>
                {(postDetails && (postDetails.error !== undefined) && (<NoMatch></NoMatch>))||(<Form className="post-form" onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="Title"
                    >
                        {getFieldDecorator('title', {
                            rules:[
                                {
                                    type:'string', message: 'The title must be a string', pattern: /[a-zA-Z\s]/
                                },
                                {
                                    required:true, message: 'please input the post title'
                                }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Body"
                    >
                        {getFieldDecorator('body', {
                            rules:[
                                {
                                    type:'string', message: 'The body must be a string', pattern: /[a-zA-Z\s]/
                                },
                                {
                                    required:true, message: 'please input the post body'
                                }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Time"
                    >
                        {getFieldDecorator('dateTimePicker', config)(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Author"
                    >
                        {getFieldDecorator('author', {
                            rules:[
                                {
                                    type:'string', message: 'The author must be a string', pattern: /^[a-zA-Z]+$/
                                },
                                {
                                    required:true, message: 'please input the post author'
                                }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        { ...formItemLayout}
                        label="Category"
                    >
                        {getFieldDecorator('category', {
                            rules: [{required:true, message: 'Please select post category!'}],
                        })(
                            <Select
                                placeholder="Select a option and change input text above"
                            >
                                <Option value="react">react</Option>
                                <Option value="redux">redux</Option>
                                <Option value="udacity">udacity</Option>
                            </Select>
                        )}
                    </FormItem>
                    <Button type="primary" className="cancel-button" onClick={()=> {
                        this.props.history.push('/')
                    }}>Cancel</Button>
                    <Button type="primary" htmlType="submit" className="submit-button">submit</Button>
                </Form>)}
            </div>

        )
    }
}

const mapStateToProps = ({ postDetails })=>({
    postDetails
})

const mapDispatchToProps = (dispatch) => ({
    receivePostDetails: (id) => dispatch(fetchPostDetail(id))
})

const WrappedCreateEditPost = Form.create({
    mapPropsToFields:(props) => {
        const { title, body, timestamp, author, category} = props.postDetails
        return {
            title:Form.createFormField({value: title}),
            body: Form.createFormField({value: body}),
            dateTimePicker: Form.createFormField({value:moment(timestamp)}),
            author: Form.createFormField({value:author}),
            category: Form.createFormField({value: category})
        }
    }
})(CreateEditPost)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCreateEditPost)