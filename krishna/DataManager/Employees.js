import React, { Component } from 'react';

import { Form, Input, Row, Col, Checkbox, Select, DatePicker } from 'antd';
import moment from 'moment';

import DMTable from './DMTable';
import data from '../../mocks/EmployeesList.json';
import cETemplate from '../../mocks/createEmployeetemplate.json';

import {
    getModalSettings,
    DM_ADD_ACTION_TYPE,
    DM_DELETE_ACTION_TYPE,
    DM_EDIT_ACTION_TYPE,
    DM_DETAILS_ACTION_TYPE
} from './DMTableFns';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};

const defaultObj = {
    Empid: -1,
    UserID: '',
    LastName: '',
    FirstName: '',
    ShortID: '',
    MiddleName: '',
    NameSuffix: '',
    OfficeID: '',
    DateUpdated: null,
    LastUpdBy: null,
    Classification: '',
    EmployeeClass: '',
    DateTerminated: null,
    LoanFlag: false,
    TransferFlag: false,
    TransferOffice: null,
    TransferDate: null,
    LoanOffice: null,
    LoanStart: null,
    LoanEnd: null,
    OfficeList: null,
    ClassificationList: null,
    ClassList: null
}

class Employees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data,
            showModal: false,
            obj: {}
        };

        this.columns = [
            {
                title: 'User ID',
                dataIndex: 'UserID',
                key: 'UserID',
                width: '15%',
                render: (u, obj) =>
                    <a onClick={e => this.handleShowModal(e, DM_DETAILS_ACTION_TYPE, obj)}
                        style={{ textDecoration: 'underline', color: '#40a9ff' }}>
                        {u}
                    </a>
            },
            {
                title: 'Last Name',
                dataIndex: 'LastName',
                key: 'LastName',
            },
            {
                title: 'First Name',
                dataIndex: 'FirstName',
                key: 'FirstName'
            }
        ];

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.renderModalFields = this.renderModalFields.bind(this);
    }

    handleShowModal(e, actype, obj) {
        if (actype !== DM_ADD_ACTION_TYPE) {
            if (obj) {
                // the next line is data from the json.... 
                this.setState({ obj: { ...data.find(d => d.UserID === obj.UserID) } });

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
        debugger
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
            case 'UserID':
            case 'Empid':
            case 'LastName':
            case 'FirstName':
            case 'MiddleName':
            case 'NameSuffix':
                obj[field] = e.target.value;
                break;

            case 'TransferFlag':
            case 'LoanFlag':
                obj[field] = e.target.checked;
                break;

            case 'OfficeID':
            case 'Classification':
            case 'TransferOffice':
            case 'LoanOffice':
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
            <Form layout={'vertical'}>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="User ID"
                        >
                            {isEditable ?
                                <Input value={obj.UserID} placeholder="User ID" onChange={e => this.handleFieldChange(e, 'UserID')} />
                                :
                                <div>{obj.UserID}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Employee ID"
                        >
                            {isEditable ?
                                <Input value={obj.Empid} placeholder="Employee ID" onChange={e => this.handleFieldChange(e, 'Empid')} />
                                :
                                <div>{obj.Empid}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="First Name"
                        >
                            {isEditable ?
                                <Input value={obj.FirstName} placeholder="First Name" onChange={e => this.handleFieldChange(e, 'FirstName')} />
                                :
                                <div>{obj.FirstName}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Middle Initial"
                        >
                            {isEditable ?
                                <Input value={obj.MiddleName} placeholder="Middle Initial" onChange={e => this.handleFieldChange(e, 'MiddleName')} />
                                :
                                <div>{obj.MiddleName}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Last Name"
                        >
                            {isEditable ?
                                <Input value={obj.LastName} placeholder="Last Name" onChange={e => this.handleFieldChange(e, 'LastName')} />
                                :
                                <div>{obj.LastName}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Suffix"
                        >
                            {isEditable ?
                                <Input value={obj.NameSuffix} placeholder="Suffix" onChange={e => this.handleFieldChange(e, 'NameSuffix')} />
                                :
                                <div>{obj.NameSuffix}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Office ID"
                        >
                            {isEditable ?
                                <Select onChange={e => this.handleFieldChange(e, 'OfficeID')} value={obj.OfficeID}
                                    showArrow={true} size={"default"}>
                                    {cETemplate.OfficeList.map(off => <Option key={off.Value} value={off.Value}>{off.Text}</Option>)}
                                </Select>
                                :
                                <div>{obj.OfficeID && cETemplate.OfficeList.find(off => off.Value === obj.OfficeID).Text}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Classification"
                        >
                            {isEditable ?
                                <Select onChange={e => this.handleFieldChange(e, 'Classification')} value={obj.Classification}
                                    showArrow={true} size={"default"}>
                                    {cETemplate.ClassificationList.map(off => <Option key={off.Value} value={off.Value}>{off.Text}</Option>)}
                                </Select>
                                :
                                <div>{obj.Classification && cETemplate.ClassificationList.find(off => off.Value === obj.Classification).Text}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="End Access Effective Date"
                        >
                            {isEditable ?
                                <DatePicker placeholder="End Access Effective Date"
                                    value={obj.DateTerminated ? moment(new Date(obj.DateTerminated)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'DateTerminated') }} />
                                :
                                <div>{obj.DateTerminated}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <hr />
                <Row>
                    <Col span={12}>
                        <Checkbox checked={obj.TransferFlag}
                            onChange={e => this.handleFieldChange(e, 'TransferFlag')}
                            disabled={!isEditable}
                        >
                            Transfer
                        </Checkbox>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Transfer Office"
                        >
                            {isEditable ?
                                <Select onChange={e => this.handleFieldChange(e, 'TransferOffice')} value={obj.TransferOffice}
                                    showArrow={true} size={"default"}>
                                    {cETemplate.OfficeList.map(off => <Option key={off.Value} value={off.Value}>{off.Text}</Option>)}
                                </Select>
                                :
                                <div>{obj.TransferOffice && cETemplate.OfficeList.find(off => off.Value === obj.TransferOffice).Text}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Transfer Date"
                        >
                            {isEditable ?
                                <DatePicker placeholder="Transfer Date"
                                    value={obj.TransferDate ? moment(new Date(obj.TransferDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'TransferDate') }} />
                                :
                                <div>{obj.TransferDate}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col span={12}>
                        <Checkbox checked={obj.LoanFlag}
                            onChange={e => this.handleFieldChange(e, 'LoanFlag')}
                            disabled={!isEditable}
                        >
                            Loan
                        </Checkbox>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Loan Office"
                        >
                            {isEditable ?
                                <Select onChange={e => this.handleFieldChange(e, 'LoanOffice')} value={obj.LoanOffice}
                                    showArrow={true} size={"default"}>
                                    {cETemplate.OfficeList.map(off => <Option key={off.Value} value={off.Value}>{off.Text}</Option>)}
                                </Select>
                                :
                                <div>{obj.LoanOffice && cETemplate.OfficeList.find(off => off.Value === obj.LoanOffice).Text}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Loan Start Date"
                        >
                            {isEditable ?
                                <DatePicker placeholder="Loan Start Date"
                                    value={obj.LoanStart ? moment(new Date(obj.LoanStart)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'LoanStart') }} />
                                :
                                <div>{obj.LoanStart}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Loan End Date"
                        >
                            {isEditable ?
                                <DatePicker placeholder="Loan End Date"
                                    value={obj.LoanEnd ? moment(new Date(obj.LoanEnd)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'LoanEnd') }} />
                                :
                                <div>{obj.LoanEnd}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
            </Form >
        );
    }

    render() {
        const { title, footer } =
            getModalSettings(this.state.actionType, this.handleOk, this.handleCancel, 'Employee');

        return (
            <div>
                <DMTable title={'Employees'}
                    tableData={data}
                    columns={this.columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='UserID'

                    // Use multiple field Names for searching on those fields...
                    searchField={['LastName', 'FirstName']}

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

export default Employees;