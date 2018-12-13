import React, { Component } from 'react';

import { Icon, Form, Input, Checkbox, DatePicker } from 'antd';
import moment from 'moment';

import DMTable from './DMTable';
import data from '../../mocks/GetAllLanguages.json';
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
    CdLanguage: '',
    DescLanguage: '',
    DtTerm: null
}

class Languages extends Component {
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
                dataIndex: 'CdLanguage',
                key: 'CdLanguage',
                // Remove the below line.. if you want to add the details icon.. 
                render: (c, obj) =>
                    <a onClick={e => this.handleShowModal(e, DM_DETAILS_ACTION_TYPE, obj)}
                        style={{ textDecoration: 'underline', color: '#40a9ff' }}>
                        {c}
                    </a>
            },
            {
                title: 'Language',
                dataIndex: 'DescLanguage',
                key: 'DescLanguage'
            }
        ];

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.renderModalFields = this.renderModalFields.bind(this);
    }

    handleShowModal(e, actype, obj) {
        if (actype !== DM_ADD_ACTION_TYPE) {
            if (obj) {
                // the next line is fetching data from the json....
                this.setState({ obj: { ...data.find(d => d.CdLanguage === obj.CdLanguage) } });

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

    handleFieldChange(e, field) {
        const { obj } = this.state;

        switch (field) {
            case 'CdLanguage':
            case 'DescLanguage':
                obj[field] = e.target.value;
                break;
            default:
                break
        }

        this.setState({ obj });
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

                        <Input value={obj.CdLanguage} placeholder="Code"
                            disabled={actionType !== DM_ADD_ACTION_TYPE}
                            onChange={e => this.handleFieldChange(e, 'CdLanguage')} />
                        :
                        <div>{obj.CdLanguage}</div>
                    }
                </FormItem>
                <FormItem
                    label="Language"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <Input value={obj.DescLanguage} placeholder="Language" onChange={e => this.handleFieldChange(e, 'DescLanguage')} />
                        :
                        <div>{obj.DescLanguage}</div>
                    }
                </FormItem>
            </Form>
        );
    }

    render() {
        const { title, footer } =
            getModalSettings(this.state.actionType, this.handleOk, this.handleCancel, 'Language');

        return (
            <div>
                <DMTable title={'Languages'}
                    tableData={data}
                    columns={this.columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='CdLanguage'

                    searchField='DescLanguage'

                    showModal={this.state.showModal}
                    showDeleteModal={this.state.showDeleteModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    modalTitle={title}
                    footer={footer}
                    width={'600px'}
                    renderModalFields={this.renderModalFields}
                >

                </DMTable>
            </div>
        )
    }
}

export default Languages;