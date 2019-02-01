import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Radio, Select, Modal, Spin, Checkbox } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
// import {
//     getDUFData, saveDUFData,
// } from "../../../store/actions/dlUpdatesActions";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';
import './me.css';

import DUFInitData from '../mocks/DUFInit.json';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const dateFormat = "MM-DD-YYYY";

const defaultObj = {
    loginId: '',
    netName: '',
    requestorCode: '',
    operator: '',
    dlNumber: '',
    threeCharacterLastName: '',
    frNumber: '',
    stay: '',
    stayOptions: 'NA',
    authoritySection1: '',
    authoritySection2: '',
    authoritySection3: '',
    newEffectiveDate: '',
    originalEffectiveDate: '',
    originalHearingDate: '',
    updateCopies: '',
    outOfStateDLNo: '',
    outOfStateCd: '',
    commercialStatusIndicator: '',
    hearingType: '',
    hearingDate: '',
    hearingLocation: '',
    hearingResult: '',
    modDate: '',
    mailDate: '',
    coFo: '',
    proofBypass: true,
    accidentDate: '',
    accidentLocation: '',
    routeCode: '',
    insertParagraph: '',
    dufResponse: '',
    nextDLNumber: '',
    error: true
};

const dateFormatFunc = date => {
    const fdate = moment(date).format(dateFormat);
    if (fdate.includes('Invalid')) {
        return "";
    }
    else
        return fdate;
};

class DUFUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DLNumber: this.props.match.params.dlNumber,
            Obj: cloneDeep(defaultObj),
            DUFInitData,
            newEffectiveDate: '',
            originalEffectiveDate: '',
            originalHearingDate: '',
            modDate: '',
            mailDate: '',
            accidentDate: '',
            errorObj: {},
            ErrorMessage: '',
            ErrorModalShow: false
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
        // if (sessionStorage.getItem('dlInitData')) {
        //     const DLInitData = JSON.parse(sessionStorage.getItem('dlInitData'));
        //     this.setState({
        //         DLNumber: DLInitData.DLNumber,
        //         ThreeCharacterName: DLInitData.ThreeCharacterName,
        //         birthDate: DLInitData.Birthdate
        //     });
        //     //this.props.getDUFData(DLInitData.DLNumber);
        // }
        // else {
        //  //   this.props.history.push(`/dlUpdates`);
        // }
    }
    componentDidUpdate(prevProps) {

        // if (prevProps.dlUpdates.DUFInitData !== this.props.dlUpdates.DUFInitData && this.props.dlUpdates.DUFInitData !== undefined) {
        //     this.setState({ DUFInitData: this.props.dlUpdates.DUFInitData });
        // }
        // if (prevProps.dlUpdates.saveDUFData !== this.props.dlUpdates.saveDUFData && this.props.dlUpdates.saveDUFData !== undefined) {
        //     this.setState({ saveDUFData: this.props.dlUpdates.saveDUFData, openSuccessModal: true });
        // }
        // if (prevProps.dlUpdates.dlUpdatesErrorData !== this.props.dlUpdates.dlUpdatesErrorData) {
        //     let errors = [];
        //     Object.keys(this.props.dlUpdates.dlUpdatesErrorData).map((keyName, keyIndex) => {
        //         errors.push(this.props.dlUpdates.dlUpdatesErrorData[keyName][0]);
        //     })
        //     this.setState({ errorObj: this.props.dlUpdates.dlUpdatesErrorData, ErrorMessage: errors, ErrorModalShow: true });
        // }
    }

    static getDerivedStateFromProps(props, prevState) {

        // const { DUFInitData, saveDUFData, dlUpdatesErrorData } = props.dlUpdates;
        // if (DUFInitData && DUFInitData !== prevState.DUFInitData) {
        //     return { DUFInitData: DUFInitData, isloading: false };
        // }
        // if (saveDUFData && saveDUFData !== prevState.saveDUFData)
        //     return {
        //         saveDUFData: saveDUFData,
        //         isloading: false
        //     };
        // if (dlUpdatesErrorData && dlUpdatesErrorData !== prevState.dlUpdatesErrorData)
        //     return {
        //         errorObj: dlUpdatesErrorData,
        //         error: dlUpdatesErrorData,
        //         isloading: false
        //     };
        return null;
    }

    handleFieldChange(e, field) {
        const { Obj } = this.state;
        let ErrorMessage = '', ErrorModalShow = false;
        switch (field) {
            case 'DLNumber':
            case 'ThreeCharacterName':
                Obj[field] = e.target.value;
                if ((Obj['DLNumber'].length === 8)) {
                    //    this.setState({DLNumber: Obj['DLNumber']});
                    //   this.props.getDLInitialData(Obj['DLNumber']);
                    //this.props.getDUFData(Obj['DLNumber']);
                }
                break;
            case 'outOfStateDLNo':
                if (e.target.value.length <= 25) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'routeCode':
                if (e.target.value.match(/^[0-9]+$/)) {
                    if (e.target.value.length <= 4) {
                        Obj[field] = e.target.value;
                    }
                }
                break;
            case 'nextDLNumber':
                if (e.target.value.length <= 3) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'accidentLocation':
                if (e.target.value.length <= 13) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'hearingType':
            case 'hearingLocation':
            case 'hearingResult':
            case 'hearingReason':
            case 'authoritySection1':
            case 'authoritySection2':
            case 'authoritySection3':
            case 'updateCopies':
            case 'insertParagraph':
            case 'coFo':
            case 'outOfStateCd':
            case 'commercialStatusIndicator':
                Obj[field] = e;
                break;
            case 'stay':
            case 'stayOptions':
                if (field === 'stayOptions') {
                    Obj[field] = e.target.checked ? e.target.value : '';
                }
                else {
                    Obj[field] = e;
                }

                if (Obj.stay && Obj.stayOptions !== 'NA') {
                    if (Obj.stayOptions === 'Set') {
                        Obj.authoritySection1 = Obj.stay;
                        Obj.authoritySection2 = "";
                        Obj.authoritySection3 = "";
                    } else if (Obj.stayOptions === 'End') {
                        if (Obj.stay === "5") {
                            Obj.authoritySection1 = "16070";
                            Obj.authoritySection2 = "5";
                            Obj.authoritySection3 = "";
                        } else if (Obj.stay === "51") {
                            Obj.authoritySection1 = "16070";
                            Obj.authoritySection2 = "141055";
                            Obj.authoritySection3 = "5";
                        }
                    }
                } else {
                    Obj.stay = "";
                    Obj.authoritySection1 = "";
                    Obj.authoritySection2 = "";
                    Obj.authoritySection3 = "";
                }

                break;
            case 'proofBypass':
                Obj[field] = e.target.checked;
                break;
            default:
                break;
        }

        this.setState({ Obj });
    }

    onDateChange(d, ds, type) {
        const { Obj } = this.state;
        Obj[type] = ds || '';

        switch (type) {
            case 'newEffectiveDate':
                this.setState({ Obj: Obj, newEffectiveDate: d });
                break;
            case 'originalEffectiveDate':
                this.setState({ Obj: Obj, originalEffectiveDate: d });
                break;
            case 'originalHearingDate':
                this.setState({ Obj: Obj, originalHearingDate: d });
                break;
            case 'modDate':
                this.setState({ Obj: Obj, modDate: d });
                break;
            case 'mailDate':
                this.setState({ Obj: Obj, mailDate: d });
                break;
            case 'accidentDate':
                this.setState({ Obj: Obj, accidentDate: d });
                break;
            default:
                break;
        }
    }

    handleModalClose() {
        this.setState({ ErrorModalShow: false, ErrorMessage: '' });
    }

    handleUpdate(type) {
        if (type === 'new') {
            this.setState({ isNewDL: true });
            sessionStorage.removeItem('dlInitData');
        }

        const { Obj,
            newEffectiveDate,
            originalEffectiveDate,
            originalHearingDate,
            modDate,
            mailDate,
            accidentDate } = this.state;

        Obj['newEffectiveDate'] = dateFormatFunc(newEffectiveDate);
        Obj['originalEffectiveDate'] = dateFormatFunc(originalEffectiveDate);
        Obj['originalHearingDate'] = dateFormatFunc(originalHearingDate);
        Obj['modDate'] = dateFormatFunc(modDate);
        Obj['mailDate'] = dateFormatFunc(mailDate);
        Obj['accidentDate'] = dateFormatFunc(accidentDate);
        Obj['LoginId'] = this.state.DUFInitData.LoginId;
        Obj['DLNumber'] = this.state.DLNumber;
        Obj['ThreeCharacterLastName'] = this.state.ThreeCharacterName;

        this.setState({ isloading: true, DLNumber: Obj['DLNumber'] });
        // this.props.saveDUFData(Obj);
    }

    render() {
        const { Obj } = this.state;
        const { DUFInitData, saveDUFData, isNewDL, isloading } = this.state;

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                {isloading !== true ? <div style={{ backgroundColor: "white", height: '800px', width: "95%", marginLeft: '2%' }}>
                    {saveDUFData &&
                        <Modal title={"Update Status"} visible={this.state.openSuccessModal} onCancel={(e) => this.setState({ openSuccessModal: false })}
                            footer={[<Button type="primary" key="Ok" onClick={(e) => {
                                this.setState({ openSuccessModal: false });
                                if (isNewDL !== true) {
                                    this.props.history.push({
                                        pathname: `/dlUpdates`,
                                        state: { dlNumber: saveDUFData.DLNumber }
                                    })
                                }
                                if (isNewDL === true) {
                                    this.setState({
                                        Obj: cloneDeep(defaultObj),
                                        dueDate: "",
                                        changeToDate: "",
                                        errorObj: {},
                                        PhoneNumber: "",
                                        ErrorMessage: '',
                                        ErrorModalShow: false
                                    });
                                }
                                if (Obj.nextDLNumber !== '') {
                                    this.props.history.push({
                                        pathname: `/${Obj.nextDLNumber.toLowerCase()}Update/DLNumber/${this.state.DLNumber}`,
                                        state: { DLNumber: this.state.DLNumber, ThreeCharacterName: this.state.ThreeCharacterName, BirthDate: this.state.BirthDate }
                                    });
                                }
                            }}>OK</Button>]}
                        >
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: saveDUFData.DUFResponse.toString() }} />
                            </div>
                        </Modal>}
                    {DUFInitData ?
                        <div>
                            <h1>
                                <b>Financial Responsibility (DUF)</b>
                            </h1>
                            <Form className="ant-advanced-search-form">
                                {isNewDL ?
                                    <Row>
                                        <Col span={6} style={{ display: 'block' }}>
                                            <FormItem
                                                label={<b>DL # </b>}
                                            >
                                                <Input value={Obj.DLNumber} placeholder="DL Number" onChange={e => this.handleFieldChange(e, 'DLNumber')} />
                                            </FormItem>
                                        </Col>
                                        <Col span={8} offset={1}>
                                            <FormItem
                                                label={<b>3 Pos Last Name </b>}
                                            >
                                                <Input value={Obj.ThreeCharacterName} placeholder="3 Pos Last Name" onChange={e => this.handleFieldChange(e, 'ThreeCharacterName')} />
                                            </FormItem>
                                        </Col>
                                        <Col offset={1}>
                                            <FormItem
                                                label={<b>FR #</b>}
                                            >
                                                <Input value={Obj.frNumber} placeholder="FR#" onChange={e => this.handleFieldChange(e, 'frNumber')} />
                                            </FormItem>
                                        </Col>
                                    </Row> :
                                    <Row>
                                        <Col span={6}>
                                            <FormItem
                                                label={<b>DL #</b>}
                                            >
                                                {this.state.DLNumber}
                                            </FormItem>
                                        </Col>
                                        <Col span={8} offset={1}>
                                            <FormItem
                                                label={<b>3 Pos Last Name</b>}
                                            >
                                                {this.state.ThreeCharacterName}
                                            </FormItem>
                                        </Col>
                                        <Col offset={1}>
                                            <FormItem
                                                label={<b>FR #</b>}
                                            >
                                                {this.state.frNumber}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                }


                                <Row>
                                    <Col span={6}>
                                        <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                            <Row>
                                                <Col>
                                                    <h3>Stay</h3>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col offset={1}>
                                                    <RadioGroup value={Obj.stayOptions} onChange={e => this.handleFieldChange(e, 'stayOptions')}>
                                                        <Radio value={'NA'}>N/A</Radio>
                                                        <Radio value={'Set'}>Set</Radio>
                                                        <Radio value={'End'}>End</Radio>
                                                    </RadioGroup>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <FormItem
                                                    validateStatus={Obj.stay === '' && this.state.errorObj !== {} && this.state.errorObj["stay"] ? 'error' : ""}
                                                    help={Obj.stay === '' && this.state.errorObj !== {} && this.state.errorObj["stay"]}
                                                    label={''}
                                                >
                                                    <Select onChange={e => this.handleFieldChange(e, 'stay')}
                                                        value={Obj.stay} showArrow={true} size={"default"}
                                                        disabled={Obj.stayOptions === 'NA'}
                                                    >
                                                        {DUFInitData.Stay.map((item) => {
                                                            return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                        })}
                                                    </Select>
                                                </FormItem>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col span={16} offset={1}>
                                        <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                            <Row>
                                                <Col>
                                                    <h3>New Authority Section</h3>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <br /> <br />
                                            <Row>
                                                <Col span={8}>
                                                    <FormItem
                                                        validateStatus={Obj.authoritySection1 === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection1"] ? 'error' : ""}
                                                        help={Obj.authoritySection1 === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection1"]}
                                                        label={''}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'authoritySection1')}
                                                            value={Obj.authoritySection1} showArrow={true} size={"default"}
                                                        >
                                                            {DUFInitData.FirstAuthoritySection.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
                                                    <FormItem
                                                        validateStatus={Obj.authoritySection2 === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection2"] ? 'error' : ""}
                                                        help={Obj.authoritySection2 === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection2"]}
                                                        label={''}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'authoritySection2')}
                                                            value={Obj.authoritySection2} showArrow={true} size={"default"}
                                                        >
                                                            {DUFInitData.SecondAuthoritySection.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span={8}>
                                                    <FormItem
                                                        validateStatus={Obj.authoritySection3 === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection3"] ? 'error' : ""}
                                                        help={Obj.authoritySection3 === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection3"]}
                                                        label={''}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'authoritySection3')}
                                                            value={Obj.authoritySection3} showArrow={true} size={"default"}
                                                        >
                                                            {DUFInitData.ThirdAuthoritySection.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={5}>
                                        <FormItem
                                            validateStatus={this.state.newEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["newEffectiveDate"] ? 'error' : ""}
                                            help={this.state.newEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["newEffectiveDate"]}
                                            label={<b>New Effec Date </b>}
                                        >
                                            <DatePicker placeholder="New Effec Date"
                                                value={this.state.newEffectiveDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'newEffectiveDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={5} offset={1}>
                                        <FormItem
                                            validateStatus={this.state.originalEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["originalEffectiveDate"] ? 'error' : ""}
                                            help={this.state.originalEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["originalEffectiveDate"]}
                                            label={<b> Orig Effec Date </b>}
                                        >
                                            <DatePicker placeholder="Orig Effec Date"
                                                value={this.state.originalEffectiveDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'originalEffectiveDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={11} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.updateCopies === '' && this.state.errorObj !== {} && this.state.errorObj["updateCopies"] ? 'error' : ""}
                                            help={Obj.updateCopies === '' && this.state.errorObj !== {} && this.state.errorObj["updateCopies"]}
                                            label={<b> Update Copies </b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'updateCopies')}
                                                value={Obj.updateCopies} showArrow={true} size={"default"}
                                            >
                                                {DUFInitData.UpdateCopies.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={13}>
                                        <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                            <Row>
                                                <Col>
                                                    <h3>Out-of-State-Data</h3>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={11}>
                                                    <FormItem label="O / S DL # : ">
                                                        <Input placeholder="O / S DL #" value={Obj.outOfStateDLNo}
                                                            onChange={e => this.handleFieldChange(e, 'outOfStateDLNo')} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={12} offset={1}>
                                                    <FormItem label="O / S Code : ">
                                                        <Select onChange={e => this.handleFieldChange(e, 'outOfStateCd')}
                                                            value={Obj.outOfStateCd} showArrow={true} size={"default"}
                                                        >
                                                            {DUFInitData.OSCode.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col span={9} offset={1}>
                                        <FormItem label="Commercial Status Ind : ">
                                            <Select onChange={e => this.handleFieldChange(e, 'commercialStatusIndicator')}
                                                value={Obj.commercialStatusIndicator} showArrow={true} size={"default"}
                                            >
                                                {DUFInitData.CommStatusIndicator.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={20}>
                                        <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                            <Row>
                                                <Col>
                                                    <h3>Hearing Information</h3>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={11}>
                                                    <FormItem
                                                        validateStatus={Obj.hearingType === '' && this.state.errorObj !== {} && this.state.errorObj["hearingType"] ? 'error' : ""}
                                                        help={Obj.hearingType === '' && this.state.errorObj !== {} && this.state.errorObj["hearingType"]}
                                                        label={<b> Type </b>}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'hearingType')}
                                                            value={Obj.hearingType} showArrow={true} size={"default"}
                                                        >
                                                            {DUFInitData.HearingType.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span={11} offset={1}>
                                                    <Row>
                                                        <Col span={11}>
                                                            <FormItem
                                                                validateStatus={this.state.hearingDate === '' && this.state.errorObj !== {} && this.state.errorObj["hearingDate"] ? 'error' : ""}
                                                                help={this.state.hearingDate === '' && this.state.errorObj !== {} && this.state.errorObj["hearingDate"]}
                                                                label={<b> Date </b>}
                                                            >
                                                                <DatePicker placeholder="Date"
                                                                    value={this.state.hearingDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'hearingDate') }} />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12} offset={1}>
                                                            <FormItem
                                                                validateStatus={this.state.modifiedHearingDate === '' && this.state.errorObj !== {} && this.state.errorObj["modifiedHearingDate"] ? 'error' : ""}
                                                                help={this.state.modifiedHearingDate === '' && this.state.errorObj !== {} && this.state.errorObj["modifiedHearingDate"]}
                                                                label={<b> Mod Date </b>}
                                                            >
                                                                <DatePicker placeholder="Mod Date"
                                                                    value={this.state.modifiedHearingDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'modifiedHearingDate') }} />
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={11}>
                                                    <FormItem
                                                        validateStatus={Obj.hearingResult === '' && this.state.errorObj !== {} && this.state.errorObj["hearingResult"] ? 'error' : ""}
                                                        help={Obj.hearingResult === '' && this.state.errorObj !== {} && this.state.errorObj["hearingResult"]}
                                                        label={<b> Result </b>}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'hearingResult')}
                                                            value={Obj.hearingResult} showArrow={true} size={"default"}
                                                        >
                                                            {DUFInitData.HearingResults.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span={11} offset={1}>
                                                    <FormItem
                                                        validateStatus={Obj.hearingLocation === '' && this.state.errorObj !== {} && this.state.errorObj["hearingLocation"] ? 'error' : ""}
                                                        help={Obj.hearingLocation === '' && this.state.errorObj !== {} && this.state.errorObj["hearingLocation"]}
                                                        label={<b> Location </b>}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'hearingLocation')}
                                                            value={Obj.hearingLocation} showArrow={true} size={"default"}
                                                        >
                                                            {DUFInitData.DSFieldOffices.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span={11} offset={1}>

                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={4}>
                                        <FormItem
                                            validateStatus={this.state.mailDate === '' && this.state.errorObj !== {} && this.state.errorObj["mailDate"] ? 'error' : ""}
                                            help={this.state.mailDate === '' && this.state.errorObj !== {} && this.state.errorObj["mailDate"]}
                                            label={<b> Mail Date </b>}
                                        >
                                            <DatePicker placeholder="Mail Date"
                                                value={this.state.mailDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'mailDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={9} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.coFo === '' && this.state.errorObj !== {} && this.state.errorObj["coFo"] ? 'error' : ""}
                                            help={Obj.coFo === '' && this.state.errorObj !== {} && this.state.errorObj["coFo"]}
                                            label={<b>Co /Fo</b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'coFo')}
                                                value={Obj.coFo} showArrow={true} size={"default"}
                                            >
                                                {DUFInitData.CoFo.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={2} offset={1}>
                                        <FormItem
                                            label="Proof Bypass"
                                        >
                                            <Checkbox checked={Obj.proofBypass} onChange={e => this.handleFieldChange(e, 'proofBypass')} />
                                        </FormItem>
                                    </Col>
                                    <Col span={5} offset={1}>
                                        <FormItem
                                            validateStatus={this.state.accidentDate === '' && this.state.errorObj !== {} && this.state.errorObj["accidentDate"] ? 'error' : ""}
                                            help={this.state.accidentDate === '' && this.state.errorObj !== {} && this.state.errorObj["accidentDate"]}
                                            label={<b> Accident Date </b>}
                                        >
                                            <DatePicker placeholder="Accident Date"
                                                value={this.state.accidentDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'accidentDate') }} />
                                        </FormItem>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={10}>
                                        <FormItem
                                            validateStatus={this.state.accidentLocation === '' && this.state.errorObj !== {} && this.state.errorObj["accidentLocation"] ? 'error' : ""}
                                            help={this.state.accidentLocation === '' && this.state.errorObj !== {} && this.state.errorObj["accidentLocation"]}
                                            label={<b>Accident Location </b>}
                                        >
                                            <Input value={Obj.accidentLocation} placeholder="Accident Location" onChange={e => this.handleFieldChange(e, 'accidentLocation')} />
                                        </FormItem>
                                    </Col>
                                    <Col span={4} offset={1}>
                                        <FormItem
                                            validateStatus={this.state.routeCode === '' && this.state.errorObj !== {} && this.state.errorObj["routeCode"] ? 'error' : ""}
                                            help={this.state.routeCode === '' && this.state.errorObj !== {} && this.state.errorObj["routeCode"]}
                                            label={<b>Route Code </b>}
                                        >
                                            <Input value={Obj.routeCode} placeholder="Route Code" onChange={e => this.handleFieldChange(e, 'routeCode')} />
                                        </FormItem>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.insertParagraph === '' && this.state.errorObj !== {} && this.state.errorObj["insertParagraph"] ? 'error' : ""}
                                            help={Obj.insertParagraph === '' && this.state.errorObj !== {} && this.state.errorObj["insertParagraph"]}
                                            label={<b>Insert Para</b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'insertParagraph')}
                                                value={Obj.insertParagraph} showArrow={true} size={"default"}
                                            >
                                                {DUFInitData.ParaIns.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <br />

                                <Row>
                                    <Col span={18}>
                                        <FormItem
                                            validateStatus={Obj.nextDLNumber === '' && this.state.errorObj !== {} && this.state.errorObj["nextDLNumber"] ? 'error' : ""}
                                            help={Obj.nextDLNumber === '' && this.state.errorObj !== {} && this.state.errorObj["nextDLNumber"]}
                                            label={<b>Next Trans </b>}
                                        >
                                            <Input style={{ width: '20%' }} value={Obj.nextDLNumber} placeholder="Next Transaction" onChange={e => this.handleFieldChange(e, 'nextDLNumber')} />
                                        </FormItem>
                                    </Col>
                                    <Col span={6} style={{ float: 'right' }}>
                                        {Obj.nextDLNumber !== '' ?
                                            <Button disabled type="default">New DL</Button> :
                                            <Button style={{ color: "white", backgroundColor: "green" }}
                                                type="default" key="New DL" onClick={(e) => this.handleUpdate('new')}>New DL</Button>} {' '}
                                        <Button type="primary" key="Update" onClick={(e) => this.handleUpdate('update')}>Update</Button> {' '}
                                        <Button style={{ color: "white", backgroundColor: "red" }}
                                            type="default" key="Cancel" onClick={(e) => {
                                                debugger;
                                                this.props.history.push({
                                                    pathname: `/dlUpdates`,
                                                    state: { dlNumber: this.state.DLNumber }
                                                })
                                            }
                                            }>Cancel</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div> :
                        <div>
                            <span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span>
                            <span style={{ paddingLeft: "2%" }}><font size="large">Loading data...</font></span>
                        </div>}
                    <Modal visible={this.state.ErrorModalShow}
                        title={'Error message'} maskClosable={false}
                        footer={[
                            <div>
                                <Button type="primary" key="Ok" onClick={(e) => {
                                    this.setState({ ErrorModalShow: false });
                                    if (isNewDL === true) {
                                        this.setState({
                                            Obj: cloneDeep(defaultObj),
                                            newEffectiveDate: '',
                                            originalEffectiveDate: '',
                                            originalHearingDate: '',
                                            modDate: '',
                                            mailDate: '',
                                            accidentDate: '',
                                            errorObj: {},
                                            PhoneNumber: "",
                                            ErrorMessage: '',
                                            ErrorModalShow: false
                                        });
                                    }
                                    if (Obj.nextDLNumber !== '') {
                                        this.props.history.push({
                                            pathname: `/${Obj.nextDLNumber.toLowerCase()}Update/DLNumber/${this.state.DLNumber}`,
                                            state: { DLNumber: this.state.DLNumber, ThreeCharacterName: this.state.ThreeCharacterName, BirthDate: this.state.BirthDate }
                                        });
                                    }
                                }}>Ok</Button>
                            </div>
                        ]}
                    >
                        {this.state.ErrorMessage && (typeof this.state.ErrorMessage === 'object') ?
                            <ul><font color='red'>{this.state.ErrorMessage.map((item) => <li>{item}</li>)}</font></ul>
                            : <div>
                                <font color='red'>{this.state.ErrorMessage}</font>
                            </div>}
                    </Modal>
                </div> :
                    <div>
                        <span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span>
                        <span style={{ paddingLeft: "2%" }}><font size="large">Loading data...</font></span>
                    </div>}
            </ScrollPanel >);
    }
}

const mapStateToProps = state => {
    return {
        dlUpdates: state.dlUpdates
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            // getDUFData, saveDUFData,
            //getDLInitialData
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DUFUpdate); 