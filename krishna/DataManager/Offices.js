import React, { Component } from 'react';

import { Icon, Form, Input, Checkbox, DatePicker, Select, Row, Col } from 'antd';
import moment from 'moment';

import DMTable from './DMTable';
import data from '../../mocks/GetAllOffices.json';
import createOffice from '../../mocks/GetOfficeCreateJson.json';

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
    OfficeID: "",
    Name: "",
    AddressLineOne: "",
    City: "",
    Zip: "",
    Zip4: "",
    PhoneNumber: "",
    DistrictID: "",
    EffectiveDate: "",
    NameAbbriv: "",
    FieldFileDsg: "",
    RequestorCode: "",
    FaxNumber: "",
    TerminationDate: ""
}

class Offices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data,
            showModal: false,
            obj: {},
        };

        this.columns = [
            {
                title: 'Name',
                dataIndex: 'Name',
                key: 'Name',
                width: '25%',
                // Remove the below line.. if you want to add the details icon.. 
                render: (n, obj) => {
                    debugger

                    return <a onClick={e => this.handleShowModal(e, DM_DETAILS_ACTION_TYPE, obj)}
                        style={{ textDecoration: 'underline', color: '#40a9ff' }}>
                        {n}
                    </a>
                }
            },
            {
                title: 'Office RU',
                dataIndex: 'OfficeID',
                key: 'OfficeID'
            },
            {
                title: 'Address',
                dataIndex: 'AddressLineOne',
                key: 'AddressLineOne'
            },
            {
                title: 'City',
                dataIndex: 'City',
                key: 'City'
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
                // the next line is fetching data from the json....
                this.setState({ obj: { ...data.find(d => d.OfficeID === obj.OfficeID) } });

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
            case 'OfficeID':
            case 'Name':
            case 'AddressLineOne':
            case 'City':
            case 'Zip':
            case 'Zip4':
            case 'AddressLineOne':
            case 'NameAbbriv':
            case 'FieldFileDsg':
            case 'PhoneNumber':
            case 'FaxNumber':
            case 'RequestorCode':
                obj[field] = e.target.value;
                break;
            case 'DistrictID':
                obj[field] = e;
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
                <Row>
                    <Col span={4}>
                        <FormItem
                            label="Office RU"
                        >
                            {isEditable ?
                                <Input value={obj.OfficeID} placeholder="Office RU" onChange={e => this.handleFieldChange(e, 'OfficeID')} />
                                :
                                <div>{obj.OfficeID}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Office Name"
                        >
                            {isEditable ?
                                <Input value={obj.Name} placeholder="Office Name" onChange={e => this.handleFieldChange(e, 'Name')} />
                                :
                                <div>{obj.Name}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Address"
                        >
                            {isEditable ?
                                <Input value={obj.AddressLineOne} placeholder="Address" onChange={e => this.handleFieldChange(e, 'AddressLineOne')} />
                                :
                                <div>{obj.AddressLineOne}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="City"
                        >
                            {isEditable ?
                                <Input value={obj.City} placeholder="City" onChange={e => this.handleFieldChange(e, 'City')} />
                                :
                                <div>{obj.City}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <FormItem
                            label="Zip"
                        >
                            {isEditable ?
                                <Input value={obj.Zip} placeholder="Zip" onChange={e => this.handleFieldChange(e, 'Zip')} />
                                :
                                <div>{obj.Zip}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}>
                        <FormItem
                            label="Zip 4"
                        >
                            {isEditable ?
                                <Input value={obj.Zip4} placeholder="Zip 4" onChange={e => this.handleFieldChange(e, 'Zip4')} />
                                :
                                <div>{obj.Zip4}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="District ID"
                        >
                            {isEditable ?
                                <Select value={obj.DistrictID} placeholder="DistrictID" onChange={e => this.handleFieldChange(e, 'DistrictID')} >
                                    {createOffice.districtOfficeList.map(off => <Option key={off.Value} value={off.Value}>{off.Text}</Option>)}
                                </Select>
                                :
                                <div>{obj.DistrictID && createOffice.districtOfficeList.find(off => off.Value === obj.OfficeID).Text}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <FormItem
                            label="Office ID"
                        >
                            {isEditable ?
                                <Input value={obj.NameAbbriv} placeholder="Office ID" onChange={e => this.handleFieldChange(e, 'NameAbbriv')} />
                                :
                                <div>{obj.NameAbbriv}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}>
                        <FormItem
                            label={<b>Field File Abbr</b>}
                        >
                            {isEditable ?
                                <Input value={obj.FieldFileDsg} placeholder="Field File Abbr" onChange={e => this.handleFieldChange(e, 'FieldFileDsg')} />
                                :
                                <div>{obj.FieldFileDsg}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Effective Date"
                        >
                            {isEditable ?
                                <DatePicker placeholder="Effective Date"
                                    value={obj.EffectiveDate ? moment(new Date(obj.EffectiveDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'EffectiveDate') }} />
                                :
                                <div>{obj.EffectiveDate}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Phone Number"
                        >
                            {isEditable ?
                                <Input value={obj.PhoneNumber} placeholder="Phone Number" onChange={e => this.handleFieldChange(e, 'PhoneNumber')} />
                                :
                                <div>{obj.PhoneNumber}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Termination Date"
                        >
                            {isEditable ?
                                <DatePicker placeholder="Termination Date"
                                    value={obj.TerminationDate ? moment(new Date(obj.TerminationDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'TerminationDate') }} />
                                :
                                <div>{obj.TerminationDate}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <FormItem
                            label="Fax Number"
                        >
                            {isEditable ?
                                <Input value={obj.FaxNumber} placeholder="Fax Number" onChange={e => this.handleFieldChange(e, 'FaxNumber')} />
                                :
                                <div>{obj.FaxNumber}</div>
                            }
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <FormItem
                            label="Requestor Code"
                        >
                            {isEditable ?
                                <Input value={obj.RequestorCode} placeholder="Requestor Code" onChange={e => this.handleFieldChange(e, 'RequestorCode')} />
                                :
                                <div>{obj.RequestorCode}</div>
                            }
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const { title, footer } =
            getModalSettings(this.state.actionType, this.handleOk, this.handleCancel, 'Office');

        return (
            <div>
                <DMTable title={'Offices'}
                    tableData={data}
                    columns={this.columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='OfficeID'

                    searchField={['Name', 'OfficeID', 'AddressLineOne', 'City']}

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

export default Offices;