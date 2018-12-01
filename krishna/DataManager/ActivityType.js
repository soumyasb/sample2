import React, { Component } from 'react';

import { Icon, Modal, Form, Input, Checkbox } from 'antd';

import DMTable from './DMTable';
import data from '../../mocks/GetAllActTypes.json';
import { getModalSettings } from './DMTableFns';
``
const FormItem = Form.Item;

const columns = [
    {
        title: 'Code',
        dataIndex: 'Code',
        key: 'Code'
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
        //render: t => t
    },
    {
        title: 'Confidential',
        dataIndex: 'Confidential',
        key: 'Confidential',
        render: c => c ? <Icon type="check" /> : <Icon type="close" />
    },
];

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class ActivityType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data,
            showModal: false,
            obj: {},
        };

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.renderModalFields = this.renderModalFields.bind(this);
    }

    handleShowModal(e, actype, id) {
        // if (actype !== 'create') {
        //     if (newsId) {
        //         if (actype === 'edit') {
        //             this.props.initEditNewsItemObj(newsId);
        //         }
        //         if (actype === 'details') {
        //             this.props.initNewsItemDetails(newsId);
        //         }
        //         if (actype === 'delete') {
        //             this.props.initNewsItemDetails(newsId);
        //         }
        //     }
        // }
        // else {
        //     this.props.initCreateNewsItemObj();
        // }

        this.setState({ obj: data.find(d => d.Code === id) });

        this.setState({
            actionType: actype,
            showModal: actype !== 'delete',
            showDeleteModal: actype === 'delete'
        });
    }

    handleCancel() {
        this.setState({ showModal: false, showDeleteModal: false });
    }

    handleOk() {
        // TODO 

        this.setState({ showModal: false });

        // TODO deleteModal display

    }

    renderModalFields() {
        const { actionType, obj } = this.state;

        return (
            <Form layout={'horizontal'}>
                <FormItem
                    label="Code"
                    {...formItemLayout}
                >
                    {actionType === 'create' || actionType === 'edit' ?
                        <Input value={obj.Code} placeholder="Code" onChange={() => { }} />
                        :
                        <div>{obj.Code}</div>
                    }
                </FormItem>
                <FormItem
                    label="Abbreviation"
                    {...formItemLayout}
                >
                    {actionType === 'create' || actionType === 'edit' ?
                        <Input value={obj.Abbr} placeholder="Abbreviation" onChange={() => { }} />
                        :
                        <div>{obj.Abbr}</div>
                    }
                </FormItem>
                <FormItem
                    label="Description"
                    {...formItemLayout}
                >
                    {actionType === 'create' || actionType === 'edit' ?
                        <Input value={obj.Description} placeholder="Description" onChange={() => { }} />
                        :
                        <div>{obj.Description}</div>
                    }
                </FormItem>
                <FormItem
                    label="End Effective Date"
                    {...formItemLayout}
                >
                    {actionType === 'create' || actionType === 'edit' ?
                        <Input value={obj.TermDate} placeholder="End Effective Date" onChange={() => { }} />
                        :
                        <div>{obj.TermDate}</div>
                    }
                </FormItem>
                <FormItem
                    label="Confidential"
                    {...formItemLayout}
                >
                    {actionType === 'create' || actionType === 'edit' ?
                        <Checkbox checked={obj.Confidential} onChange={this.onChecked} placeholder="input placeholder" />
                        :
                        <div>{obj.Confidential ? <Icon type="check" /> : <Icon type="close" />}</div>
                    }
                </FormItem>
            </Form>
        );
    }

    render() {
        const { title, okText, footer } =
            getModalSettings(this.state.actionType, this.handleOk, this.handleCancel, 'Activity Type');

        return (
            <div>
                <DMTable title={'Activity Type Maintenance'}
                    tableData={data}
                    columns={columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='Code'

                    showModal={this.state.showModal}
                    showDeleteModal={this.state.showDeleteModal}
                    handleOk={this.handleOk}
                    destroyOnClose={true}
                    handleCancel={this.handleCancel}
                    modalTitle={title}
                    okText={okText}
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