import React, { Component } from 'react';

import { Icon, Form, Input, InputNumber, Checkbox, DatePicker } from 'antd';
import moment from 'moment';

import DMTable from './DMTable';
import data from '../../mocks/GetAllHearingTimes.json';
import {
    getModalSettings,
    DM_ADD_ACTION_TYPE,
    DM_DELETE_ACTION_TYPE,
    DM_EDIT_ACTION_TYPE,
    DM_DETAILS_ACTION_TYPE
} from './DMTableFns';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};

const defaultObj = {
    ID: -1,
    Category: '',
    HearingTime: 1,
    InterviewTime: 1,
    ReExamTime: 1,
    LastUpdatedBy: null,
    LastUpdatedDate: null,
    message: null
}

class DefaultHearingTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data,
            showModal: false,
            obj: {},
        };

        this.columns = [
            {
                title: 'Category',
                dataIndex: 'Category',
                key: 'Category',
                // Remove the below line.. if you want to add the details icon.. 
                render: c =>
                    <a onClick={e => this.handleShowModal(e, DM_DETAILS_ACTION_TYPE, c.toLowerCase())}
                        style={{ textDecoration: 'underline', color: '#40a9ff' }}>
                        {c}
                    </a>
            },
            {
                title: 'Hearing',
                dataIndex: 'HearingTime',
                key: 'HearingTime'
            },
            {
                title: 'Interview',
                dataIndex: 'InterviewTime',
                key: 'InterviewTime'
            },
            {
                title: 'ReExamination',
                dataIndex: 'ReExamTime',
                key: 'ReExamTime',
            }
        ];

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.renderModalFields = this.renderModalFields.bind(this);
    }

    handleShowModal(e, actype, id) {
        if (actype !== DM_ADD_ACTION_TYPE) {
            if (id) {
                // the next line is fetching data from the json....
                this.setState({ obj: { ...data.find(d => d.Category.toLowerCase() === id.toLowerCase()) } });

                // TODO fetch the edit obj... (from action if needed)
                if (actype === DM_EDIT_ACTION_TYPE) {

                }
                if (actype === DM_DETAILS_ACTION_TYPE) {

                }
                if (actype === DM_DELETE_ACTION_TYPE) {

                }
            }
        }
        else {
            // TODO get the default Obj (from action if needed)

            this.setState({ obj: { ...defaultObj } });
        }

        this.setState({
            actionType: actype,
            showModal: actype !== DM_DELETE_ACTION_TYPE,
            showDeleteModal: actype === DM_DELETE_ACTION_TYPE
        });
    }

    handleCancel() {
        this.setState({ showModal: false, showDeleteModal: false });
    }

    handleOk(actionType) {
        // TODO 
        switch (actionType) {
            case DM_ADD_ACTION_TYPE:
                // TODO for adding 
                break;
            case DM_EDIT_ACTION_TYPE:
                // TODO for editing 
                break;
            case DM_DELETE_ACTION_TYPE:
                // TODO for deleting 
                break;
            default: break;
        }

        this.setState({ showModal: false, showDeleteModal: false });
    }

    handleFieldChange(e, field) {
        const { obj } = this.state;

        switch (field) {
            case 'Category':
                obj[field] = e.target.value;
                break;
            case 'HearingTime':
            case 'InterviewTime':
            case 'ReExamTime':
                obj[field] = e;
                break;
            default:
                break
        }

        this.setState({ obj });
    }

    onDateChange(d, ds, type) {
        const { obj } = this.state;
        obj[type] = ds || '';//moment(new Date());

        this.setState({ obj });
    }

    renderModalFields() {
        const { actionType, obj } = this.state;
        const isEditable = actionType === DM_ADD_ACTION_TYPE || actionType === DM_EDIT_ACTION_TYPE;

        return (
            <Form layout={'horizontal'}>
                <FormItem
                    label="Category"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <Input value={obj.Category} placeholder="Category" onChange={e => this.handleFieldChange(e, 'Category')} />
                        :
                        <div>{obj.Category}</div>
                    }
                </FormItem>
                <FormItem
                    label="Hearing Time"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <InputNumber min={1} max={100} value={obj.HearingTime}
                            placeholder="Hearing Time"
                            onChange={e => this.handleFieldChange(e, 'HearingTime')} />
                        :
                        <div>{obj.HearingTime}</div>
                    }
                </FormItem>
                <FormItem
                    label="Interview Time"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <InputNumber min={1} max={100} value={obj.InterviewTime}
                            placeholder="Interview Time"
                            onChange={e => this.handleFieldChange(e, 'InterviewTime')} />
                        :
                        <div>{obj.InterviewTime}</div>
                    }
                </FormItem>
                <FormItem
                    label="ReExamination Time"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <InputNumber min={1} max={100} value={obj.ReExamTime}
                            placeholder="Interview Time"
                            onChange={e => this.handleFieldChange(e, 'ReExamTime')} />
                        :
                        <div>{obj.ReExamTime}</div>
                    }
                </FormItem>
                {
                    !isEditable &&
                    <div>
                        <FormItem
                            label="Last Updated By"
                            {...formItemLayout}
                        >
                            <div>{obj.LastUpdatedBy}</div>
                        </FormItem>
                        <FormItem
                            label="Last Updated Date"
                            {...formItemLayout}
                        >
                            <div>{obj.LastUpdatedDate}</div>
                        </FormItem>
                    </div>
                }
            </Form>
        );
    }

    render() {
        const { title, footer } =
            getModalSettings(this.state.actionType, this.handleOk, this.handleCancel, 'Default Hearing Time');

        return (
            <div>
                <DMTable title={'Default Hearing Time Maintenance'}
                    tableData={data}
                    columns={this.columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='Category'

                    searchField='Category'

                    showModal={this.state.showModal}
                    showDeleteModal={this.state.showDeleteModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    modalTitle={title}
                    footer={footer}
                    width={'600px'}
                    renderModalFields={this.renderModalFields}
                />
            </div>
        )
    }
}

export default DefaultHearingTime;