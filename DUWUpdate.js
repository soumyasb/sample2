import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Radio, Select, Modal, Spin } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
// import {
//     getDUWData, saveDUWData,
// } from "../../../store/actions/dlUpdatesActions";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';
import './me.css';

import DUWInitData from '../mocks/DUWInit.json';

const FormItem = Form.Item;
const { Option } = Select;
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
    typeAction: '',
    mailDate: '',
    fieldFile: '',
    modifiedHearingDate: '',
    duwResponse: '',
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

class DUWUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dlNumber: this.props.match.params.dlNumber,
            Obj: cloneDeep(defaultObj),
            DUWInitData,
            hearingDate: "",
            modifiedHearingDate: "",
            mailDate: "",
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
        //         dlNumber: DLInitData.DLNumber,
        //         ThreeCharacterName: DLInitData.ThreeCharacterName,
        //         BirthDate: DLInitData.Birthdate
        //     });
        //     //this.props.getDUWData(DLInitData.DLNumber);
        // }
        // else {
        //  //   this.props.history.push(`/dlUpdates`);
        // }
    }
    componentDidUpdate(prevProps) {

        // if (prevProps.dlUpdates.DUWInitData !== this.props.dlUpdates.DUWInitData && this.props.dlUpdates.DUWInitData !== undefined) {
        //     this.setState({ DUWInitData: this.props.dlUpdates.DUWInitData });
        // }
        // if (prevProps.dlUpdates.saveDUWData !== this.props.dlUpdates.saveDUWData && this.props.dlUpdates.saveDUWData !== undefined) {
        //     this.setState({ saveDUWData: this.props.dlUpdates.saveDUWData, openSuccessModal: true });
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

        // const { DUWInitData, saveDUWData, dlUpdatesErrorData } = props.dlUpdates;
        // if (DUWInitData && DUWInitData !== prevState.DUWInitData) {
        //     return { DUWInitData: DUWInitData, isloading: false };
        // }
        // if (saveDUWData && saveDUWData !== prevState.saveDUWData)
        //     return {
        //         saveDUWData: saveDUWData,
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
            case 'dlNumber':
            case 'ThreeCharacterName':
                Obj[field] = e.target.value;
                if ((Obj['dlNumber'].length === 8)) {
                    //    this.setState({dlNumber: Obj['dlNumber']});
                    //   this.props.getDLInitialData(Obj['dlNumber']);
                    //this.props.getDUWData(Obj['dlNumber']);
                }
                break;
            case 'nextDLNumber':
                if (e.target.value.length <= 3) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'hearingType':
            case 'hearingLocation':
            case 'hearingReason':
            case 'typeAction':
            case 'hearingResult':
            case 'fieldFile':
                Obj[field] = e;
                break;
            case 'originalReason':
                // TODO -- this is because, there are values in the init json...
                Obj[field] = e !== '-0-' ? e : '';
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
            case 'hearingDate':
                this.setState({ Obj: Obj, hearingDate: d });
                break;
            case 'mailDate':
                this.setState({ Obj: Obj, mailDate: d });
                break;
            case 'modifiedHearingDate':
                this.setState({ Obj: Obj, modifiedHearingDate: d });
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

        const { Obj, hearingDate, mailDate, modifiedHearingDate } = this.state;
        Obj['hearingDate'] = dateFormatFunc(hearingDate);
        Obj['mailDate'] = dateFormatFunc(mailDate);
        Obj['modifiedHearingDate'] = dateFormatFunc(modifiedHearingDate);
        Obj['LoginId'] = this.state.DUWInitData.LoginId;
        Obj['dlNumber'] = this.state.dlNumber;
        Obj['ThreeCharacterLastName'] = this.state.ThreeCharacterName;

        this.setState({ isloading: true, dlNumber: Obj['dlNumber'] });
        // this.props.saveDUWData(Obj);
    }

    render() {
        const { Obj } = this.state;
        const { DUWInitData, saveDUWData, isNewDL, isloading } = this.state;

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                {isloading !== true ? <div style={{ backgroundColor: "white", height: '800px', width: "95%", marginLeft: '2%' }}>
                    {saveDUWData &&
                        <Modal title={"Update Status"} visible={this.state.openSuccessModal} onCancel={(e) => this.setState({ openSuccessModal: false })}
                            footer={[<Button type="primary" key="Ok" onClick={(e) => {
                                this.setState({ openSuccessModal: false });
                                if (isNewDL !== true) {
                                    this.props.history.push({
                                        pathname: `/dlUpdates`,
                                        state: { dlNumber: saveDUWData.DLNumber }
                                    })
                                }
                                if (isNewDL === true) {
                                    this.setState({
                                        Obj: cloneDeep(defaultObj),
                                        hearingDate: "",
                                        mailDate: "",
                                        modifiedHearingDate: "",
                                        errorObj: {},
                                        PhoneNumber: "",
                                        ErrorMessage: '',
                                        ErrorModalShow: false
                                    });
                                }
                                if (Obj.nextDLNumber !== '') {
                                    this.props.history.push({
                                        pathname: `/${Obj.nextDLNumber.toLowerCase()}Update/DLNumber/${this.state.dlNumber}`,
                                        state: { dlNumber: this.state.dlNumber, ThreeCharacterName: this.state.ThreeCharacterName }
                                    });
                                }
                            }}>OK</Button>]}
                        >
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: saveDUWData.DUWResponse.toString() }} />
                            </div>
                        </Modal>}
                    {DUWInitData ?
                        <div>
                            <h1>
                                <b>Miscellaneous Closure (DUW)</b>
                            </h1>
                            <Form className="ant-advanced-search-form">
                                {isNewDL ?
                                    <Row>
                                        <Col span={8} style={{ display: 'block' }}>
                                            <FormItem
                                                label={<b>DL # </b>}
                                            >
                                                <Input value={Obj.dlNumber} placeholder="DL Number" onChange={e => this.handleFieldChange(e, 'dlNumber')} />
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
                                        <Col span={8}>
                                            <FormItem
                                                label={<b>DL #</b>}
                                            >
                                                {this.state.dlNumber}
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
                                                            {DUWInitData.HearingType.map((item) => {
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
                                                            {DUWInitData.HearingLocations.map((item) => {
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
                                                            {DUWInitData.HearingReasons.map((item) => {
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
                                                            {DUWInitData.HearingResults.map((item) => {
                                                                return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                            })}
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span={11} offset={1}>
                                                    <FormItem
                                                        validateStatus={Obj.typeAction === '' && this.state.errorObj !== {} && this.state.errorObj["typeAction"] ? 'error' : ""}
                                                        help={Obj.typeAction === '' && this.state.errorObj !== {} && this.state.errorObj["typeAction"]}
                                                        label={<b> Type Action </b>}
                                                    >
                                                        <Select onChange={e => this.handleFieldChange(e, 'typeAction')}
                                                            value={Obj.typeAction} showArrow={true} size={"default"}
                                                        >
                                                            {DUWInitData.TypeAction.map((item) => {
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
                                    <Col span={8}>
                                        <FormItem
                                            validateStatus={this.state.mailDate === '' && this.state.errorObj !== {} && this.state.errorObj["mailDate"] ? 'error' : ""}
                                            help={this.state.mailDate === '' && this.state.errorObj !== {} && this.state.errorObj["mailDate"]}
                                            label={<b> Mail Date </b>}
                                        >
                                            <DatePicker placeholder="Mail Date"
                                                value={this.state.mailDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'mailDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.fieldFile === '' && this.state.errorObj !== {} && this.state.errorObj["fieldFile"] ? 'error' : ""}
                                            help={Obj.fieldFile === '' && this.state.errorObj !== {} && this.state.errorObj["fieldFile"]}
                                            label={<b> Field File </b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'fieldFile')}
                                                value={Obj.fieldFile} showArrow={true} size={"default"}
                                            >
                                                {DUWInitData.FieldFile.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
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
                                                    state: { dlNumber: this.state.dlNumber }
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
                                            hearingDate: "",
                                            originalDate: "",
                                            errorObj: {},
                                            PhoneNumber: "",
                                            ErrorMessage: '',
                                            ErrorModalShow: false
                                        });
                                    }
                                    if (Obj.nextDLNumber !== '') {
                                        this.props.history.push({
                                            pathname: `/${Obj.nextDLNumber.toLowerCase()}Update/DLNumber/${this.state.dlNumber}`,
                                            state: { dlNumber: this.state.dlNumber, ThreeCharacterName: this.state.ThreeCharacterName, BirthDate: this.state.BirthDate }
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
            // getDUWData, saveDUWData,
            //getDLInitialData
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DUWUpdate); 