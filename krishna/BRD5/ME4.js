import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Select, Checkbox } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import moment from 'moment';

import './me.css';

import data from '../mocks/ME4Init.json';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const defaultObj = {
    loginId: '',
    netName: '',
    requestorCode: '',
    operator: '',
    dlNumber: '',
    threeCharacterLastName: '',
    status: '',
    statusMessage: '',
    medCertIssueDate: '',
    medCertExpireDate: '',
    examinerLicense: '',
    examinerState: '',
    medCertReceiptDate: '',
    purge: true,
    restr1: '',
    restr2: '',
    restr3: '',
    restr4: '',
    restr5: '',
    restr6: '',
    restr7: '',
    restr8: '',
    restr9: '',
    restr10: '',
    waiverType: '',
    waiverEffectiveDate: '',
    waiverExpirationDate: '',
    waiverRescindDate: '',
    speEffectiveDate: '',
    speExpirationDate: '',
    speCancelDate: '',
    examinerLastName: '',
    examinerFirstName: '',
    examinerMiddleName: '',
    examinerSuffix: '',
    examinerTitle: '',
    examinerPhoneNumber: '',
    nationalRegistry: '',
    mE4Response: '',
    nextTran: '',
    error: true
};

class ME4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: defaultObj
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleClearType = this.handleClearType.bind(this);
    }

    handleFieldChange(e, field) {
        const { obj } = this.state;

        switch (field) {
            case 'purge':
            case 'restr1':
            case 'restr2':
            case 'restr3':
            case 'restr4':
            case 'restr5':
            case 'restr6':
            case 'restr7':
            case 'restr8':
            case 'restr9':
            case 'restr10':
                obj[field] = e.target.checked;
                break;
            case 'dlNumber':
            case 'examinerLicense':
            case 'examinerPhoneNumber':
                obj[field] = e.target.value;
                break;
            case 'examinerFirstName':
            case 'examinerLastName':
                if ((/^[a-zA-Z-]*$/).test(e.target.value) && e.target.value.length <= 40) {
                    obj[field] = e.target.value;
                }
                break;
            case 'examinerMiddleName':
                if ((/^[a-zA-Z ]*$/).test(e.target.value) && e.target.value.length <= 35) {
                    obj[field] = e.target.value;
                }
                break;
            case 'examinerLicense':
            case 'nationalRegistry':
                if (e.target.value.length <= 14) {
                    obj[field] = e.target.value;
                }
                break;
            case 'threeCharacterLastName':
            case 'nextTran':
                if (e.target.value.length <= 3) {
                    obj[field] = e.target.value;
                }
                break;
            case 'examinerState':
            case 'waiverType':
            case 'examinerSuffix':
            case 'examinerTitle':
                obj[field] = e;
            default:
                break;
        }

        this.setState({ obj });
    }

    onDateChange(d, ds, type) {
        const { obj } = this.state;
        obj[type] = ds || '';//moment(new Date());

        this.setState({ obj });
    }

    handleAdd(e) {
        const { obj } = this.state;

        obj.status = 'I';

        // TODO - use the obj to add...
    }

    handleCancel(e) {

    }

    handleUpdate(e) {
        const { obj } = this.state;

        obj.status = 'I';

        // TODO - use the obj to edit...
    }

    handleClearType(e) {
        const { obj } = this.state;
        obj.waiverType = '';
        obj.waiverEffectiveDate = null;
        obj.waiverExpirationDate = null;
        obj.waiverRescindDate = null;

        this.setState({ obj });
    }

    render() {
        const { obj } = this.state;

        let status = 'Current Med Cert';
        if (obj.status === 'I') {
            status = 'Invalid Med Cert';
        } else if (obj.status === 'N') {
            status = 'Non Current Med Cert';
        }

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                <Form className="ant-advanced-search-form">
                    <Row>
                        <Col span={5} style={{ display: 'block' }}>
                            <FormItem
                                label="DL # : "

                            >
                                <Input value={obj.dlNumber} placeholder="DL Number" onChange={e => this.handleFieldChange(e, 'dlNumber')} />
                            </FormItem>
                        </Col>
                        <Col span={5} offset={1}>
                            <FormItem
                                label="3 Pos Last Name : "
                            >
                                <Input value={obj.threeCharacterLastName} placeholder="3 Pos Last Name" onChange={e => this.handleFieldChange(e, 'threeCharacterLastName')} />
                            </FormItem>
                        </Col>
                        <Col span={5} offset={1} style={{ height: 'inherit', height: '39px' }} >
                            <span style={{ color: 'blue', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                {`Status - ${status}`}
                            </span>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="Date of Exam/Med Cert Issue Date : "
                            >
                                <DatePicker placeholder="Date of Exam/Med Cert Issue Date"
                                    value={obj.medCertIssueDate ? moment(new Date(obj.medCertIssueDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'medCertIssueDate') }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="Med Cert Exp Date : "
                            >
                                <DatePicker placeholder="Med Cert Exp Date"
                                    value={obj.medCertExpireDate ? moment(new Date(obj.medCertExpireDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'medCertExpireDate') }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="Examiner License # : "
                            >
                                <Input value={obj.examinerLicense} placeholder="Examiner License #"
                                    onChange={e => this.handleFieldChange(e, 'examinerLicense')}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="State of Issue : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'examinerState')}
                                    value={obj.examinerState} showArrow={true} size={"default"}
                                >
                                    {data.States.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="Med Cert Receipt Date : "
                            >
                                <DatePicker placeholder="Med Cert Receipt Date"
                                    value={obj.medCertReceiptDate ? moment(new Date(obj.medCertReceiptDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'medCertReceiptDate') }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ width: '65%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px', textAlign: 'center' }}>
                        <Checkbox checked={obj.purge}
                            onChange={e => this.handleFieldChange(e, 'purge')}
                            placeholder="input placeholder">
                            PURGE THIS RECORD
                        </Checkbox>
                    </div>
                    <br />
                    <div style={{ width: '75%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                        <Row>
                            <Col>
                                <h3>Only Qualified When (MED CERT RESTRICTION CODES)</h3>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={15}>
                                <FormItem
                                    label="Restriction Codes : "
                                >
                                    <Select //onChange={e => this.handleFieldChange(e, '')}
                                        value={obj.waiverType} showArrow={true} size={"default"}
                                    >
                                        {data.RestrictionCodes.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Row>
                                    <Col span={6} offset={1}>
                                        <Checkbox checked={obj.restr1}
                                            onChange={e => this.handleFieldChange(e, 'restr1')}
                                            placeholder="input placeholder">
                                            1
                                    </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox checked={obj.restr2}
                                            onChange={e => this.handleFieldChange(e, 'restr2')}
                                            placeholder="input placeholder">
                                            2
                                    </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox checked={obj.restr3}
                                            onChange={e => this.handleFieldChange(e, 'restr3')}
                                            placeholder="input placeholder">
                                            3
                                    </Checkbox>
                                    </Col>
                                    <Col span={5}>
                                        <Checkbox checked={obj.restr4}
                                            onChange={e => this.handleFieldChange(e, 'restr4')}
                                            placeholder="input placeholder">
                                            4
                                    </Checkbox>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} offset={1}>
                                        <Checkbox checked={obj.restr5}
                                            onChange={e => this.handleFieldChange(e, 'restr5')}
                                            placeholder="input placeholder">
                                            5
                                    </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox checked={obj.restr6}
                                            onChange={e => this.handleFieldChange(e, 'restr6')}
                                            placeholder="input placeholder">
                                            6
                                    </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox checked={obj.restr7}
                                            onChange={e => this.handleFieldChange(e, 'restr7')}
                                            placeholder="input placeholder">
                                            7
                                    </Checkbox>
                                    </Col>
                                    <Col span={5}>
                                        <Checkbox checked={obj.restr8}
                                            onChange={e => this.handleFieldChange(e, 'restr8')}
                                            placeholder="input placeholder">
                                            8
                                    </Checkbox>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} offset={1}>
                                        <Checkbox checked={obj.restr9}
                                            onChange={e => this.handleFieldChange(e, 'restr9')}
                                            placeholder="input placeholder">
                                            9
                                    </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox checked={obj.restr10}
                                            onChange={e => this.handleFieldChange(e, 'restr10')}
                                            placeholder="input placeholder">
                                            10
                                    </Checkbox>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <div style={{ width: '75%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                        <Row>
                            <Col>
                                <h3>Waiver / Exemption</h3>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="Type : "
                                >
                                    <Select onChange={e => this.handleFieldChange(e, 'waiverType')}
                                        value={obj.waiverType} showArrow={true} size={"default"}
                                        disabled
                                    >
                                        {data.WaiverTypeSelect.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <Button type="primary" key="Clear Type"
                                    onClick={this.handleClearType}>
                                    Clear Type
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <FormItem
                                    label="Effective Date : "
                                >
                                    <DatePicker placeholder="Effective Date"
                                        value={obj.waiverEffectiveDate ? moment(new Date(obj.waiverEffectiveDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'waiverEffectiveDate') }}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    label="Expiration Date : "
                                >
                                    <DatePicker placeholder="Expiration Date"
                                        value={obj.waiverExpirationDate ? moment(new Date(obj.waiverExpirationDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'waiverExpirationDate') }}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    label="Rescind Date : "
                                >
                                    <DatePicker placeholder="Rescind Date"
                                        value={obj.waiverRescindDate ? moment(new Date(obj.waiverRescindDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'waiverRescindDate') }}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <div style={{ width: '75%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                        <Row>
                            <Col>
                                <h3>Skill Performance Evaluation (SPE)</h3>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <FormItem
                                    label="SPE Effective Date : "
                                >
                                    <DatePicker placeholder="SPE Effective Date"
                                        value={obj.speEffectiveDate ? moment(new Date(obj.speEffectiveDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'speEffectiveDate') }}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    label="SPE Expiration Date : "
                                >
                                    <DatePicker placeholder="SPE Expiration Date"
                                        value={obj.speExpirationDate ? moment(new Date(obj.speExpirationDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'speExpirationDate') }}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    label="SPE Cancel Date : "
                                >
                                    <DatePicker placeholder="SPE Cancel Date"
                                        value={obj.speCancelDate ? moment(new Date(obj.speCancelDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'speCancelDate') }}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <div style={{ width: '75%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                        <Row>
                            <Col>
                                <h3>Medical Examiner Information</h3>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <FormItem
                                    label="Examiner Last Name : "
                                >
                                    <Input value={obj.examinerLastName} placeholder="Examiner Last Name"
                                        onChange={e => this.handleFieldChange(e, 'examinerLastName')} />
                                </FormItem>
                            </Col>
                            <Col span={10} offset={1}>
                                <FormItem
                                    label="National Registry # : "
                                >
                                    <Input value={obj.nationalRegistry} placeholder="National Registry #"
                                        onChange={e => this.handleFieldChange(e, 'nationalRegistry')} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <FormItem
                                    label="Examiner First Name : "
                                >
                                    <Input value={obj.examinerFirstName} placeholder="Examiner First Name"
                                        onChange={e => this.handleFieldChange(e, 'examinerFirstName')} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <FormItem
                                    label="Examiner Middle Name : "
                                >
                                    <Input value={obj.examinerMiddleName} placeholder="Examiner Middle Name"
                                        onChange={e => this.handleFieldChange(e, 'examinerMiddleName')} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}>
                                <FormItem
                                    label="Examiner Suffix : "
                                >
                                    <Select onChange={e => this.handleFieldChange(e, 'examinerSuffix')}
                                        value={obj.examinerSuffix} showArrow={true} size={"default"}
                                    >
                                        {data.ExaminerSuffix.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={8} offset={1}>
                                <FormItem
                                    label="Examiner Title : "
                                >
                                    <Select onChange={e => this.handleFieldChange(e, 'examinerTitle')}
                                        value={obj.examinerTitle} showArrow={true} size={"default"}
                                    >
                                        {data.ExaminerTitle.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    label="Examiner Phone # : "
                                >
                                    <Input value={obj.examinerPhoneNumber} placeholder="Examiner Phone #"
                                        onChange={e => this.handleFieldChange(e, 'examinerPhoneNumber')} />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="Next Trans : "
                            >
                                <Input value={obj.nextTran} placeholder="Next Transaction" onChange={e => this.handleFieldChange(e, 'nextTran')} />
                            </FormItem>
                        </Col>
                        <Col span={13} style={{ float: 'right' }}>
                            <Button style={{ color: "white", backgroundColor: "green" }}
                                type="default" key="New DL" onClick={this.handleAdd}>New DL</Button> {' '}
                            <Button type="primary" key="Update" onClick={this.handleUpdate}>Update</Button> {' '}
                            <Button style={{ color: "white", backgroundColor: "red" }}
                                type="default" key="Cancel" onClick={this.handleCancel}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </ScrollPanel>);
    }
}

export default ME4; 