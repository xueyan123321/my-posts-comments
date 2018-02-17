import React from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item
/**
 * @description: Form component is from library Ant Design Form
 */
export const CommentForm = Form.create({
    mapPropsToFields:(props) => {
        const { commentDetails } = props
        return {
            body: Form.createFormField({value: commentDetails.body}),
            author: Form.createFormField({value:commentDetails.author})
        }
    }
})(
    (props) => {
        const { visible, onCancel, onCreateOrEdit, form, commentDetails} = props;
        const { getFieldDecorator } = form
        return (
            <Modal
                visible={visible}
                title="Create or Edit a comment"
                okText = "Submit"
                onCancel={onCancel}
                onOk={() => onCreateOrEdit(commentDetails.id)}
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
