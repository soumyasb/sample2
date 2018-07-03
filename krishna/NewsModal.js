import React, { Component } from "react";
import { Modal, Form, Input, Select, Checkbox, DatePicker } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class NewsModal extends Component {
    render() {
        const newsItemObj = this.props.newsItemObj;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        let title = 'Create News Item';debugger
        switch(this.props.actionType) {
            case 'create': 
                title = 'Create News Item';
                break;
            case 'edit': 
                title = 'Edit News Item';
                break;
            case 'details': 
                title = 'details - TODO';
                break;
            case 'delete': 
                title = 'delete - TODO';
                break;
            default: 
                title = 'Create News Item';
        }

        return (
            <Modal
                visible={this.props.modalVisible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                title={title}
                okText={this.props.actionType}   
            >
                <div>
                    <Form layout={'horizontal'}>
                        <FormItem
                            label="Priority"
                            {...formItemLayout}
                        >
                            <Select value={newsItemObj.priority} onChange={this.onPriorityChange}>
                               <Option value="A">Urgent</Option>
                               <Option value="B">Normal</Option>
                               <Option value="C">Low</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="Subject"
                            {...formItemLayout}
                            validateStatus={'error'}
                        >
                            <Input value={newsItemObj.subject} placeholder="Subject" />
                        </FormItem>
                        <FormItem
                            label="News Text"
                            {...formItemLayout}
                        >
                            <TextArea value={newsItemObj.newsText} rows="6" />
                        </FormItem>
                        <FormItem
                            label="Start Date"
                            {...formItemLayout}
                        >
                            <DatePicker placeholder="Start Date" onChange={this.onChange} />
                        </FormItem>
                        <FormItem
                            label="End Date"
                            {...formItemLayout}
                        >
                            <DatePicker placeholder="End Date" onChange={this.onChange} />
                        </FormItem>
                        <FormItem
                            label=""
                            {...formItemLayout}
                        >
                            <Checkbox placeholder="input placeholder">
                                All offices in your region?
                            </Checkbox>
                        </FormItem>
                    </Form>
                </div>  
            </Modal>
        );
    }
}

export default NewsModal;