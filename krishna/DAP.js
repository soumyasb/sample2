import React, { Component } from 'react';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { Row, Col, Card, Input, InputNumber, DatePicker, Radio, Select, Button, Modal } from 'antd';
import moment from 'moment';
import DAPInitData from '../mocks/DAPInitData.json';

const RadioGroup = Radio.Group;
const { Option } = Select;

const defaultDAPObj = {
    RequestorCode: '86301',
    Operator: 'MPG',
    NetName: '#ADMV6LI',
    LoginId: 'MWMPG4',
    DLNumber: 'I0000000',
    ThreeCharacterName: 'VIN',
    Birthdate: '06-27-1978',
    DSUserFieldOffice: 'SAC',
    APSType: '',
    arrestDate: null,
    APSTestType: '',
    UpdateCopies: '',
    VOPType: '',
    VOPTestType: '',
    lawEnforcementAgency: '',
    courtCode: '',
    baC1: '',
    baC2: '',
    lawEnforcementCaseNo: '',
    dsFieldOffice: '',
    vopbaC1: '',
    vopbaC2: '',
    outOfStateDLNo: '',
    outOfStateCd: '',
    commercialStatusIndicator: '',
    effectiveDate: '',
    mailDate: '',
    pasOrigAuthSect: '',
    origEffectiveDate: '',
    EndStay: '',
    vopOrigAuthSect: '',
    hearingDate: '',
    hearingResult: '',
    hearingType: '',
    modifiedHearingDate: '',
    corrArrestDate: '',
    CoFo: '',
    diffServDate: '',
    LicenseLocation: '',
    creditDays: '',
    dapResponse: '',
    darResponse: '',
    dasResponse: '',
    nextDLNumber: '',
    error: true
}

const getDropdownList = (listObj, selectedValue) => {
    let list = [];

    listObj.map(item => {
        if (item.Value !== "") {
            if (item.Value === selectedValue) {
                list.push(<Option key={item.Value} value={item.Value} selected>{item.Text}</Option>)
            }
            else {
                list.push(<Option key={item.Value} value={item.Value}>{item.Text}</Option>)
            }
        }
    });
    return list;

}

