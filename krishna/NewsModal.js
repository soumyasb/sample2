import React, { Component } from "react";
import moment from 'moment';
import { Modal, Form, Input, Select, Checkbox, DatePicker, Button } from 'antd';
import { bindInstanceMethods } from '../../../utils';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const getModalSettings = (actype, onOk, onCancel) => {
    let title, okText = '';
    let footer = [];

    switch(actype) {
        case 'create': 
            title = 'Create News Item';
            okText = 'Create';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        case 'edit': 
            title = 'Edit News Item';
            okText = 'Edit';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        case 'details': 
            title = 'details - TODO';
            okText = 'Details';
            footer = [
                <Button key="Close" onClick={onCancel}>Close</Button>
            ];
            break;
        case 'delete': 
            title = 'delete - TODO';
            okText = 'Delete';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        default: 
            title = 'Create News Item';
    }

    return {
        title,
        okText,
        footer,
    }

}

class NewsModal extends Component {
    constructor(props) {
        super(props);

        this.state ={
            newsItemObj: props.newsItemObj
        }

        bindInstanceMethods(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.newsItemObj !== nextProps.newsItemObj) {
            this.setState({ newsItemObj: nextProps.newsItemObj });
        } 
    }

    onPriorityChange(e, val) {
        const { newsItemObj } = this.state;
        newsItemObj.priority = val;
        this.setState({ newsItemObj });
    }

    onNewsTextChange(e) {
        const { newsItemObj } = this.state;
        newsItemObj.newsText = e.target.value;
        this.setState({ newsItemObj });
    }

    onSubjectChange(e) {
        const { newsItemObj } = this.state;
        newsItemObj.subject = e.target.value;
        this.setState({ newsItemObj });
    }

    render() {
        let { newsItemObj } = this.state;
        const modalSettings = getModalSettings(...this.props);

        return (
            <Modal
                visible={this.props.modalVisible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                title={modalSettings.title}
                okText={modalSettings.okText} 
                footer={modalSettings.footer}
                width={'750px'}
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
                        >
                            <Input value={newsItemObj.subject} placeholder="Subject" onChange={this.onSubjectChange} />
                        </FormItem>
                        <FormItem
                            label="News Text"
                            {...formItemLayout}
                        >
                            <TextArea value={newsItemObj.newsText} rows="6" onChange={this.onNewsTextChange} />
                        </FormItem>
                        <FormItem
                            label="Start Date"
                            {...formItemLayout}
                        >
                            <DatePicker placeholder="Start Date"
                                defaultValue={moment(newsItemObj.startDate, 'YYYY-MM-DD')} onChange={() => {}} />
                        </FormItem>
                        <FormItem
                            label="End Date"
                            {...formItemLayout}
                        >
                            <DatePicker placeholder="End Date"
                                defaultValue={moment(newsItemObj.endDate, 'YYYY-MM-DD')} onChange={() => {}} />
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