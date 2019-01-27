import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Radio, Select, Modal, Spin } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
// import {
//     getDUXData, saveDUXData,
// } from "../../../store/actions/dlUpdatesActions";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';
import './me.css';

import DUXInitData from '../mocks/DUXInit.json';

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
    hearingType: '',
    hearingDate: '',
    hearingLocation: '',
    hearingReason: '',
    hearingResult: '',
    modifiedHearingDate: '',
    authoritySection: '',
    effectiveDate: '',
    updateCopies: '',
    origAuthoritySection: '',
    origEffectiveDate: '',
    coFo: '',
    pmOption: 'NA',
    pmCode: '',
    restrictionsOptions: 'NA',
    restriction1: '',
    restriction2: '',
    restriction3: '',
    insertParagraph: '',
    routeCode: '',
    countyCode: '',
    duxResponse: '',
    DUXResponse: '',
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

class DUXUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DLNumber: this.props.match.params.dlNumber,
            Obj: cloneDeep(defaultObj),
            DUXInitData,
            birthDate: '',
            modifiedHearingDate: '',
            effectiveDate: '',
            hearingDate: '',
            mailDate: '',
            origEffectiveDate: '',
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
        //     //this.props.getDUXData(DLInitData.DLNumber);
        // }
        // else {
        //  //   this.props.history.push(`/dlUpdates`);
        // }
    }
    componentDidUpdate(prevProps) {

        // if (prevProps.dlUpdates.DUXInitData !== this.props.dlUpdates.DUXInitData && this.props.dlUpdates.DUXInitData !== undefined) {
        //     this.setState({ DUXInitData: this.props.dlUpdates.DUXInitData });
        // }
        // if (prevProps.dlUpdates.saveDUXData !== this.props.dlUpdates.saveDUXData && this.props.dlUpdates.saveDUXData !== undefined) {
        //     this.setState({ saveDUXData: this.props.dlUpdates.saveDUXData, openSuccessModal: true });
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

        // const { DUXInitData, saveDUXData, dlUpdatesErrorData } = props.dlUpdates;
        // if (DUXInitData && DUXInitData !== prevState.DUXInitData) {
        //     return { DUXInitData: DUXInitData, isloading: false };
        // }
        // if (saveDUXData && saveDUXData !== prevState.saveDUXData)
        //     return {
        //         saveDUXData: saveDUXData,
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
                    //this.props.getDUXData(Obj['DLNumber']);
                }
                break;
            case 'routeCode':
                if (e.target.value.match(/^[0-9]+$/)) {
                    if (e.target.value.length <= 4) {

                        Obj[field] = e.target.value;
                    }
                }
                break;
            case 'countyCode':
                if (e.target.value.match(/^[0-9]+$/)) {
                    if (e.target.value.length <= 2) {

                        Obj[field] = e.target.value;
                    }
                }
                break;
            case 'nextDLNumber':
                if (e.target.value.length <= 3) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'hearingType':
            case 'hearingLocation':
            case 'hearingResult':
            case 'hearingReason':
            case 'authoritySection':
            case 'updateCopies':
            case 'restriction1':
            case 'restriction2':
            case 'restriction3':
            case 'pmCode':
            case 'licenseLocation':
            case 'origAuthoritySection':
            case 'insertParagraph':
            case 'coFo':
                Obj[field] = e;
                break;
            case 'typeInput':
            case 'pmOption':
            case 'restrictionsOptions':
                Obj[field] = e.target.checked ? e.target.value : '';
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
            case 'modifiedHearingDate':
                this.setState({ Obj: Obj, modifiedHearingDate: d });
                break;
            case 'birthDate':
                this.setState({ Obj: Obj, birthDate: d });
                break;
            case 'effectiveDate':
                this.setState({ Obj: Obj, effectiveDate: d });
                break;
            case 'hearingDate':
                this.setState({ Obj: Obj, hearingDate: d });
                break;
            case 'mailDate':
                this.setState({ Obj: Obj, mailDate: d });
                break;
            case 'origEffectiveDate':
                this.setState({ Obj: Obj, origEffectiveDate: d });
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
            birthDate,
            modifiedHearingDate,
            effectiveDate,
            hearingDate,
            mailDate,
            origEffectiveDate } = this.state;

        Obj['birthDate'] = dateFormatFunc(birthDate);
        Obj['effectiveDate'] = dateFormatFunc(effectiveDate);
        Obj['modifiedHearingDate'] = dateFormatFunc(modifiedHearingDate);
        Obj['hearingDate'] = dateFormatFunc(hearingDate);
        Obj['mailDate'] = dateFormatFunc(mailDate);
        Obj['origEffectiveDate'] = dateFormatFunc(origEffectiveDate);
        Obj['LoginId'] = this.state.DUXInitData.LoginId;
        Obj['DLNumber'] = this.state.DLNumber;
        Obj['ThreeCharacterLastName'] = this.state.ThreeCharacterName;

        this.setState({ isloading: true, DLNumber: Obj['DLNumber'] });
        // this.props.saveDUXData(Obj);
    }

    render() {
        const { Obj } = this.state;
        const { DUXInitData, saveDUXData, isNewDL, isloading } = this.state;

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                {isloading !== true ? <div style={{ backgroundColor: "white", height: '800px', width: "95%", marginLeft: '2%' }}>
                    {saveDUXData &&
                        <Modal title={"Update Status"} visible={this.state.openSuccessModal} onCancel={(e) => this.setState({ openSuccessModal: false })}
                            footer={[<Button type="primary" key="Ok" onClick={(e) => {
                                this.setState({ openSuccessModal: false });
                                if (isNewDL !== true) {
                                    this.props.history.push({
                                        pathname: `/dlUpdates`,
                                        state: { dlNumber: saveDUXData.DLNumber }
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
                                <div dangerouslySetInnerHTML={{ __html: saveDUXData.DUXResponse.toString() }} />
                            </div>
                        </Modal>}
                    {DUXInitData ?
                        <div>
                            <h1>
                                <b>Set Aside/End Action (DUX)</b>
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
                                    </Row>
                                }
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
                                                            {DUXInitData.ChgHearingType.map((item) => {
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
                                                        validateStatus={Obj.hearingLocation === '' && this.state.errorObj !== {} && this.state.errorObj["hearingLocation"] ? 'error' : ""}
                                                        help={Obj.hearingLocation === '' && this.state.errorObj !== {} && this.state.errorObj["hearingLocation"]}
                                                        label={<b> Location </b>}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'hearingLocation')}
                                                            value={Obj.hearingLocation} showArrow={true} size={"default"}
                                                        >
                                                            {DUXInitData.Locations.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span={11} offset={1}>
                                                    <FormItem
                                                        validateStatus={Obj.hearingReason === '' && this.state.errorObj !== {} && this.state.errorObj["hearingReason"] ? 'error' : ""}
                                                        help={Obj.hearingReason === '' && this.state.errorObj !== {} && this.state.errorObj["hearingReason"]}
                                                        label={<b> Reason </b>}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'hearingReason')}
                                                            value={Obj.hearingReason} showArrow={true} size={"default"}
                                                        >
                                                            {DUXInitData.Reasons.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
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
                                                            {DUXInitData.HearingResults.map((item) => {
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
                                    <Col span={9}>
                                        <FormItem
                                            validateStatus={Obj.authoritySection === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection"] ? 'error' : ""}
                                            help={Obj.authoritySection === '' && this.state.errorObj !== {} && this.state.errorObj["authoritySection"]}
                                            label={<b> Authority Section </b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'authoritySection')}
                                                value={Obj.authoritySection} showArrow={true} size={"default"}
                                            >
                                                {DUXInitData.AuthoritySection.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={4} offset={1}>
                                        <FormItem
                                            validateStatus={this.state.effectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["effectiveDate"] ? 'error' : ""}
                                            help={this.state.effectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["effectiveDate"]}
                                            label={<b> Effective Date </b>}
                                        >
                                            <DatePicker placeholder="Effective Date"
                                                value={this.state.effectiveDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'effectiveDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.updateCopies === '' && this.state.errorObj !== {} && this.state.errorObj["updateCopies"] ? 'error' : ""}
                                            help={Obj.updateCopies === '' && this.state.errorObj !== {} && this.state.errorObj["updateCopies"]}
                                            label={<b> Update Copies </b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'updateCopies')}
                                                value={Obj.updateCopies} showArrow={true} size={"default"}
                                            >
                                                {DUXInitData.UpdateCopies.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={9}>
                                        <FormItem
                                            validateStatus={Obj.origAuthoritySection === '' && this.state.errorObj !== {} && this.state.errorObj["origAuthoritySection"] ? 'error' : ""}
                                            help={Obj.origAuthoritySection === '' && this.state.errorObj !== {} && this.state.errorObj["origAuthoritySection"]}
                                            label={<b>Orig Authority Section</b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'origAuthoritySection')}
                                                value={Obj.origAuthoritySection} showArrow={true} size={"default"}
                                            >
                                                {DUXInitData.OriginalAuthoritySection.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={4} offset={1}>
                                        <FormItem
                                            validateStatus={this.state.origEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["origEffectiveDate"] ? 'error' : ""}
                                            help={this.state.origEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["origEffectiveDate"]}
                                            label={<b> Orig Effec Date </b>}
                                        >
                                            <DatePicker placeholder="Orig Effec Date"
                                                value={this.state.origEffectiveDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'origEffectiveDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.coFo === '' && this.state.errorObj !== {} && this.state.errorObj["coFo"] ? 'error' : ""}
                                            help={Obj.coFo === '' && this.state.errorObj !== {} && this.state.errorObj["coFo"]}
                                            label={<b>Co /Fo</b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'coFo')}
                                                value={Obj.coFo} showArrow={true} size={"default"}
                                            >
                                                {DUXInitData.CoFo.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                            <Row>
                                                <Col>
                                                    <h3>Restriction</h3>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col offset={2}>
                                                    <RadioGroup value={Obj.restrictionsOptions} onChange={e => this.handleFieldChange(e, 'restrictionsOptions')}>
                                                        <Radio value={'NA'}>N/A</Radio>
                                                        <Radio value={'Add'}>Add</Radio>
                                                        <Radio value={'Delete'}>Delete</Radio>
                                                    </RadioGroup>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col span={22} offset={1}>
                                                    <FormItem
                                                        validateStatus={Obj.restriction1 === '' && this.state.errorObj !== {} && this.state.errorObj["restriction1"] ? 'error' : ""}
                                                        help={Obj.restriction1 === '' && this.state.errorObj !== {} && this.state.errorObj["restriction1"]}
                                                        label={'1:'}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'restriction1')}
                                                            value={Obj.restriction1} showArrow={true} size={"default"}
                                                            disabled={Obj.restrictionsOptions === 'NA'}
                                                        >
                                                            {DUXInitData.Restrictions1.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem
                                                        validateStatus={Obj.restriction2 === '' && this.state.errorObj !== {} && this.state.errorObj["restriction2"] ? 'error' : ""}
                                                        help={Obj.restriction2 === '' && this.state.errorObj !== {} && this.state.errorObj["restriction2"]}
                                                        label={'2:'}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'restriction2')}
                                                            value={Obj.restriction2} showArrow={true} size={"default"}
                                                            disabled={Obj.restrictionsOptions === 'NA'}
                                                        >
                                                            {DUXInitData.Restrictions2.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem
                                                        validateStatus={Obj.restriction3 === '' && this.state.errorObj !== {} && this.state.errorObj["restriction3"] ? 'error' : ""}
                                                        help={Obj.restriction3 === '' && this.state.errorObj !== {} && this.state.errorObj["restriction3"]}
                                                        label={'3:'}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'restriction3')}
                                                            value={Obj.restriction3} showArrow={true} size={"default"}
                                                            disabled={Obj.restrictionsOptions === 'NA'}
                                                        >
                                                            {DUXInitData.Restrictions3.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col span={10} offset={1}>
                                        <Row>
                                            <Col>
                                                <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                                    <Row>
                                                        <Col>
                                                            <h3>P/M Code</h3>
                                                            <hr />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col offset={2}>
                                                            <RadioGroup value={Obj.pmOption} onChange={e => this.handleFieldChange(e, 'pmOption')}>
                                                                <Radio value={'NA'}>N/A</Radio>
                                                                <Radio value={'Add'}>Add</Radio>
                                                                <Radio value={'Delete'}>Delete</Radio>
                                                            </RadioGroup>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <Row>
                                                        <Col span={20} offset={2}>
                                                            <FormItem
                                                                validateStatus={Obj.pmCode === '' && this.state.errorObj !== {} && this.state.errorObj["pmCode"] ? 'error' : ""}
                                                                help={Obj.pmCode === '' && this.state.errorObj !== {} && this.state.errorObj["pmCode"]}
                                                            >
                                                                <Select onChange={e => this.handleFieldChange(e, 'pmCode')}
                                                                    value={Obj.pmCode} showArrow={true} size={"default"}
                                                                    disabled={Obj.pmOption === 'NA'}
                                                                >
                                                                    {DUXInitData.PMCode.map((item) => {
                                                                        return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                                    })}
                                                                </Select>
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <br />
                                            </Col>
                                            <Row>
                                                <Col span={10}>
                                                    <FormItem
                                                        validateStatus={this.state.countyCode === '' && this.state.errorObj !== {} && this.state.errorObj["countyCode"] ? 'error' : ""}
                                                        help={this.state.countyCode === '' && this.state.errorObj !== {} && this.state.errorObj["countyCode"]}
                                                        label={<b>County Code </b>}
                                                    >
                                                        <Input value={Obj.countyCode} placeholder="County Code" onChange={e => this.handleFieldChange(e, 'countyCode')} />
                                                    </FormItem>
                                                </Col>
                                                <Col span={10} offset={1}>
                                                    <FormItem
                                                        validateStatus={this.state.routeCode === '' && this.state.errorObj !== {} && this.state.errorObj["routeCode"] ? 'error' : ""}
                                                        help={this.state.routeCode === '' && this.state.errorObj !== {} && this.state.errorObj["routeCode"]}
                                                        label={<b>Route Code </b>}
                                                    >
                                                        <Input value={Obj.routeCode} placeholder="Route Code" onChange={e => this.handleFieldChange(e, 'routeCode')} />
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <FormItem
                                                    validateStatus={Obj.insertParagraph === '' && this.state.errorObj !== {} && this.state.errorObj["insertParagraph"] ? 'error' : ""}
                                                    help={Obj.insertParagraph === '' && this.state.errorObj !== {} && this.state.errorObj["insertParagraph"]}
                                                    label={<b>Insert Para</b>}
                                                >
                                                    <Select onChange={e => this.handleFieldChange(e, 'insertParagraph')}
                                                        value={Obj.insertParagraph} showArrow={true} size={"default"}
                                                    >
                                                        {DUXInitData.ParaIns.map((item) => {
                                                            return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                        })}
                                                    </Select>
                                                </FormItem>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                                <br />

                                <Row>

                                </Row>

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
                                            birthDate: '',
                                            modifiedHearingDate: '',
                                            effectiveDate: '',
                                            hearingDate: '',
                                            mailDate: '',
                                            origEffectiveDate: '',
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
            // getDUXData, saveDUXData,
            //getDLInitialData
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DUXUpdate); 