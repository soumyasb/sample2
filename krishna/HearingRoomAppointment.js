import React, { Component } from 'react';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import {
    getHearingLocation, getMyDistrictOffices,
} from "../../../store/actions/profilesActions";
import { connect } from "react-redux";
import moment from "moment";
import {
    Table, Tabs, DatePicker, Divider, Modal, Input, Tooltip, Button, TimePicker,
    Select, Menu, Icon, Checkbox, Form, Radio, InputNumber
} from 'antd';
import hearingRoomData from '../mocks/HRnormalappointmentdata.json';
import recurringRoomData from '../mocks/HRrecurringtimeoffdata.json';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
const { MonthPicker } = DatePicker;
const monthFormat = 'MM-YYYY';
const timeFormat = 'HH:mm';
const dateFormat = 'YYYY/MM/DD';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const occuranceType = {
    D: 'Daily',
    W: 'Weekly',
    B: 'Bi-Weekly',
    M: 'Monthly',
    Y: 'Yearly'
}


class HearingRoomAppointment extends Component {
    constructor(props) {
        super(props);

        this.appointmentColumns = [
            {
                title: <b>Date</b>,
                dataIndex: 'date',
                width: "25%",
                key: 'date',
                render: item => {
                    return moment(item).format("MM/DD/YYYY");
                }
            },
            {
                title: <b>Time</b>,
                dataIndex: 'time',
                width: "25%",
                key: 'time',
                render: item => {
                    return moment(item).format("HH:mm");
                }
            }
        ];

        this.state = {
            districtOffices: props.profiles.districtOfficesData,
            hearingLocationsData: [],
            selectedHearingLocation: {},
            recurringHearingLocation: {},
            timeOffSelectedMonth: moment(),
            recurringSelectedMonth: moment(),
            hearingRoomObj: null,
            recurringRoomObj: {},
            deleteModalVisible: false,
        };

        this.onOfficeListRowClick = this.onOfficeListRowClick.bind(this);
        this.handleLocationChanged = this.handleLocationChanged.bind(this);
        this.handleTimeOffFieldChange = this.handleTimeOffFieldChange.bind(this);
        this.handleRecurringFieldChange = this.handleRecurringFieldChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.getMyDistrictOffices();
    }

    static getDerivedStateFromProps(props, prevState) {
        const { districtOfficesData, hearingLocationsData } = props.profiles;

        if (districtOfficesData && districtOfficesData !== prevState.districtOffices) return { districtOffices: districtOfficesData };

        if (hearingLocationsData !== prevState.hearingLocationsData) return { hearingLocationsData };

        return null;
    }

    onOfficeListRowClick = (value) => {
        this.props.getHearingLocation(parseInt(value));
        const selectedOffice = this.state.districtOffices.find(item => item.officeID === value);

        this.setState({ selectedOffice, selectedHearingLocation: {}, hearingRoomObj: null });
    }

    handleLocationChanged = (e, isRecurring) => {
        const selectedHearingLocation = this.state.hearingLocationsData.find(i => i.hearingLocationId === parseInt(e));

        if (isRecurring) this.setState({ recurringHearingLocation: selectedHearingLocation })
        else this.setState({ selectedHearingLocation });

        if (selectedHearingLocation) {
            const month = this.state.timeOffSelectedMonth.month();
            const year = this.state.timeOffSelectedMonth.year();
            // TODO - Add the action call to retrieve the Appointments.
            // this.props.getTimeOffDetailsforEmployee(this.state.selectedEmp.empid, month, year);

            if (isRecurring) {
                this.setState({ recurringObj: recurringRoomData[0] });
            } else {
                // TODO using the json data directly.. 
                let hearingRoomObj = {
                    "dayType": "1",
                    "dayOfTheWeek": "",
                    "hearingRoomId": selectedHearingLocation.hearingRoomId,
                    "monthOfTheYear": "",
                    "dayOfTheMonth": "",
                    "occuranceType": "",
                    "startTime": moment(),
                    "endTime": moment(),
                    "isDispayComment": false,
                    "comment": "",
                    "isAllDay": false,
                };

                // hearingRoomObj = hearingRoomData[0];

                this.setState({ hearingRoomObj });
            }
        }
    }