class DAP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dapObj: defaultDAPObj,
            errorMessage: '',
            errorModalShow: false
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleFieldChange(e, type) {
        const { dapObj } = this.state;
        let errorMessage = '', errorModalShow = false;
        debugger
        switch (type) {
            case 'APSType':
                dapObj[type] = e.target.value;
                if (e.target.value === 'R') dapObj['APSTestType'] = 'RE';
                else dapObj['APSTestType'] = '';
                break;
            case 'VOPType':
                dapObj[type] = e.target.value;
                if (e.target.value === 'R') dapObj['VOPTestType'] = 'RE';
                else dapObj['VOPTestType'] = '';
                break;
            case 'baC1':
            case 'baC2':
            case 'vopbaC1':
            case 'vopbaC2':
                if (e) {
                    if (e / 100 < 0 || e / 100 > 0.6) {
                        errorMessage = 'Invalid BAC Value';
                        errorModalShow = true;
                        dapObj[type] = '';
                        this.setState({ errorMessage, errorModalShow });
                    }
                    else {
                        dapObj[type] = e;
                    }
                }
                break;
            case 'courtCode':
            case 'APSTestType':
            case 'UpdateCopies':
            case 'VOPTestType':
            case 'commercialStatusIndicator':
            case 'OSCode':
            case 'pasOrigAuthSect':
            case 'vopOrigAuthSect':
            case 'EndStay':
            case 'hearingResult':
            case 'hearingType':
            case 'CoFo':
            case 'LicenseLocation':
            case 'creditDays':
            case 'dsFieldOffice':
                dapObj[type] = e;
                break;
            case 'ThreeCharacterName':
            case 'outOfStateCd':
            case 'nextDLNumber':
                dapObj[type] = e.target.value;
                break;
            case 'outOfStateDLNo':
            case 'lawEnforcementAgency':
                if (e.target.value.length <= 25) {
                    dapObj[type] = e.target.value;
                }
                break;
            case 'lawEnforcementCaseNo':
                if (e.target.value.length <= 13) {
                    dapObj[type] = e.target.value;
                }
                break;
            default:
                break;
        }
        debugger
        this.setState({ dapObj });
    }

    onDateChange(d, ds, type) {
        debugger
        const { dapObj } = this.state;
        dapObj[type] = ds || moment(new Date());

        this.setState({ dapObj });
    }

    handleModalClose() {
        this.setState({ errorModalShow: false, errorMessage: '' });
    }

    render() {
        const {
            RequestorCode, Operator, NetName, LoginId, DLNumber, ThreeCharacterName, Birthdate, DSUserFieldOffice,
            APSType, arrestDate, APSTestType, UpdateCopies, VOPType, VOPTestType,
            lawEnforcementAgency, courtCode, baC1, baC2, lawEnforcementCaseNo, dsFieldOffice, vopbaC1, vopbaC2, outOfStateDLNo, outOfStateCd,
            commercialStatusIndicator, effectiveDate, mailDate, pasOrigAuthSect, origEffectiveDate, EndStay, vopOrigAuthSect,
            hearingDate, hearingResult, hearingType, modifiedHearingDate, corrArrestDate, CoFo, diffServDate, LicenseLocation,
            creditDays, dapResponse, darResponse, dasResponse, nextDLNumber, error
        } = this.state.dapObj;

        const boxShadows = {
            boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
        };

        return (
            <ScrollPanel style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0)" }}>
                <Row>
                    <Col span={24}>
                        <Card
                            style={{
                                marginTop: "8px",
                                borderRadius: "16px",
                                ...boxShadows
                            }}
                        >
                            <Row>
                                <Col span={5}>
                                    <b>DL Number</b>: <br />{DLNumber}
                                </Col>
                                <Col span={1} />
                                <Col span={5}>
                                    <b>3 Pos Last Name</b>: <Input placeholder="3 Pos Last Name" value={ThreeCharacterName}
                                        onChange={e => this.handleFieldChange(e, 'ThreeCharacterName')} />
                                </Col>
                                <Col span={1} />
                                <Col span={6}>
                                    <b>Birth Date </b>: <br /><DatePicker placeholder="Birth Date"
                                        value={moment(new Date(Birthdate))} onChange={(d, ds) => { this.onDateChange(d, ds, 'Birthdate') }} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={5} style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                    <b>APS Type</b>: <br /><RadioGroup value={APSType} onChange={(e) => this.handleFieldChange(e, 'APSType')}>
                                        {DAPInitData.APSType.map((item) => <Radio key={`apsType-${item.Value}`} value={item.Value}>{item.Text}</Radio>)}
                                    </RadioGroup>
                                </Col>
                                <Col span={1} />
                                <Col span={5}>
                                    <b>Arrest / Det Date </b>: <br /><DatePicker placeholder="Arrest Date"
                                        value={moment(new Date(arrestDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'arrestDate') }} />
                                </Col>
                                <Col span={1} />
                                <Col span={5}>
                                    <b>APS Type of Test</b>: <Select onChange={e => this.handleFieldChange(e, 'APSTestType')} value={APSTestType}
                                        showArrow={true} size={"default"} style={{ width: '100%' }} disabled={APSType === 'R'}>
                                        {getDropdownList(DAPInitData.APSTestType)}
                                    </Select>
                                </Col>
                                <Col span={1} />
                                <Col span={5}>
                                    <b>Update Copies</b>: <Select onChange={e => this.handleFieldChange(e, 'UpdateCopies')} value={UpdateCopies}
                                        showArrow={true} size={"default"} style={{ width: '100%' }}>
                                        {getDropdownList(DAPInitData.UpdateCopies)}
                                    </Select>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={5} style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                    <b>VOP Type</b>: <br /><RadioGroup value={VOPType} onChange={e => this.handleFieldChange(e, 'VOPType')}>
                                        {DAPInitData.VOPType.map((item) => <Radio value={item.Value}>{item.Text}</Radio>)}
                                    </RadioGroup>
                                </Col>
                                <Col span={7} />
                                <Col span={5}>
                                    {VOPType !== 'N' && <div>
                                        <b>VOP Type of Test</b>: <Select onChange={e => this.handleFieldChange(e, 'VOPTestType')} value={VOPTestType}
                                            showArrow={true} size={"default"} style={{ width: '100%' }} disabled={VOPType === 'R'}>
                                            {getDropdownList(DAPInitData.VOPTestType)}
                                        </Select>
                                    </div>}
                                </Col>
                            </Row>
                            <br />
                            <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                <Row>
                                    <Col>
                                        <h3>Arrest Data</h3>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <b>LE Agency </b>: <Input placeholder="LE Agency" value={lawEnforcementAgency}
                                            onChange={e => this.handleFieldChange(e, 'lawEnforcementAgency')} />
                                    </Col>
                                    <Col span={1} />
                                    <Col span={5}>
                                        <b>Court # </b>: <Input placeholder="Court #" value={courtCode}
                                            onChange={e => this.handleFieldChange(e, 'courtCode')} />
                                    </Col>
                                    <Col span={1} />
                                    <Col span={6}>
                                        {APSType !== 'R' &&
                                            <div>
                                                <Row><b>BAC </b>: </Row>
                                                <Row>
                                                    <Col span={12}>
                                                        <InputNumber min={1} max={9999} value={baC1} style={{ width: '100%' }}
                                                            onChange={e => this.handleFieldChange(e, 'baC1')} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InputNumber min={1} max={9999} value={baC2} style={{ width: '100%' }}
                                                            onChange={e => this.handleFieldChange(e, 'baC2')} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={5}>
                                        <b>LE Case # </b>: <Input placeholder="LE Case #" value={lawEnforcementCaseNo}
                                            onChange={e => this.handleFieldChange(e, 'lawEnforcementCaseNo')} />
                                    </Col>
                                    <Col span={4} />
                                    <Col span={5}>
                                        <b>Location </b>: <Select onChange={e => this.handleFieldChange(e, 'dsFieldOffice')} value={dsFieldOffice}
                                            showArrow={true} size={"default"} style={{ width: '100%' }}>
                                            {getDropdownList(DAPInitData.DSFieldOffices)}
                                        </Select>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={6}>
                                        {VOPType === 'A' &&
                                            <div>
                                                <Row><b>VOP BAC </b>: </Row>
                                                <Row>
                                                    <Col span={12}>
                                                        <InputNumber min={1} max={9999} value={vopbaC1} style={{ width: '100%' }}
                                                            onChange={e => this.handleFieldChange(e, 'vopbaC1')} />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InputNumber min={1} max={9999} value={vopbaC2} style={{ width: '100%' }}
                                                            onChange={e => this.handleFieldChange(e, 'vopbaC2')} />
                                                    </Col>
                                                </Row>
                                            </div>}
                                    </Col>
                                </Row>
                                <br />
                                <div>
                                    <Row>
                                        <Col span={14} style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                            <Row>
                                                <Col>
                                                    <h4>Out-of-State-Data</h4>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={16}>
                                                    <b>O / S DL # </b>: <Input placeholder="O / S DL #" value={outOfStateDLNo}
                                                        onChange={e => this.handleFieldChange(e, 'outOfStateDLNo')} />
                                                </Col>
                                                <Col span={1} />
                                                <Col span={7}>
                                                    <b>O / S Code </b>: <Input placeholder="O / S Code" value={outOfStateCd}
                                                        onChange={e => this.handleFieldChange(e, 'outOfStateCd')} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={1} />
                                        <Col span={5}>
                                            <Row>
                                                <Col><h4>{''}</h4></Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <b>Commercial Status Indicator </b>: <Select onChange={e => this.handleFieldChange(e, 'commercialStatusIndicator')}
                                                        value={commercialStatusIndicator} showArrow={true} size={"default"} style={{ width: '100%' }}>
                                                        {getDropdownList(DAPInitData.CommStatusIndicator)}
                                                    </Select>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <br />
                            <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                <Row>
                                    <Col>
                                        <h3>End Stay / Re-impose</h3>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4}>
                                        <b>Effective Date </b>: <br /> <DatePicker placeholder="Effective Date"
                                            value={moment(new Date(effectiveDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'effectiveDate') }} />
                                    </Col>
                                    <Col span={1} />
                                    <Col span={4}>
                                        <b>Mail Date </b>: <br /> <DatePicker placeholder="Mail Date"
                                            value={moment(new Date(mailDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'mailDate') }} />

                                    </Col>
                                    <Col span={1} />
                                    <Col span={5}>
                                        <b>APS Original Authority Section </b>: <Select onChange={e => this.handleFieldChange(e, 'pasOrigAuthSect')}
                                            value={pasOrigAuthSect} showArrow={true} size={"default"} style={{ width: '100%' }}>
                                            {getDropdownList(DAPInitData.APSOriginalAuthoritySection)}
                                        </Select>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={4}>
                                        <b>Original Effective Date </b>: <br /> <DatePicker placeholder="Original Effective Date"
                                            value={moment(new Date(origEffectiveDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'origEffectiveDate') }} />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={5}>
                                        <b>End Stay </b>: <Select onChange={e => this.handleFieldChange(e, 'EndStay')} value={EndStay}
                                            showArrow={true} size={"default"} style={{ width: '100%' }}>
                                            {getDropdownList(DAPInitData.EndStay)}
                                        </Select>
                                    </Col>
                                    <Col span={5} />
                                    <Col span={5}>
                                        <b>VOP Original Authority Section </b>: <Select onChange={e => this.handleFieldChange(e, 'vopOrigAuthSect')}
                                            value={vopOrigAuthSect} showArrow={true} size={"default"} style={{ width: '100%' }}>
                                            {getDropdownList(DAPInitData.VOPOriginalAuthoritySection)}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                            <br />
                            <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                <Row>
                                    <Col>
                                        <h3>Hearing Information</h3>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4}>
                                        <b>Date </b>: <br /> <DatePicker placeholder="Hearing Date"
                                            value={moment(new Date(hearingDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'hearingDate') }} />
                                    </Col>
                                    <Col span={1} />
                                    <Col span={9}>
                                        <b>Result </b>: <Select onChange={e => this.handleFieldChange(e, 'hearingResult')} value={hearingResult}
                                            showArrow={true} size={"default"} style={{ width: '100%' }}>
                                            {getDropdownList(DAPInitData.HearingResults)}
                                        </Select>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={6}>
                                        <b>Chg Hearing Type </b>: <Select onChange={e => this.handleFieldChange(e, 'hearingType')} value={hearingType}
                                            showArrow={true} size={"default"} style={{ width: '100%' }}>
                                            {getDropdownList(DAPInitData.ChgHearingType)}
                                        </Select>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={4}>
                                        <b>Modified Hearing Date </b>: <br /> <DatePicker placeholder="Modified Hearing Date"
                                            value={moment(new Date(modifiedHearingDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'modifiedHearingDate') }} />
                                    </Col>
                                    <Col span={2} />
                                    <Col span={14}>
                                        {VOPType === 'A' && <span style={{ color: 'red', fontWeight: 'bold', verticalAlign: 'middle' }}> Please use DUW transaction to update Hearing Information. </span>}
                                    </Col>
                                </Row>
                            </div>
                            <br />
                            <Row>
                                <Col span={4}>
                                    <b>Correct Arr / Det Date </b>: <br /> <DatePicker placeholder="Correct Arr / Det Date"
                                        value={moment(new Date(corrArrestDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'corrArrestDate') }} />
                                </Col>
                                <Col span={1} />
                                <Col span={9}>
                                    <b>Co / Fo </b>: <Select onChange={e => this.handleFieldChange(e, 'CoFo')} value={CoFo} showArrow={true} size={"default"} style={{ width: '100%' }}>
                                        {getDropdownList(DAPInitData.CoFo)}
                                    </Select>
                                </Col>
                                <Col span={1} />
                                <Col span={4}>
                                    <b>Different Serv Date </b>: <br /> <DatePicker placeholder="Different Serv Date"
                                        value={moment(new Date(diffServDate || Date.now()))} onChange={(d, ds) => { this.onDateChange(d, ds, 'diffServDate') }} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={2} />
                                <Col span={5}>
                                    <b>License Location </b>: <Select onChange={e => this.handleFieldChange(e, 'LicenseLocation')}
                                        valye={LicenseLocation} showArrow={true} size={"default"} style={{ width: '100%' }}>
                                        {getDropdownList(DAPInitData.LicenseLocation)}
                                    </Select>
                                </Col>
                                <Col span={1} />
                                <Col span={5}>
                                    <b>Credit Days </b>: <InputNumber placeholder="Credit Days"
                                        min={1} max={9999} value={creditDays} style={{ width: '100%' }}
                                        onChange={e => this.handleFieldChange(e, 'creditDays')} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={2} />
                                <Col span={5}>
                                    <b>Next Trans </b>:  <Input placeholder="Next Trans" value={nextDLNumber}
                                        onChange={e => this.handleFieldChange(e, 'nextDLNumber')} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={6}>
                                    <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => { }}> + New DL </Button>
                                </Col>
                                <Col style={{ float: 'right' }}>
                                    <Button type="primary" onClick={() => { }}> Update </Button> {' '}
                                    <Button type="danger" onClick={() => { }}> Cancel </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Modal visible={this.state.errorModalShow}
                    title={'Error message'} closable={false}
                    footer={[
                        <div>
                            <Button type="primary" key="Ok" onClick={this.handleModalClose}>Ok</Button>
                        </div>
                    ]}
                >
                    {this.state.errorMessage}
                </Modal>
            </ScrollPanel >
        );
    }

}

export default DAP;