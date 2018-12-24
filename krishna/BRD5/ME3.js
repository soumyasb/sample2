import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Select } from 'antd';
import moment from 'moment';

import './me.css';

import data from '../mocks/ME3Init.json';

const FormItem = Form.Item;
const { Option } = Select;

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
    waiverType: '',
    waiverEffectiveDate: '',
    waiverExpirationDate: '',
    waiverRescindDate: '',
    speEffectiveDate: '',
    speExpirationDate: '',
    speCancelDate: '',
    mE3Response: '',
    nextTran: '',
    error: true
};

class ME3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: defaultObj
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleFieldChange(e, field) {
        const { obj } = this.state;

        switch (field) {
            case 'dlNumber':
            case 'examinerLicense':
                obj[field] = e.target.value;
                break;
            case 'examinerLicense':
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

    render() {
        const { obj } = this.state;

        let status = 'Current Med Cert';
        if (obj.status === 'I') {
            status = 'Invalid Med Cert';
        } else if (obj.status === 'N') {
            status = 'Non Current Med Cert';
        }

        return (
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
                    <Col span={10}>
                        <FormItem
                            label="Date of Exam/Med Cert Issue Date : "
                        >
                            <DatePicker placeholder="Date of Exam/Med Cert Issue Date"
                                value={obj.medCertIssueDate ? moment(new Date(obj.medCertIssueDate)) : ''}
                                onChange={(d, ds) => { this.onDateChange(d, ds, 'medCertIssueDate') }}
                                disabled
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
                                disabled
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="Examiner License # : "
                        >
                            <Input value={obj.examinerLicense} placeholder="Examiner License #"
                                onChange={e => this.handleFieldChange(e, 'examinerLicense')}
                                disabled
                            />
                        </FormItem>
                    </Col>
                    <Col span={8} offset={1}>
                        <FormItem
                            label="State of Issue : "
                        >
                            <Select onChange={e => this.handleFieldChange(e, 'examinerState')}
                                value={obj.examinerState} showArrow={true} size={"default"}
                                disabled
                            >
                                {/* TODO - use the list of stateofissue and loop the list to add the Options */}
                                {<Option key={-1} value={''}>{'-- Select --'}</Option>}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <br />
                <br />
                <span style={{ color: 'blue', fontWeight: 'bold', verticalAlign: 'middle', paddingLeft: '100px', fontSize: '1.2em' }}>
                    ENTER WAIVER / EXEMPTION OR SPE DATA
                </span>
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
                                >
                                    {data.WaiverTypeSelect.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                                </Select>
                            </FormItem>
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
                    </Row>
                    <Row>
                        <Col span={6}>
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
                        <Col span={8} offset={3}>
                            <FormItem
                                label="SPE Effective Date : "
                            >
                                <DatePicker placeholder="SPE Effective Date"
                                    value={obj.speEffectiveDate ? moment(new Date(obj.speEffectiveDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'speEffectiveDate') }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={3}>
                            <FormItem
                                label="SPE Expiration Date : "
                            >
                                <DatePicker placeholder="SPE Expiration Date"
                                    value={obj.speExpirationDate ? moment(new Date(obj.speExpirationDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'speExpirationDate') }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={3}>
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
        );
    }
}

export default ME3; 