    handleMonthChange(date, dateString, isRecurring = false) {
        if (dateString) {
            if (isRecurring) this.setState({ recurringSelectedMonth: date });
            else this.setState({ timeOffSelectedMonth: date });

            if (this.state.selectedHearingLocation) {
                const [month, year] = dateString.split('-');
                // TODO - Add the action call to retrieve the Appointments.
                // this.props.getTimeOffDetailsforEmployee(this.state.selectedEmp.empid, month, year);
            }
        }
    }

    handleTimeOffFieldChange(e, type) {
        const { hearingRoomObj } = this.state;

        switch (type) {
            case 'date':
                const date = e.startOf('date');
                hearingRoomObj.date = date.format();
                hearingRoomObj.startTime = date.format();
                hearingRoomObj.endTime = date.format();
                break;
            case 'isAllDay':
                hearingRoomObj.isAllDay = e.target.checked;
                //  hearingRoomObj.disableTime = e.target.checked;
                break;
            case 'startTime':
                hearingRoomObj.startTime = e.format();
                break;
            case 'endTime':
                hearingRoomObj.endTime = e.format();
                break;
            case 'comment':
                hearingRoomObj.comment = e.target.value;
                break;
            case 'isDispayComment':
                hearingRoomObj.isDispayComment = e.target.checked;
                break;
            default:
                break;
        }

        this.setState({ hearingRoomObj });
    }

    handleRecurringFieldChange(e, type) {
        const { recurringObj } = this.state;
        debugger;
        switch (type) {
            case 'activityType':
                recurringObj.activityType = e;
                break;
            case 'startDate':
                recurringObj.startDate = e.format();
                break;
            case 'endDate':
                recurringObj.endDate = e.format();
                break;
            case 'occuranceType':
                {
                    recurringObj.occuranceType = e.target.value;
                    const crecurringObj = this.state.recurringObj;
                    crecurringObj.dayType = "";
                    crecurringObj.dayOfTheMonth = "";
                    crecurringObj.dayOfTheWeek = "";
                    crecurringObj.monthOfTheYear = "";
                    this.setState({ recurringObj: crecurringObj });
                }
                break;
            case 'isAllDay':
                recurringObj.isAllDay = e.target.checked;
                // recurringObj.disableTime = e.target.checked;
                break;
            case 'startTime':
                recurringObj.startTime = e;
                break;
            case 'endTime':
                recurringObj.endTime = e;
                break;
            case 'comment':
                recurringObj.comment = e.target.value;
                break;
            case 'isDispayComment':
                recurringObj.isDispayComment = e.target.checked;
                break;
            case 'dayType':
                recurringObj.dayType = e.target.value;
                break;
            case 'dayOfTheWeek':
                recurringObj.dayOfTheWeek = e.target.value;
                break;
            case 'dayOfTheMonth':
                debugger;
                recurringObj.dayOfTheMonth = e;
                break;
            case 'selectedRadio':
                debugger;
                recurringObj.selectedRadio = e.target.value;
                break;
            case 'endDateOption':
                debugger;
                recurringObj.endDateOption = e.target.value;
                if (e.target.value === 'Y') {
                    recurringObj.endDate = moment();
                }
                else {
                    recurringObj.endDate = "9999-12-27T12:00:00";
                }
                break;
            default:
                break;
        }
        debugger
        this.setState({ recurringObj });
    }

    handleDelete() {
        this.setState({ deleteModalVisible: true });
    }


