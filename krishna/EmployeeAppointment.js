import React, { Component } from 'react';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import { getListOfEmployeesForOffice, getTimeOffDetailsforEmployee, getTimeOffCreateScreen } from "../../../store/actions/profilesActions";
import { connect } from "react-redux";
import moment from "moment";
import {
    Table, Tabs, DatePicker, Divider, Modal, Input, Tooltip, Button, TimePicker,
    Select, Menu, Icon, Checkbox, Form, Radio
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
const { MonthPicker } = DatePicker;
const monthFormat = 'MM-YYYY';
const timeFormat = 'HH:mm';

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

class EmployeeAppointment extends Component {
    constructor(props) {
        super(props);

        this.appointmentColumns = [
            {
                title: <b>Start Date</b>,
                dataIndex: 'startTime',
                width: "25%",
                key: 'startDate',
                render: item => {
                    return moment(item).format("MM/DD/YYYY");
                }
            },
            {
                title: <b>End Date</b>,
                dataIndex: 'endTime',
                width: "25%",
                key: 'endDate',
                render: item => {
                    return moment(item).format("MM/DD/YYYY");
                }
            },
            {
                title: <b>Activity Type</b>,
                dataIndex: 'activityType',
                key: 'activityType'
            },
            {
                title: 'Options',
                width: '10%',
                render: (item) => {
                    return (
                        <div>
                            <Icon type="edit" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'edit', item.appointmentId)} />
                            <Divider type="vertical" />
                            <Icon type="delete" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'delete', item.appointmentId)} />
                            {/* <Divider type="vertical" />
                            <Icon type="profile" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'details', item.appointmentId)} /> */}
                        </div>
                    );
                },
            }
        ];

        this.recurringColumns = [
            {
                title: <b>Occurs</b>,
                dataIndex: 'occuranceType',
                width: '10%',
                key: 'occuranceType',
                render: item => occuranceType[item]
            },
            {
                title: <b>Start Date</b>,
                dataIndex: 'startTime',
                key: 'startDate',
                width: '20%',
                render: item => moment(item).format("MM/DD/YYYY")
            },
            {
                title: <b>End Date</b>,
                dataIndex: 'endTime',
                width: '20%',
                key: 'endDate',
                render: item => moment(item).format("MM/DD/YYYY")
            },
            {
                title: <b>Time</b>,
                dataIndex: 'isAllDay',
                width: '15%',
                key: 'isAllDay',
                render: item => item && 'ALL DAY',
            },
            {
                title: <b>Description</b>,
                dataIndex: 'activityType',
                key: 'description'
            },
            {
                title: 'Options',
                width: '10%',
                render: (item) => {
                    return (
                        <div>
                            <Icon type="edit" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'edit', item.appointmentId, true)} />
                            <Divider type="vertical" />
                            <Icon type="delete" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'delete', item.appointmentId, true)} />
                            {/* <Divider type="vertical" />
                            <Icon type="profile" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'details', item.appointmentId)} /> */}
                        </div>
                    );
                },
            }
        ];

        this.state = {
            selectedEmp: null,
            employeeList: props.profiles.employeeList,
            employeeappmnt: props.profiles.employeeappmnt,
            modalVisible: false,
            modalTitle: 'New Appointment',
            newAppointmentObj: {},
            recurringObj: []
        };

        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onEmpListRowClick = this.onEmpListRowClick.bind(this);
        this.handleTimeOffFieldChange = this.handleTimeOffFieldChange.bind(this);
        this.handleRecurringFieldChange = this.handleRecurringFieldChange.bind(this);
    }

    componentDidMount() {
        this.props.getListOfEmployeesForOffice();

        // const dateString = moment().format(monthFormat);
        // const [month, year] = dateString.split('-');
        // debugger
        // this.props.getTimeOffDetailsforEmployee(13, month, year);
    }

    static getDerivedStateFromProps(props, prevState) {
        const { employeeList, employeeappmnt } = props.profiles;

        if (employeeList !== prevState.employeeList) {
            return { employeeList };
        }

        if (employeeappmnt !== prevState.employeeappmnt) {
            debugger
            return { employeeappmnt };
        }

        return null;
    }

    onEmpListRowClick(value) {
        const selectedEmp = this.state.employeeList.find(emp => emp.empid === parseInt(value));
        this.setState({ selectedEmp });
    }

    handleMonthChange(date, dateString) {
        if (dateString) {
            const [month, year] = dateString.split('-');
            this.props.getTimeOffDetailsforEmployee(13, month, year);
        }
    }

    handleCancel() {
        this.setState({ modalVisible: false });
    }

    showModal(e, actype, appointmentId, isRecurring = false) {
        this.props.getTimeOffCreateScreen();
        let modalTitle = 'New Appointment';

        switch (actype) {
            case 'new':
                if (isRecurring) modalTitle = 'New Recurring Appointment';
                else modalTitle = 'New Appointment';
                break;
            case 'edit':
                if (isRecurring) modalTitle = 'Update Recurring Appointment';
                else modalTitle = 'Update Appointment';
                break;
            case 'delete':
                if (isRecurring) modalTitle = 'Delete Recurring  Appointment';
                else modalTitle = 'Delete Appointment';
                break;
            default:
                break;
        }

        this.setState({ modalTitle, modalVisible: true });
    }

    handleOk() {
        this.setState({ modalVisible: false });
    }

    handleTimeOffFieldChange(e, type) {
        const { newAppointmentObj } = this.state;

        switch (type) {
            case 'activityType':
                newAppointmentObj.activityType = e;
                break;
            case 'date':
                newAppointmentObj.date = e;
                newAppointmentObj.startTime = e;
                newAppointmentObj.endTime = e;
                break;
            case 'isAllDay':
                newAppointmentObj.isAllDay = e.target.checked;
                newAppointmentObj.disableTime = e.target.checked;
                break;
            case 'startTime':
                newAppointmentObj.startTime = e;
                break;
            case 'endTime':
                newAppointmentObj.endTime = e;
                break;
            case 'comment':
                newAppointmentObj.comment = e.target.value;
                break;
            case 'isDispayComment':
                newAppointmentObj.isDispayComment = e.target.checked;
                break;
            default:
                break;
        }

        this.setState({ newAppointmentObj });
    }

    handleRecurringFieldChange(e, type) {
        const { recurringObj } = this.state;
        debugger
        switch (type) {
            case 'activityType':
                recurringObj.activityType = e;
                break;
            case 'date':
                recurringObj.date = e;
                recurringObj.startTime = e;
                recurringObj.endTime = e;
                break;
            case 'occuranceType':
                recurringObj.occuranceType = e.target.value;
                break;
            case 'isAllDay':
                recurringObj.isAllDay = e.target.checked;
                recurringObj.disableTime = e.target.checked;
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
            default:
                break;
        }
        debugger
        this.setState({ recurringObj });
    }

    render() {
        const { selectedEmp, newAppointmentObj, recurringObj } = this.state;
        const { createTimeOffData } = this.props.profiles;
        const activityTypeList = createTimeOffData ?
            createTimeOffData.activityTypeList
                .filter(act => act.types === 'H')
                .sort((a, b) => {
                    const actA = a.description.toLowerCase(), actB = b.description.toLowerCase();
                    if (actA < actB) return -1;
                    else if (actA > actB) return 1;
                    else return 0;
                }) :
            [];

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
                    <span style={{ paddingLeft: "1%", fontSize: "xx-large" }}>Employee Appointment</span>
                </div>
                <Col style={{
                    width: "22%",
                    float: "left",
                    height: "93%",
                    border: "1px solid white"
                }}>
                    <div style={{
                        height: "5%", paddingTop: "7px", backgroundColor: "#d5d5d5", textAlign: "center", border: "1px solid white"
                    }}>
                        Select An Employee
                    </div>
                    <ScrollPanel
                        style={{
                            // width: "95%",
                            height: "95%",
                            backgroundColor: "#c9e3fa"
                        }}>
                        <Menu mode="vertical" onClick={(e) => this.onEmpListRowClick(e.key)}>
                            {
                                this.state.employeeList && this.state.employeeList.map(item => <Menu.Item key={item.empid}>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ fontSize: 16, fontWeight: "bold" }}>
                                            {`${item.firstName} ${item.middleName || ''} ${item.lastName}`}
                                        </div>
                                    </div>
                                </Menu.Item>)
                            }
                        </Menu>
                    </ScrollPanel>
                </Col>
                <Col style={{
                    width: "78%",
                    float: "right",
                    height: "93%",
                    border: "1px solid white"
                }}>
                    <div style={{ height: "100%", border: "1px solid white", backgroundColor: "#d5d5d5", paddingLeft: "15px" }}>
                        {selectedEmp && <Tabs defaultActiveKey="1" onChange={() => { }}>
                            <TabPane tab="Appointment" key="1">
                                <div style={{ height: "10%" }}>
                                    <span style={{ float: "left" }}>
                                        Time Off for - <span style={{ fontWeight: "bold" }}>
                                            {selectedEmp && `${selectedEmp.firstName} ${selectedEmp.lastName}`}
                                        </span>
                                    </span>
                                    <span style={{ float: "right" }}>
                                        <Button size="small" type="primary" onClick={e => this.showModal(e, 'new', null)}>
                                            <Icon type="plus" theme="outlined" />New Appointment
                                        </Button>
                                        <Modal visible={this.state.modalVisible}
                                            title={this.state.modalTitle}
                                            onCancel={this.handleCancel}
                                            onOk={this.handleOk}
                                        // footer={[
                                        //     <span>
                                        //         {this.state.empProfType === "new" &&
                                        //             <span>
                                        //                 <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>
                                        //                 <Button key="ok" type="primary" onClick={this.handleOk}>
                                        //                     Create
                                        //         </Button>
                                        //             </span>}
                                        //     </span>,
                                        //     <span>
                                        //         {this.state.empProfType === "hear" &&
                                        //             <Button key="cancel" type="primary" onClick={this.handleCancel}>OK</Button>}
                                        //     </span>
                                        // ]}
                                        >
                                            <Form layout={'horizontal'}>
                                                <FormItem
                                                    label="Activity Type"
                                                    {...formItemLayout}
                                                >
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Please select"
                                                        value={newAppointmentObj.activityType}
                                                        onChange={e => this.handleTimeOffFieldChange(e, 'activityType')}
                                                    >
                                                        {activityTypeList.map(item => <Option key={`${item.code}-${item.activityTypeId}`}>{item.description}</Option>)}
                                                    </Select>
                                                </FormItem>
                                                <FormItem
                                                    label="Date"
                                                    {...formItemLayout}
                                                >
                                                    <DatePicker onChange={e => this.handleTimeOffFieldChange(e, 'date')} />
                                                </FormItem>
                                                <FormItem
                                                    label="Is All Day"
                                                    {...formItemLayout}
                                                >
                                                    <Checkbox onChange={e => this.handleTimeOffFieldChange(e, 'isAllDay')} />
                                                </FormItem>
                                                <FormItem
                                                    label="Start Time"
                                                    {...formItemLayout}
                                                >
                                                    <TimePicker disabled={newAppointmentObj.disableTime} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'startTime')} />
                                                </FormItem>
                                                <FormItem
                                                    label="End Time"
                                                    {...formItemLayout}
                                                >
                                                    <TimePicker disabled={newAppointmentObj.disableTime} format={timeFormat} onChange={e => this.handleTimeOffFieldChange(e, 'endTime')} />
                                                </FormItem>
                                                <FormItem
                                                    label="Comment"
                                                    {...formItemLayout}
                                                >
                                                    <TextArea rows="3" onChange={e => this.handleTimeOffFieldChange(e, 'comment')} />
                                                </FormItem>
                                                <FormItem
                                                    label="Display on Schedule"
                                                    {...formItemLayout}
                                                >
                                                    <Checkbox onChange={e => this.handleTimeOffFieldChange(e, 'isDispayComment')} />
                                                </FormItem>
                                            </Form>

                                        </Modal>
                                    </span>
                                </div>
                                <br /><br />
                                <div>
                                    <div>
                                        Pick Month-Year:
                                        <MonthPicker format={monthFormat} onChange={this.handleMonthChange} />
                                        <br /><br />
                                    </div>
                                    {this.state.employeeappmnt ? <Table
                                        scroll={{ y: 250 }}
                                        bordered={false}
                                        size='small'
                                        style={{ width: "98%", marginLeft: "1%" }}
                                        pagination={{ pageSize: 10 }}
                                        columns={this.appointmentColumns}
                                        dataSource={this.state.employeeappmnt}
                                        rowKey={record => record.appointmentId}
                                        showHeader
                                    // rowSelection={rowSelection}
                                    // onRow={(record) => ({
                                    //     onClick: () => {
                                    //         this.setState({ selectedAppointmentId: record.appointmentId });
                                    //     },
                                    // })}
                                    /> : <div />}
                                </div>
                            </TabPane>
                            <TabPane tab="Recurring" key="2">
                                <div style={{ height: "10%" }}>
                                    <span style={{ float: "left" }}>
                                        Recurring Appointment for - <span style={{ fontWeight: "bold" }}>
                                            {selectedEmp && `${selectedEmp.firstName} ${selectedEmp.lastName}`}
                                        </span>
                                    </span>
                                    <span style={{ float: "right" }}>
                                        <Button size="small" type="primary" onClick={e => this.showModal(e, 'new', null, true)}>
                                            <Icon type="plus" theme="outlined" />New Recurring Appointment
                                        </Button>
                                        <Modal visible={this.state.modalVisible}
                                            title={this.state.modalTitle}
                                            onCancel={this.handleCancel}
                                            onOk={this.handleOk}
                                        // footer={[
                                        //     <span>
                                        //         {this.state.empProfType === "new" &&
                                        //             <span>
                                        //                 <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>
                                        //                 <Button key="ok" type="primary" onClick={this.handleOk}>
                                        //                     Create
                                        //         </Button>
                                        //             </span>}
                                        //     </span>,
                                        //     <span>
                                        //         {this.state.empProfType === "hear" &&
                                        //             <Button key="cancel" type="primary" onClick={this.handleCancel}>OK</Button>}
                                        //     </span>
                                        // ]}
                                        >
                                            <Form layout={'horizontal'}>
                                                <FormItem
                                                    label="Occurs"
                                                    {...formItemLayout}
                                                >
                                                    <RadioGroup onChange={e => this.handleRecurringFieldChange(e, 'occuranceType')} value={recurringObj.occuranceType}>
                                                        <Radio value={'D'}>Daily</Radio>
                                                        <Radio value={'W'}>Weekly</Radio>
                                                        <Radio value={'B'}>Bi-Weekly</Radio>
                                                        <Radio value={'M'}>Montly</Radio>
                                                        <Radio value={'Y'}>Yearly</Radio>
                                                    </RadioGroup>
                                                </FormItem>
                                                {recurringObj.occuranceType && <FormItem
                                                    label="Details"
                                                    {...formItemLayout}
                                                >
                                                    {recurringObj.occuranceType === 'D' && <RadioGroup onChange={e => this.handleRecurringFieldChange(e, 'occuranceDetails')} value={recurringObj.occuranceDetails}>
                                                        <Radio value={'Every Day'}>Every Day</Radio>
                                                        <Radio value={'Every Week Day'}>Every Week Day</Radio>
                                                    </RadioGroup>}
                                                    {recurringObj.occuranceType === 'B' && <RadioGroup onChange={e => this.handleRecurringFieldChange(e, 'occuranceDetails')} value={recurringObj.occuranceDetails}>
                                                        <Radio value={'Mon'}>Mon</Radio>
                                                        <Radio value={'Tue'}>Tue</Radio>
                                                        <Radio value={'Wed'}>Wed</Radio>
                                                        <Radio value={'Thu'}>Thu</Radio>
                                                        <Radio value={'Fri'}>Fri</Radio>
                                                        <Radio value={'Sat'}>Sat</Radio>
                                                        <Radio value={'Sun'}>Sun</Radio>
                                                    </RadioGroup>}
                                                </FormItem>}
                                                <FormItem
                                                    label="Activity Type"
                                                    {...formItemLayout}
                                                >
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Please select"
                                                        value={recurringObj.activityType}
                                                        onChange={e => this.handleRecurringFieldChange(e, 'activityType')}
                                                    >
                                                        {activityTypeList.map(item => <Option key={`${item.code}-${item.activityTypeId}`}>{item.description}</Option>)}
                                                    </Select>
                                                </FormItem>
                                                <FormItem
                                                    label="Date"
                                                    {...formItemLayout}
                                                >
                                                    <DatePicker onChange={e => this.handleRecurringFieldChange(e, 'date')} />
                                                </FormItem>
                                                <FormItem
                                                    label="Is All Day"
                                                    {...formItemLayout}
                                                >
                                                    <Checkbox onChange={() => { }} />
                                                </FormItem>
                                                <FormItem
                                                    label="Start Time"
                                                    {...formItemLayout}
                                                >
                                                    <TimePicker format={timeFormat} />
                                                </FormItem>
                                                <FormItem
                                                    label="End Time"
                                                    {...formItemLayout}
                                                >
                                                    <TimePicker format={timeFormat} />
                                                </FormItem>
                                                <FormItem
                                                    label="Comments"
                                                    {...formItemLayout}
                                                >
                                                    <TextArea rows="3" onChange={() => { }} />
                                                </FormItem>
                                                <FormItem
                                                    label="Display on Schedule"
                                                    {...formItemLayout}
                                                >
                                                    <Checkbox onChange={() => { }} />
                                                </FormItem>
                                            </Form>

                                        </Modal>
                                    </span>
                                </div>
                                <br /><br />
                                <div>
                                    <div>
                                        Pick Month-Year:
                                        <MonthPicker format={monthFormat} onChange={this.handleMonthChange} />
                                        <br /><br />
                                    </div>
                                    {this.state.employeeappmnt ? <Table
                                        scroll={{ y: 250 }}
                                        bordered={false}
                                        size='small'
                                        style={{ width: "98%", marginLeft: "1%" }}
                                        pagination={{ pageSize: 10 }}
                                        columns={this.recurringColumns}
                                        dataSource={this.state.employeeappmnt}
                                        rowKey={record => record.appointmentId}
                                        showHeader
                                    // rowSelection={rowSelection}
                                    // onRow={(record) => ({
                                    //     onClick: () => {
                                    //         this.setState({ selectedAppointmentId: record.appointmentId });
                                    //     },
                                    // })}
                                    /> : <div />}
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
            getListOfEmployeesForOffice,
            getTimeOffDetailsforEmployee,
            getTimeOffCreateScreen,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAppointment);
