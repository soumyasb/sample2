import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Radio, Select, Modal, Spin } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
// import {
//     getDUHData, saveDUHData,
// } from "../../../store/actions/dlUpdatesActions";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';
import './me.css';

import DUHInitData from '../mocks/DUHInit.json';

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
    serviceDate: '',
    serviceCode: '',
    originalEffectiveDate: '',
    licenseLocation: '',
    typeInput: '',
    violationDate: '',
    testDate: '',
    duhResponse: '',
    nextDLNumber: '',
    error: true,
};

const dateFormatFunc = date => {
    const fdate = moment(date).format(dateFormat);
    if (fdate.includes('Invalid')) {
        return "";
    }
    else
        return fdate;
};

class DUHUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DLNumber: this.props.match.params.dlNumber,
            Obj: cloneDeep(defaultObj),
            DUHInitData,
            originalEffectiveDate: "",
            serviceDate: "",
            violationDate: "",
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
        //         BirthDate: DLInitData.Birthdate
        //     });
        //     //this.props.getDUHData(DLInitData.DLNumber);
        // }
        // else {
        //  //   this.props.history.push(`/dlUpdates`);
        // }
    }
    componentDidUpdate(prevProps) {

        // if (prevProps.dlUpdates.DUHInitData !== this.props.dlUpdates.DUHInitData && this.props.dlUpdates.DUHInitData !== undefined) {
        //     this.setState({ DUHInitData: this.props.dlUpdates.DUHInitData });
        // }
        // if (prevProps.dlUpdates.saveDUHData !== this.props.dlUpdates.saveDUHData && this.props.dlUpdates.saveDUHData !== undefined) {
        //     this.setState({ saveDUHData: this.props.dlUpdates.saveDUHData, openSuccessModal: true });
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

        // const { DUHInitData, saveDUHData, dlUpdatesErrorData } = props.dlUpdates;
        // if (DUHInitData && DUHInitData !== prevState.DUHInitData) {
        //     return { DUHInitData: DUHInitData, isloading: false };
        // }
        // if (saveDUHData && saveDUHData !== prevState.saveDUHData)
        //     return {
        //         saveDUHData: saveDUHData,
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
                    //this.props.getDUHData(Obj['DLNumber']);
                }
                break;
            case 'nextDLNumber':
                if (e.target.value.length <= 3) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'typeInput':
            case 'serviceCode':
            case 'licenseLocation':
                Obj[field] = e;
            default:
                break;
        }

        this.setState({ Obj });
    }

    onDateChange(d, ds, type) {
        const { Obj } = this.state;
        Obj[type] = ds || '';

        switch (type) {
            case 'serviceDate':
                this.setState({ Obj: Obj, serviceDate: d });
                break;
            case 'originalEffectiveDate':
                this.setState({ Obj: Obj, originalEffectiveDate: d });
                break;
            case 'violationDate':
                this.setState({ Obj: Obj, violationDate: d });
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

        const { Obj, serviceDate, originalEffectiveDate, violationDate } = this.state;
        Obj['serviceDate'] = dateFormatFunc(serviceDate);
        Obj['originalEffectiveDate'] = dateFormatFunc(originalEffectiveDate);
        Obj['violationDate'] = dateFormatFunc(violationDate);
        Obj['LoginId'] = this.state.DUHInitData.LoginId;
        Obj['DLNumber'] = this.state.DLNumber;
        Obj['ThreeCharacterLastName'] = this.state.ThreeCharacterName;

        this.setState({ isloading: true, DLNumber: Obj['DLNumber'] });
        // this.props.saveDUHData(Obj);
    }

    render() {
        const { Obj } = this.state;
        const { DUHInitData, saveDUHData, isNewDL, isloading } = this.state;

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                {isloading !== true ? <div style={{ backgroundColor: "white", height: '800px', width: "95%", marginLeft: '2%' }}>
                    {saveDUHData &&
                        <Modal title={"Update Status"} visible={this.state.openSuccessModal} onCancel={(e) => this.setState({ openSuccessModal: false })}
                            footer={[<Button type="primary" key="Ok" onClick={(e) => {
                                this.setState({ openSuccessModal: false });
                                if (isNewDL !== true) {
                                    this.props.history.push({
                                        pathname: `/dlUpdates`,
                                        state: { dlNumber: saveDUHData.DLNumber }
                                    })
                                }
                                if (isNewDL === true) {
                                    this.setState({
                                        Obj: cloneDeep(defaultObj),
                                        serviceDate: "",
                                        originalEffectiveDate: "",
                                        violationDate: "",
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
                                <div dangerouslySetInnerHTML={{ __html: saveDUHData.DUHResponse.toString() }} />
                            </div>
                        </Modal>}
                    {DUHInitData ?
                        <div>
                            <h1>
                                <b>Service Code / License Location (DUH)</b>
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
                                        <Col span={6} offset={1}>
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
                                        <Col span={6} offset={1}>
                                            <FormItem
                                                label={<b>3 Pos Last Name</b>}
                                            >
                                                {this.state.ThreeCharacterName}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                }
                                <Row>
                                    <Col span={6}>
                                        <FormItem
                                            validateStatus={this.state.serviceDate === '' && this.state.errorObj !== {} && this.state.errorObj["serviceDate"] ? 'error' : ""}
                                            help={this.state.serviceDate === '' && this.state.errorObj !== {} && this.state.errorObj["serviceDate"]}
                                            label={<b>Service Date </b>}
                                        >
                                            <DatePicker placeholder="Select Date"
                                                value={this.state.serviceDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'serviceDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.serviceCode === '' && this.state.errorObj !== {} && this.state.errorObj["AuthoritySection"] ? 'error' : ""}
                                            help={Obj.serviceCode === '' && this.state.errorObj !== {} && this.state.errorObj["serviceCode"]}
                                            label={<b>Service Code </b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'serviceCode')}
                                                value={Obj.serviceCode} showArrow={true} size={"default"}
                                            >
                                                {DUHInitData.ServiceCodes.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <FormItem
                                            validateStatus={this.state.originalEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["originalEffectiveDate"] ? 'error' : ""}
                                            help={this.state.originalEffectiveDate === '' && this.state.errorObj !== {} && this.state.errorObj["originalEffectiveDate"]}
                                            label={<b>Orig Effec Date </b>}
                                        >
                                            <DatePicker placeholder="Select Date"
                                                value={this.state.originalEffectiveDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'originalEffectiveDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} offset={1}>
                                        <FormItem validateStatus={Obj.licenseLocation === '' && this.state.errorObj !== {} && this.state.errorObj["licenseLocation"] ? 'error' : ""}
                                            help={Obj.licenseLocation === '' && this.state.errorObj !== {} && this.state.errorObj["licenseLocation"]}
                                            label={<b>License Location </b>}
                                        >
                                            <Select style={{ width: '80%' }} onChange={e => this.handleFieldChange(e, 'licenseLocation')}
                                                value={Obj.licenseLocation} showArrow={true} size={"default"}
                                            >
                                                {DUHInitData.LicenseLocation.map((ff) => {
                                                    return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <FormItem
                                            validateStatus={this.state.violationDate === '' && this.state.errorObj !== {} && this.state.errorObj["violationDate"] ? 'error' : ""}
                                            help={this.state.violationDate === '' && this.state.errorObj !== {} && this.state.errorObj["violationDate"]}
                                            label={<b>Violation Date </b>}
                                        >
                                            <DatePicker placeholder="Select Date"
                                                value={this.state.violationDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'violationDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <FormItem validateStatus={Obj.typeInput === '' && this.state.errorObj !== {} && this.state.errorObj["typeInput"] ? 'error' : ""}
                                            help={Obj.typeInput === '' && this.state.errorObj !== {} && this.state.errorObj["typeInput"]}
                                            label={<b>Type Input </b>}
                                        >
                                            <Select style={{ width: '80%' }} onChange={e => this.handleFieldChange(e, 'typeInput')}
                                                value={Obj.typeInput} showArrow={true} size={"default"}
                                            >
                                                {DUHInitData.TypeInput.map((ff) => {
                                                    return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
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
                                            serviceDate: "",
                                            originalEffectiveDate: "",
                                            violationDate: "",
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
            // getDUHData, saveDUHData,
            //getDLInitialData
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DUHUpdate); 