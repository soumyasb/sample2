import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Radio, Select, Modal, Spin } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
// import {
//     getDUJData, saveDUJData,
// } from "../../../store/actions/dlUpdatesActions";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';
import './me.css';

import DUJInitData from '../mocks/DUJInit.json';

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
    typeInput: '',
    dueDate: '',
    reason: '',
    destination: '',
    changeToDate: '',
    testDate: '',
    dujResponse: '',
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

class DUJUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DLNumber: this.props.match.params.dlNumber,
            Obj: cloneDeep(defaultObj),
            DUJInitData,
            changeToDate: "",
            dueDate: "",
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
        //     //this.props.getDUJData(DLInitData.DLNumber);
        // }
        // else {
        //  //   this.props.history.push(`/dlUpdates`);
        // }
    }
    componentDidUpdate(prevProps) {

        // if (prevProps.dlUpdates.DUJInitData !== this.props.dlUpdates.DUJInitData && this.props.dlUpdates.DUJInitData !== undefined) {
        //     this.setState({ DUJInitData: this.props.dlUpdates.DUJInitData });
        // }
        // if (prevProps.dlUpdates.saveDUJData !== this.props.dlUpdates.saveDUJData && this.props.dlUpdates.saveDUJData !== undefined) {
        //     this.setState({ saveDUJData: this.props.dlUpdates.saveDUJData, openSuccessModal: true });
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

        // const { DUJInitData, saveDUJData, dlUpdatesErrorData } = props.dlUpdates;
        // if (DUJInitData && DUJInitData !== prevState.DUJInitData) {
        //     return { DUJInitData: DUJInitData, isloading: false };
        // }
        // if (saveDUJData && saveDUJData !== prevState.saveDUJData)
        //     return {
        //         saveDUJData: saveDUJData,
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
                    //this.props.getDUJData(Obj['DLNumber']);
                }
                break;
            case 'destination':
                if (e.target.value.length <= 4) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'nextDLNumber':
                if (e.target.value.length <= 3) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'reason':
                Obj[field] = e;
                break;
            case 'typeInput':
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
            case 'dueDate':
                this.setState({ Obj: Obj, dueDate: d });
                break;
            case 'changeToDate':
                this.setState({ Obj: Obj, changeToDate: d });
                break;
            case 'testDate':
                this.setState({ Obj: Obj, testDate: d });
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

        const { Obj, dueDate, changeToDate } = this.state;
        Obj['dueDate'] = dateFormatFunc(dueDate);
        Obj['changeToDate'] = dateFormatFunc(changeToDate);
        Obj['LoginId'] = this.state.DUJInitData.LoginId;
        Obj['DLNumber'] = this.state.DLNumber;
        Obj['ThreeCharacterLastName'] = this.state.ThreeCharacterName;

        this.setState({ isloading: true, DLNumber: Obj['DLNumber'] });
        // this.props.saveDUJData(Obj);
    }

    render() {
        const { Obj } = this.state;
        const { DUJInitData, saveDUJData, isNewDL, isloading } = this.state;

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                {isloading !== true ? <div style={{ backgroundColor: "white", height: '800px', width: "95%", marginLeft: '2%' }}>
                    {saveDUJData &&
                        <Modal title={"Update Status"} visible={this.state.openSuccessModal} onCancel={(e) => this.setState({ openSuccessModal: false })}
                            footer={[<Button type="primary" key="Ok" onClick={(e) => {
                                this.setState({ openSuccessModal: false });
                                if (isNewDL !== true) {
                                    this.props.history.push({
                                        pathname: `/dlUpdates`,
                                        state: { dlNumber: saveDUJData.DLNumber }
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
                                <div dangerouslySetInnerHTML={{ __html: saveDUJData.DUJResponse.toString() }} />
                            </div>
                        </Modal>}
                    {DUJInitData ?
                        <div>
                            <h1>
                                <b>Suspense (DUJ)</b>
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
                                <div style={{ width: '55%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                    <Row>
                                        <Col>
                                            <h3>Type Input</h3>
                                            <hr />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col offset={2}>
                                            <RadioGroup value={Obj.typeInput} onChange={e => this.handleFieldChange(e, 'typeInput')}>
                                                <Radio value={'Add'}>Add</Radio>
                                                <Radio value={'Change'}>Change</Radio>
                                                <Radio value={'Delete'}>Delete</Radio>
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <Row>
                                    <Col span={6}>
                                        <FormItem
                                            validateStatus={this.state.dueDate === '' && this.state.errorObj !== {} && this.state.errorObj["dueDate"] ? 'error' : ""}
                                            help={this.state.dueDate === '' && this.state.errorObj !== {} && this.state.errorObj["dueDate"]}
                                            label={<b> Due Date </b>}
                                        >
                                            <DatePicker placeholder="Due Date"
                                                value={this.state.dueDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'dueDate') }} />
                                        </FormItem>
                                    </Col>
                                    <Col span={8} offset={1}>
                                        <FormItem
                                            validateStatus={Obj.reason === '' && this.state.errorObj !== {} && this.state.errorObj["AuthoritySection"] ? 'error' : ""}
                                            help={Obj.reason === '' && this.state.errorObj !== {} && this.state.errorObj["reason"]}
                                            label={<b> Reason </b>}
                                        >
                                            <Select onChange={e => this.handleFieldChange(e, 'reason')}
                                                value={Obj.reason} showArrow={true} size={"default"}
                                            >
                                                {DUJInitData.Reasons.map((item) => {
                                                    return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <FormItem
                                            validateStatus={this.state.destination === '' && this.state.errorObj !== {} && this.state.errorObj["destination"] ? 'error' : ""}
                                            help={this.state.destination === '' && this.state.errorObj !== {} && this.state.errorObj["destination"]}
                                            label={<b>Destination </b>}
                                        >
                                            <Input value={Obj.destination} placeholder="Destination" onChange={e => this.handleFieldChange(e, 'destination')} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} offset={1}>
                                        {Obj.typeInput === 'Change' &&
                                            <FormItem
                                                validateStatus={this.state.changeToDate === '' && this.state.errorObj !== {} && this.state.errorObj["changeToDate"] ? 'error' : ""}
                                                help={this.state.changeToDate === '' && this.state.errorObj !== {} && this.state.errorObj["changeToDate"]}
                                                label={<b> Change to Date </b>}
                                            >
                                                <DatePicker placeholder="Change to Date"
                                                    value={this.state.changeToDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'changeToDate') }} />
                                            </FormItem>
                                        }
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
            // getDUJData, saveDUJData,
            //getDLInitialData
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DUJUpdate); 