import React, { Component } from "react";
import { Modal, Form, Input, Button, Radio, Select, Checkbox, DatePicker } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class NewsModal extends Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        const title = this.props.actionType === 'create' ?
            'Create News Item' : 'EDIT TODO'


        return (
            <Modal
                visible={this.props.modalVisible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                title={title}
                okText={this.props.actionType}      
            >
                Modal - {this.props.actionType}  
            </Modal>
        );
    }
}

export default NewsModal;