    getMenuList(districtOffices) {
        let officesList = [];
        districtOffices.map((item) => {
            officesList.push(<Menu.Item key={item.officeID}>{<div style={{ textAlign: "center" }}><div style={{ height: "35px", fontSize: 16, fontWeight: "bold" }}>{item.officeID}-{item.name}</div>
                <div style={{ height: "35px", marginTop: "-18px", fontSize: 11 }}>{item.addressLineOne}</div>
                <div style={{ height: "35px", marginTop: "-18px", fontSize: 11 }}>{item.city}-{item.zip}.  <b>Ph:</b>{item.phoneNumber}</div></div>}</Menu.Item>)
        })
        return officesList;
    }

    render() {
        const {
            selectedOffice,
            districtOffices,
            hearingLocationsData,
            selectedHearingLocation,
            timeOffSelectedMonth,
            hearingRoomObj,
            recurringObj,
            recurringHearingLocation,
            recurringSelectedMonth
        } = this.state;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        let officesList = [];
        if (districtOffices !== undefined) { officesList = this.getMenuList(districtOffices); }

        return (<ScrollPanel
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0)"
            }}>
            <Row style={{
                marginLeft: "2.5%",
                width: "95%",
                height: "800px",
                border: "2px solid white"
            }}>
                <div style={{ height: "7%", border: "1px solid white" }} >
                    <span style={{ paddingLeft: "1%", fontSize: "xx-large" }}>Hearing Room Appointment</span>
                </div>
                <Col span={5} style={{ height: "93%", border: "1px solid white" }}>
                    <div style={{ height: "5%", paddingTop: "7px", backgroundColor: "#d5d5d5", textAlign: "center", border: "1px solid white" }}>
                        Select An Office
                    </div>
                    <ScrollPanel style={{ height: "95%", backgroundColor: "#c9e3fa" }}>
                        <Menu onClick={(e) => this.onOfficeListRowClick(e.key)} mode="vertical">
                            {officesList}
                        </Menu>
                    </ScrollPanel>
                </Col>
                <Col style={{
                    width: "78%",
                    float: "right",
                    height: "93%",
                    border: "1px solid white"
                }}>
                    <div style={{
                        height: "5%", paddingTop: "7px", backgroundColor: "#d5d5d5", textAlign: "center", border: "1px solid white"
                    }}>Hearing Room</div>
                    <div style={{ height: "100%", border: "1px solid white", paddingLeft: "15px" }}>
                        {hearingLocationsData && <Tabs defaultActiveKey="1" onChange={() => { }}>
                            <TabPane style={{ height: "100%" }} tab={<b>Appointment</b>} key="1">
                                <div style={{ height: "10%" }}>
                                    <span style={{ float: "left" }}>
                                        Office - <span style={{ fontWeight: "bold" }}>
                                            {selectedOffice && selectedOffice.name}
                                        </span>
                                    </span>
                                </div>
                                <br /><br />
                                <div style={{ height: "90%" }}>
                                    <Row style={{ width: "100%" }}>
                                        <Col span={11}>
                                            Locations : {' '}
                                            <Select
                                                style={{ width: '60%' }}
                                                placeholder="Please select"
                                                value={selectedHearingLocation.hearingLocationId}
                                                onChange={e => this.handleLocationChanged(e)}
                                            >
                                                {hearingLocationsData.map(item => <Option key={`${item.hearingLocationId}`}
                                                    value={item.hearingLocationId}>
                                                    {`${item.roomNumber} - ${item.roomDescription}`}</Option>)}
                                            </Select>
                                        </Col>
                                        <Col>
                                            Pick Month-Year : {' '}
                                            <MonthPicker
                                                format={monthFormat}
                                                value={timeOffSelectedMonth}
                                                onChange={(date, dateString) => this.handleMonthChange(date, dateString)} />
                                        </Col>
                                    </Row>
                                    <br /><br />
                                    {hearingRoomObj && <Row style={{ width: "100%" }}>
                                        <div>
                                            <Button key="edit" type="primary" onClick={(e) => { }}>
                                                Edit
                                            </Button> {'  '}
                                            <Button key="delete" type="primary" onClick={this.handleDelete}>
                                                Delete
                                            </Button>
                                            <Modal visible={this.state.deleteModalVisible}
                                                width="20%"
                                                title={'Delete'}
                                                onCancel={(e) => this.setState({ deleteModalVisible: false })}
                                                onOk={(e) => { }}
                                            >
                                                Are you sure to delete ?
                                            </Modal>
                                        </div>
                                        <section style={{ border: "1px solid white", padding: "15px" }}>
                                            <div>
                                                <Form layout={'horizontal'}>
                                                    <FormItem
                                                        label="Date"
                                                        {...formItemLayout}
                                                    >
                                                        <DatePicker disabled={this.state.disablefield} value={moment(hearingRoomObj.startTime, dateFormat)} format={dateFormat} onChange={e => this.handleTimeOffFieldChange(e, 'date')} />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Is All Day"
                                                        {...formItemLayout}
                                                    >
                                                        <Checkbox disabled={this.state.disablefield} checked={hearingRoomObj.isAllDay} onChange={e => this.handleTimeOffFieldChange(e, 'isAllDay')} />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Start Time"
                                                        {...formItemLayout}
                                                    >
                                                        {this.state.disablefield ? <TimePicker disabled value={moment(hearingRoomObj.startTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'startTime')} />
                                                            : <TimePicker disabled={hearingRoomObj.isAllDay} value={moment(hearingRoomObj.startTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'startTime')} />} </FormItem>
                                                    <FormItem
                                                        label="End Time"
                                                        {...formItemLayout}
                                                    >
                                                        {this.state.disablefield ? <TimePicker disabled value={moment(hearingRoomObj.endTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'endTime')} />
                                                            : <TimePicker disabled={hearingRoomObj.isAllDay} value={moment(hearingRoomObj.endTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'endTime')} />} </FormItem>
                                                    <FormItem
                                                        label="Comments"
                                                        {...formItemLayout}
                                                    >
                                                        <TextArea disabled={this.state.disablefield} rows="3" value={hearingRoomObj.comment} onChange={e => this.handleTimeOffFieldChange(e, 'comment')} />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Display on Schedule"
                                                        {...formItemLayout}
                                                    >
                                                        <Checkbox disabled={this.state.disablefield} checked={hearingRoomObj.isDispayComment} onChange={e => this.handleTimeOffFieldChange(e, 'isDispayComment')} />
                                                    </FormItem>
                                                </Form>
                                            </div>
                                            <div style={{ float: "right" }}>
                                                <Button key="ok" type="primary" onClick={(e) => this.handleOk('nonrec', this.state.modalmode)}>
                                                    Save
                                                </Button>
                                            </div>
                                        </section>
                                    </Row>}
                                </div>
                            </TabPane>
                            <TabPane style={{ height: "100%" }} tab={<b>Recurring</b>} key="2">
                                <div style={{ height: "10%" }}>
                                    <span style={{ float: "left" }}>
                                        Office - <span style={{ fontWeight: "bold" }}>
                                            {selectedOffice && selectedOffice.name}
                                        </span>
                                    </span>
                                </div>
                                <br /><br />
                                <div style={{ height: "90%" }}>
                                    <Row style={{ width: "100%" }}>
                                        <Col span={11}>
                                            Locations : {' '}
                                            <Select
                                                style={{ width: '60%' }}
                                                placeholder="Please select"
                                                value={recurringHearingLocation.hearingLocationId}
                                                onChange={e => this.handleLocationChanged(e, true)}
                                            >
                                                {hearingLocationsData.map(item => <Option key={`${item.hearingLocationId}`}
                                                    value={item.hearingLocationId}>
                                                    {`${item.roomNumber} - ${item.roomDescription}`}</Option>)}
                                            </Select>
                                        </Col>
                                        <Col>
                                            Pick Month-Year : {' '}
                                            <MonthPicker
                                                format={monthFormat}
                                                value={recurringSelectedMonth}
                                                onChange={(date, dateString) => this.handleMonthChange(date, dateString, true)} />
                                        </Col>
                                    </Row>
                                    <br /><br />
                                    {recurringObj && <Row style={{ width: "100%" }}>
                                        <section style={{ border: "1px solid white", padding: "15px" }}>
                                            <div style={{ float: "right", height: "15px" }}>
                                                <Button key="ok" type="primary" onClick={(e) => { }}>
                                                    Edit
                                                </Button> {'  '}
                                                <Button key="ok" type="primary" onClick={(e) => { }}>
                                                    Delete
                                                </Button>
                                            </div>
                                            <div>
                                                <Form layout={'horizontal'}>
                                                    <FormItem
                                                        label="Occurs"
                                                        {...formItemLayout}
                                                    >
                                                        <div><RadioGroup disabled={this.state.disablefield} onChange={e => this.handleRecurringFieldChange(e, 'occuranceType')} value={recurringObj.occuranceType}>
                                                            <Radio value={'D'}>Daily</Radio>
                                                            <Radio value={'W'}>Weekly</Radio>
                                                            {/* <Radio value={'B'}>Bi-Weekly</Radio> */}
                                                            <Radio value={'M'}>Monthly</Radio>
                                                            <Radio value={'Y'}>Yearly</Radio>
                                                        </RadioGroup>
                                                            {recurringObj.occuranceType &&
                                                                <div style={{ fontSize: "12px" }}> {recurringObj.occuranceType === 'D' && <RadioGroup disabled={this.state.disablefield} size="small" onChange={e => this.handleRecurringFieldChange(e, 'dayType')} value={recurringObj.dayType}>
                                                                    <Radio style={{ fontSize: "12px" }} value={'1'}>Every Day</Radio>
                                                                    <Radio style={{ fontSize: "12px" }} value={'2'}>Every Week Day</Radio>
                                                                </RadioGroup>}
                                                                    {recurringObj.occuranceType === 'W' && <span>Every week on:<RadioGroup disabled={this.state.disablefield} size="small" onChange={e => this.handleRecurringFieldChange(e, 'dayOfTheWeek')} value={recurringObj.dayOfTheWeek}>
                                                                        <Radio style={{ fontSize: "12px" }} value={'1'}>Mon</Radio>
                                                                        <Radio style={{ fontSize: "12px" }} value={'2'}>Tue</Radio>
                                                                        <Radio style={{ fontSize: "12px" }} value={'3'}>Wed</Radio>
                                                                        <Radio style={{ fontSize: "12px" }} value={'4'}>Thu</Radio>
                                                                        <Radio style={{ fontSize: "12px" }} value={'5'}>Fri</Radio>
                                                                        <Radio style={{ fontSize: "12px" }} value={'6'}>Sat</Radio>
                                                                        <Radio style={{ fontSize: "12px" }} value={'7'}>Sun</Radio>
                                                                    </RadioGroup></span>}
                                                                    {recurringObj.occuranceType === 'M' && <span>Every month on: <RadioGroup disabled={this.state.disablefield} value={recurringObj.selectedRadio} onChange={e =>

                                                                        //  {if(e.target.value === '1'){
                                                                        //                             this.setState({firstOption: true});
                                                                        //                         }
                                                                        //                         else{
                                                                        //                             this.setState({firstOption: false});
                                                                        //                         }}
                                                                        this.handleRecurringFieldChange(e, 'selectedRadio')
                                                                    } >
                                                                        <Radio value={'1'}>The <select disabled={recurringObj.selectedRadio === "2"} onChange={e => this.handleRecurringFieldChange(e, 'dayType')} value={recurringObj.dayType}>
                                                                            <option key="1" value="1">First</option>
                                                                            <option key="2" value="2">Second</option>
                                                                            <option key="3" value="3">Third</option>
                                                                            <option key="4" value="4">Fourth</option>
                                                                            <option key="L" value="L">Last</option>
                                                                        </select>
                                                                            <select disabled={recurringObj.selectedRadio === "2"} onChange={e => this.handleRecurringFieldChange(e, 'dayOfTheWeek')} value={recurringObj.dayOfTheWeek}>
                                                                                <option key="1" value="1">Sunday</option>
                                                                                <option key="2" value="2">Monday</option>
                                                                                <option key="3" value="3">Tuesday</option>
                                                                                <option key="4" value="4">Wednesday</option>
                                                                                <option key="5" value="5">Thursday</option>
                                                                                <option key="6" value="6">Friday</option>
                                                                                <option key="7" value="7">Saturday</option>
                                                                                <option key="W" value="W">Weekday</option>
                                                                                <option key="E" value="E">Weekend</option></select>
                                                                        </Radio>of every month.
                                                                            <Radio value={'2'}>Day<InputNumber disabled={recurringObj.selectedRadio === "1"} min={1} max={31}
                                                                            onChange={e => this.handleRecurringFieldChange(e, 'dayOfTheMonth')} value={recurringObj.dayOfTheMonth} /> of every month.</Radio>
                                                                    </RadioGroup>
                                                                    </span>}
                                                                    {recurringObj.occuranceType === 'Y' && <span>Every year on: <RadioGroup disabled={this.state.disablefield} value={recurringObj.selectedRadio} onChange={e =>

                                                                        this.handleRecurringFieldChange(e, 'selectedRadio')}>
                                                                        <Radio value={'1'}><select disabled={recurringObj.selectedRadio === "2"} onChange={e => this.handleRecurringFieldChange(e, 'monthOfTheYear')} value={recurringObj.monthOfTheYear}> <option key="1" value="1">January</option>
                                                                            <option key="2" value="2">February</option>
                                                                            <option key="3" value="3">March</option>
                                                                            <option key="4" value="4">April</option>
                                                                            <option key="5" value="5">May</option>
                                                                            <option key="6" value="6">June</option>
                                                                            <option key="7" value="7">July</option>
                                                                            <option key="8" value="8">August</option>
                                                                            <option key="9" value="9">September</option>
                                                                            <option key="10" value="10">October</option>
                                                                            <option key="11" value="11">November</option>
                                                                            <option key="12" value="12">December</option>
                                                                        </select> on the day <InputNumber disabled={recurringObj.selectedRadio === "2"} min={1} max={31} onChange={e => this.handleRecurringFieldChange(e, 'dayOfTheMonth')} value={recurringObj.dayOfTheMonth} /></Radio>
                                                                        <Radio value={'2'}>The <select disabled={recurringObj.selectedRadio === "1"} onChange={e => this.handleRecurringFieldChange(e, 'dayType')} value={recurringObj.dayType}>
                                                                            <option key="1" value="1">First</option>
                                                                            <option key="2" value="2">Second</option>
                                                                            <option key="3" value="3">Third</option>
                                                                            <option key="4" value="4">Fourth</option>
                                                                            <option key="L" value="L">Last</option>
                                                                        </select><select disabled={recurringObj.selectedRadio === "1"} onChange={e => this.handleRecurringFieldChange(e, 'dayOfTheWeek')} value={recurringObj.dayOfTheWeek}> <option key="1" value="1">Sunday</option>
                                                                                <option key="2" value="2">Monday</option>
                                                                                <option key="3" value="3">Tuesday</option>
                                                                                <option key="4" value="4">Wednesday</option>
                                                                                <option key="5" value="5">Thursday</option>
                                                                                <option key="6" value="6">Friday</option>
                                                                                <option key="7" value="7">Saturday</option>
                                                                            </select> of <select disabled={recurringObj.selectedRadio === "1"} onChange={e => this.handleRecurringFieldChange(e, 'monthOfTheYear')} value={recurringObj.monthOfTheYear}> <option key="1" value="1">January</option>
                                                                                <option key="2" value="2">February</option>
                                                                                <option key="3" value="3">March</option>
                                                                                <option key="4" value="4">April</option>
                                                                                <option key="5" value="5">May</option>
                                                                                <option key="6" value="6">June</option>
                                                                                <option key="7" value="7">July</option>
                                                                                <option key="8" value="8">August</option>
                                                                                <option key="9" value="9">September</option>
                                                                                <option key="10" value="10">October</option>
                                                                                <option key="11" value="11">November</option>
                                                                                <option key="12" value="12">December</option>
                                                                            </select> </Radio>
                                                                    </RadioGroup></span>}
                                                                </div>}
                                                        </div>
                                                    </FormItem>

                                                    <FormItem
                                                        label="Duration"
                                                        {...formItemLayout}
                                                    >
                                                        <div><div><div style={{ width: "50%", float: "left" }}>Start Date: <DatePicker disabled={this.state.disablefield} placeholder="Start Date" value={moment(recurringObj.startDate, dateFormat)} format={dateFormat} onChange={(e) => this.handleRecurringFieldChange(e, 'startDate')} /></div>
                                                            <RadioGroup disabled={this.state.disablefield} onChange={e => this.handleRecurringFieldChange(e, 'endDateOption')} value={recurringObj.endDateOption}>
                                                                <Radio style={radioStyle} value={'Y'}>End Date: {recurringObj.endDateOption !== 'N' ? <DatePicker placeholder="End Date" value={moment(recurringObj.endDate, dateFormat)} format={dateFormat} onChange={e => this.handleRecurringFieldChange(e, 'endDate')} /> :
                                                                    <DatePicker disabled placeholder="Start Date" value={moment(recurringObj.endDate, dateFormat)} format={dateFormat} />}
                                                                </Radio>
                                                                <Radio style={radioStyle} value={'N'}>No End Date</Radio>
                                                            </RadioGroup></div>
                                                            {/* </FormItem>
<FormItem
    label="Is All Day"
    {...formItemLayout}
> */}
                                                            <div><span> <Checkbox disabled={this.state.disablefield} checked={recurringObj.isAllDay} onChange={e => this.handleRecurringFieldChange(e, 'isAllDay')}>Is All Day</Checkbox></span>
                                                                {/* </FormItem>
<FormItem
    label="Start Time"
    {...formItemLayout}
> */}
                                                                <span>  Start Time: {this.state.disablefield ? <TimePicker disabled value={moment(recurringObj.startTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'startTime')} />
                                                                    : <TimePicker disabled={this.state.disablefield} disabled={recurringObj.isAllDay} value={moment(recurringObj.startTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'startTime')} />}
                                                                    {/* </FormItem>
<FormItem
    label="End Time"
    {...formItemLayout}
> */}</span><span>
                                                                    End Time: {this.state.disablefield ? <TimePicker disabled value={moment(recurringObj.endTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'endTime')} />
                                                                        : <TimePicker disabled={this.state.disablefield} disabled={recurringObj.isAllDay} value={moment(recurringObj.endTime)} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'endTime')} />}</span></div></div> </FormItem>
                                                    <FormItem
                                                        label="Comments"
                                                        {...formItemLayout}
                                                    >
                                                        <TextArea disabled={this.state.disablefield} rows="3" value={recurringObj.comment} onChange={e => this.handleRecurringFieldChange(e, 'comment')} />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Display on Schedule"
                                                        {...formItemLayout}
                                                    >
                                                        <Checkbox disabled={this.state.disablefield} checked={recurringObj.isDispayComment} onChange={e => this.handleRecurringFieldChange(e, 'isDispayComment')} />
                                                    </FormItem>
                                                </Form>

                                            </div>
                                            <div style={{ float: "right" }}>
                                                <Button key="ok" type="primary" onClick={(e) => this.handleOk('nonrec', this.state.modalmode)}>
                                                    Save
                                                </Button>
                                            </div>
                                        </section>
                                    </Row>}
                                </div>
                            </TabPane>
                        </Tabs>}
                    </div>
                </Col>
            </Row>
        </ScrollPanel>);
    }
}

const mapStateToProps = state => {
    return {
        profiles: state.profiles
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getHearingLocation,
            getMyDistrictOffices,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HearingRoomAppointment);
