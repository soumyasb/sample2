import React, { Component } from 'react';

import { Icon, Form, Input, Checkbox } from 'antd';

import DMTable from './DMTable';
import data from '../../mocks/GetAllActTypes.json';
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
    Code: '',
    Description: '',
    Abbr: '',
    HearingTypes: null,
    Confidential: false,
    TermDate: null,
    lastUpdatedBy: null,
    lastUpdetedDate: null
}

class ActivityType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data,
            showModal: false,
            obj: {},
        };

        this.columns = [
            {
                title: 'Code',
                dataIndex: 'Code',
                key: 'Code',
                // Remove the below line.. if you want to add the details icon.. 
                render: c =>
                    <a onClick={e => this.handleShowModal(e, DM_DETAILS_ACTION_TYPE, c)}
                        style={{ textDecoration: 'underline', color: '#40a9ff' }}>
                        {c}
                    </a>
            },
            {
                title: 'Abbreviation',
                dataIndex: 'Abbr',
                key: 'Abbr'
            },
            {
                title: 'Description',
                dataIndex: 'Description',
                key: 'Description'
            },
            {
                title: 'End Effective Date',
                dataIndex: 'TermDate',
                key: 'TermDate',
            },
            {
                title: 'Confidential',
                dataIndex: 'Confidential',
                key: 'Confidential',
                render: c => c ? <Icon type="check" /> : <Icon type="close" />
            },
        ];

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.renderModalFields = this.renderModalFields.bind(this);
    }

    handleShowModal(e, actype, id) {
        if (actype !== DM_ADD_ACTION_TYPE) {
            if (id) {
                // the next line is fetching data from the json....
                this.setState({ obj: data.find(d => d.Code === id) });

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

            this.setState({ obj: defaultObj });
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

    renderModalFields() {
        const { actionType, obj } = this.state;
        const isEditable = actionType === DM_ADD_ACTION_TYPE || actionType === DM_EDIT_ACTION_TYPE;

        return (
            <Form layout={'horizontal'}>
                <FormItem
                    label="Code"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <Input value={obj.Code} placeholder="Code" onChange={() => { }} />
                        :
                        <div>{obj.Code}</div>
                    }
                </FormItem>
                <FormItem
                    label="Abbreviation"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <Input value={obj.Abbr} placeholder="Abbreviation" onChange={() => { }} />
                        :
                        <div>{obj.Abbr}</div>
                    }
                </FormItem>
                <FormItem
                    label="Description"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <Input value={obj.Description} placeholder="Description" onChange={() => { }} />
                        :
                        <div>{obj.Description}</div>
                    }
                </FormItem>
                <FormItem
                    label="End Effective Date"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <Input value={obj.TermDate} placeholder="End Effective Date" onChange={() => { }} />
                        :
                        <div>{obj.TermDate}</div>
                    }
                </FormItem>
                <FormItem
                    label="Confidential"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <Checkbox checked={obj.Confidential} onChange={this.onChecked} placeholder="input placeholder" />
                        :
                        <div>{obj.Confidential ? <Icon type="check" /> : <Icon type="close" />}</div>
                    }
                </FormItem>
            </Form>
        );
    }

    render() {
        const { title, footer } =
            getModalSettings(this.state.actionType, this.handleOk, this.handleCancel, 'Activity Type');

        return (
            <div>
                <DMTable title={'Activity Type Maintenance'}
                    tableData={data}
                    columns={this.columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='Code'

                    showModal={this.state.showModal}
                    showDeleteModal={this.state.showDeleteModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    modalTitle={title}
                    footer={footer}
                    width={'600px'}
                >
                    {this.renderModalFields()}
                </DMTable>
            </div>
        )
    }
}

export default ActivityType;