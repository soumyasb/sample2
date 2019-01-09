import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Select, Checkbox } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import moment from 'moment';

import './me.css';

import data from '../mocks/DuesInitData.json';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const defaultObj = {
    LoginId: '',
    NetName: '',
    RequestorCode: '',
    Operator: '',
    DLNumber: '',
    ThreeCharacterLastName: '',
    BirthDate: '',
    AuthSect1: '',
    AuthSect2: '',
    Reason: '',
    EffectiveDate: '',
    MailDate: '',
    CoFo: '',
    OrigAuthSect: '',
    OrigEffectiveDate: '',
    UpdateCopies: '',
    ViolationDate: '',
    FieldFile: '',
    CountyCode: '',
    OutOfStateDLNo: '',
    OutOfStateCd: '',
    CommercialStatusIndicator: '',
    HearingType: '',
    HearingDate: '',
    DSFieldOffice: '',
    HearingResult: '',
    ModifiedHearingDate: '',
    DUEResponse: '',
    NextDLNumber: '',
    Error: true
};

const getDropDownItems = data => data.map(item => <Option key={item.Value} value={item.Value}> {item.Value && `${item.Value} - `}{item.Text}</Option>);

class DUES extends Component {
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
    }

    handleFieldChange(e, field) {
        const { obj } = this.state;

        switch (field) {
            case 'DLNumber':
                obj[field] = e.target.value;
                break;
            case 'OutOfStateDLNo':
                if (e.target.value.length <= 25) {
                    obj[field] = e.target.value;
                }
                break;
            case 'ThreeCharacterLastName':
            case 'nextTran':
            case 'DSFieldOffice':
                if (e.target.value.length <= 3) {
                    obj[field] = e.target.value;
                }
                break;
            case 'CountyCode':
                const val = e.target.value;
                if (val === '' || (val > 0 && val <= 58) || val === 60) {
                    obj[field] = val;
                }
                break;
            case 'AuthSect1':
            case 'AuthSect2':
            case 'Reason':
            case 'CoFo':
            case 'UpdateCopies':
            case 'OrigAuthSect':
            case 'CommercialStatusIndicator':
            case 'HearingResult':
            case 'HearingType':
            case 'FieldFile':
            case 'OutOfStateCd':
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
                        <Col span={6} style={{ display: 'block' }}>
                            <FormItem
                                label="DL # : "
                            >
                                <Input value={obj.DLNumber} placeholder="DL Number" onChange={e => this.handleFieldChange(e, 'DLNumber')} />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="3 Pos Last Name : "
                            >
                                <Input value={obj.ThreeCharacterLastName} placeholder="3 Pos Last Name" onChange={e => this.handleFieldChange(e, 'ThreeCharacterLastName')} />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1} style={{ height: 'inherit', height: '39px' }} >
                            <FormItem
                                label="Birth Date : "
                            >
                                <DatePicker placeholder="Birth Date"
                                    value={obj.BirthDate ? moment(new Date(obj.BirthDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'BirthDate') }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <FormItem
                                label="Authority Section : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'AuthSect1')}
                                    value={obj.AuthSect1} showArrow={true} size={"default"}
                                >
                                    {getDropDownItems(data.FirstAuthoritySection)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={10} offset={1}>
                            <FormItem
                                label="Second Authority Section : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'AuthSect2')}
                                    value={obj.AuthSect2} showArrow={true} size={"default"}
                                >
                                    {getDropDownItems(data.SecondAuthoritySection)}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="Reason : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'Reason')}
                                    value={obj.Reason} showArrow={true} size={"default"}
                                >
                                    {getDropDownItems(data.Reasons)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={9} offset={1}>
                            <FormItem
                                label="Co / Fo : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'CoFo')}
                                    value={obj.CoFo} showArrow={true} size={"default"}
                                >
                                    {getDropDownItems(data.CoFo)}
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
                                    value={obj.EffectiveDate ? moment(new Date(obj.EffectiveDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'EffectiveDate') }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="Mail Date : "
                            >
                                <DatePicker placeholder="Mail Date"
                                    value={obj.MailDate ? moment(new Date(obj.MailDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'MailDate') }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="Orig Effec Date : "
                            >
                                <DatePicker placeholder="Orig Effec Date"
                                    value={obj.OrigEffectiveDate ? moment(new Date(obj.OrigEffectiveDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'OrigEffectiveDate') }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="Orig Auth Section : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'OrigAuthSect')}
                                    value={obj.OrigAuthSect} showArrow={true} size={"default"}
                                >
                                    {getDropDownItems(data.OriginalAuthoritySection)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8} offset={1}>
                            <FormItem
                                label="Update Copies : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'UpdateCopies')}
                                    value={obj.UpdateCopies} showArrow={true} size={"default"}
                                >
                                    {data.UpdateCopies.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="Violation Date : "
                            >
                                <DatePicker placeholder="Violation Date"
                                    value={obj.ViolationDate ? moment(new Date(obj.ViolationDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'ViolationDate') }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="Field File : "
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'FieldFile')}
                                    value={obj.FieldFile} showArrow={true} size={"default"}
                                >
                                    {getDropDownItems(data.FieldFile)}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label="County Code : "
                            >
                                <Input value={obj.CountyCode} placeholder="County Code" onChange={e => this.handleFieldChange(e, 'CountyCode')} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                <Row>
                                    <Col>
                                        <h4>Out-of-State-Data</h4>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={11}>
                                        <FormItem label="O / S DL # : ">
                                            <Input placeholder="O / S DL #" value={obj.OutOfStateDLNo}
                                                onChange={e => this.handleFieldChange(e, 'OutOfStateDLNo')} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} offset={1}>
                                        <FormItem label="O / S Code : ">
                                            <Select onChange={e => this.handleFieldChange(e, 'OutOfStateCd')}
                                                value={obj.OutOfStateCd} showArrow={true} size={"default"}
                                            >
                                                {getDropDownItems(data.OSCode)}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={8} offset={1}>
                            <FormItem label="Commercial Status Ind : ">
                                <Select onChange={e => this.handleFieldChange(e, 'CommercialStatusIndicator')}
                                    value={obj.CommercialStatusIndicator} showArrow={true} size={"default"}
                                >
                                    {getDropDownItems(data.CommStatusIndicator)}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <br />
                    <div style={{ width: '80%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                        <Row>
                            <Col>
                                <h4>Hearing Information</h4>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <FormItem label="Type : ">
                                    <Select onChange={e => this.handleFieldChange(e, 'HearingType')}
                                        value={obj.HearingType} showArrow={true} size={"default"}
                                    >
                                        {getDropDownItems(data.ChgHearingType)}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    label="Date : "
                                >
                                    <DatePicker placeholder="Date"
                                        value={obj.HearingDate ? moment(new Date(obj.HearingDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'HearingDate') }}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem label="Location : ">
                                    <Input placeholder="Location" value={obj.DSFieldOffice}
                                        onChange={e => this.handleFieldChange(e, 'DSFieldOffice')} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="Result : ">
                                    <Select onChange={e => this.handleFieldChange(e, 'HearingResult')}
                                        value={obj.HearingResult} showArrow={true} size={"default"}
                                    >
                                        {getDropDownItems(data.HearingResults)}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    label="Mod Date : "
                                >
                                    <DatePicker placeholder="Mod Date"
                                        value={obj.ModifiedHearingDate ? moment(new Date(obj.ModifiedHearingDate)) : ''}
                                        onChange={(d, ds) => { this.onDateChange(d, ds, 'ModifiedHearingDate') }}
                                    />
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
            </ScrollPanel >);
    }
}

export default DUES; 