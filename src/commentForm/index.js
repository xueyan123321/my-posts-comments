import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

export const CommentForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form
        return (
            <Modal
                visible={visible}
                title="Create a new comment"
                okText = "Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="body">
                        {getFieldDecorator('body',{
                            rules:[{
                                required: true,
                                message: 'Please input the body of the comment'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem label="author">
                        {getFieldDecorator('author', {
                            rules:[{
                                required: true,
                                message: 'please input the author of the comment'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)
