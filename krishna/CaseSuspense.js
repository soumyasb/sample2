import React, { Component } from 'react';
import { Row, Col, Table, Card, Spin, Select, Input, DatePicker, Button, Icon, Divider, Modal } from 'antd';
import moment from 'moment';
import getCaseSuspenseData from '../mocks/getcasesuspense.json';
import caseSuspenseReasonsList from '../mocks/caseSuspenseReasonsListForcase.json';

const { Option } = Select;

const getDropdownList = (listObj, selectedValue) => {
    return listObj.map(item => {
        if (item.Value !== "") {
            if (item.Value === selectedValue) {
                return <Option key={item.Value} value={item.Value} selected>{item.Text}</Option>;
            }
            return <Option key={item.Value} value={item.Value}>{item.Text}</Option>;
        }
    });
}

const defaultCaseSuspenseObj = {
    SuspenseDate: moment(new Date()),
    RequestedBy: '',
    SuspenseReason: '',
    SuspenseDescription: null,
};

class CaseSuspense extends Component {
    constructor(props) {
        super(props);

        this.state = {
            caseSuspenseObj: defaultCaseSuspenseObj,
            editMode: false,
            deleteModalShow: false,
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClearFields = this.handleClearFields.bind(this);
        this.deleteModal = this.deleteModal.bind(this);
    }

    handleFieldChange(e, type) {
        const { caseSuspenseObj } = this.state;

        switch (type) {
            case 'SuspenseReason':
                caseSuspenseObj[type] = e
                break;
            case 'SuspenseDescription':
            case 'RequestedBy':
                caseSuspenseObj[type] = e.target.value;
            default:
                break;
        }

        this.setState({ caseSuspenseObj });
    }

    onDateChange(d, ds, type) {
        const { caseSuspenseObj } = this.state;
        caseSuspenseObj[type] = ds || moment(new Date());

        this.setState({ caseSuspenseObj });
    }

    handleEditCancel() {
        this.setState({ editMode: false, caseSuspenseObj: defaultCaseSuspenseObj, deleteModalShow: false });
    }

    handleSave() {
        // TODO....
        // Save edit Case Suspense....
    }

    handleClearFields() {
        this.setState({ caseSuspenseObj: defaultCaseSuspenseObj });
    }

    enableEdit(item) {
        this.setState({ editMode: true, caseSuspenseObj: { ...item } });
    }

    deleteModal(item) {
        this.setState({ caseSuspenseObj: { ...item }, deleteModalShow: true });
    }

    handleDelete() {
        // TODO
        // use this.state.caseSuspenseObj to delete the case suspense....

        this.setState({ caseSuspenseObj: defaultCaseSuspenseObj, deleteModalShow: false });
    }

    render() {
        const { caseSuspenseObj, editMode } = this.state;
        const { SuspenseDate, SuspenseReason, SuspenseDescription, RequestedBy } = caseSuspenseObj;
        const caseSuspenseData = getCaseSuspenseData;
        const suspenses = getCaseSuspenseData.Suspense;
        const reasonsList = getDropdownList(caseSuspenseReasonsList);
        debugger
        const columns = [
            {
                title: 'Suspense Date',
                dataIndex: 'SuspenseDate',
                key: 'SuspenseDate'
            },
            {
                title: 'Reason',
                dataIndex: 'SuspenseReason',
                key: 'SuspenseReason',
                render: (SuspenseReason) => caseSuspenseReasonsList.find(c => c.Value === SuspenseReason).Text
            },
            {
                title: 'Requested By',
                dataIndex: 'RequestedBy',
                key: 'RequestedBy'
            },
            {
                title: 'Description',
                dataIndex: 'SuspenseDescription',
                width: '40%',
                key: 'SuspenseDescription'
            },
            {
                title: 'Options',
                width: '8%',
                render: (item) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <Icon type="edit" style={{ cursor: 'pointer' }} onClick={e => this.enableEdit(item)} />
                            <Divider type="vertical" />
                            <Icon type="delete" style={{ cursor: 'pointer' }} onClick={e => this.deleteModal(item)} />
                        </div>
                    );
                },
            },
        ];

        const boxShadows = {
            boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
        };

        return (
            <div>
                Case Suspense...
                <div>
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
                                    <Col span={4}>
                                        <b>Case Number</b>: {caseSuspenseData.CD_CASE}
                                    </Col>
                                    <Col span={1} />
                                    <Col span={5}>
                                        <b>DL Number</b>: {caseSuspenseData.DLNumber}
                                    </Col>
                                    <Col span={1} />
                                    <Col span={4}>
                                        <b>Subject Name</b>: {caseSuspenseData.SubjectName}
                                    </Col>
                                    <Col span={1} />
                                    <Col span={4}>
                                        <b>Employee Requestor</b>: {caseSuspenseData.EmployeeRequestor}
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={4}>
                                        <b>Suspense Date </b>: <DatePicker placeholder="Suspense Date"
                                            value={moment(new Date(SuspenseDate))} onChange={(d, ds) => { this.onDateChange(d, ds, 'SuspenseDate') }} />
                                    </Col>
                                    <Col span={1} />
                                    <Col span={5}>
                                        <b>Reason </b>: <Select value={SuspenseReason} showArrow={true} placeholder="Reason"
                                            size={"default"} style={{ width: '100%' }} onChange={(e) => this.handleFieldChange(e, 'SuspenseReason')}>
                                            {reasonsList}
                                        </Select>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={4}>
                                        <b>Requested By </b>: <Input placeholder="Requested By" value={RequestedBy}
                                            onChange={e => this.handleFieldChange(e, 'RequestedBy')} />
                                    </Col>
                                    <Col span={1} />
                                    <Col span={8}>
                                        <b>Description </b>: <Input placeholder="Description" value={SuspenseDescription}
                                            onChange={e => this.handleFieldChange(e, 'SuspenseDescription')} />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col span={21}>
                                        {!editMode && <div>
                                            <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={this.handleSave}> + Add New Suspense </Button> {'   '}
                                            <Button onClick={this.handleClearFields}> Clear Fields </Button>
                                        </div>}
                                    </Col>
                                    {editMode &&
                                        <Col>
                                            <Button type="primary" onClick={this.handleSave}> Save </Button> {' '}
                                            <Button type="danger" onClick={this.handleEditCancel}> Cancel </Button>
                                        </Col>}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Card
                                style={{
                                    marginTop: "8px",
                                    borderRadius: "16px",
                                    ...boxShadows
                                }}
                            >
                                {
                                    suspenses ? <Table
                                        rowKey='CD_CASE'
                                        title={() => <div><span><h1>Case Suspense</h1></span></div>}
                                        footer={() => <p>{suspenses.length} suspense cases </p>}
                                        showHeader
                                        columns={columns}
                                        dataSource={suspenses}
                                        pagination={{ pageSize: 8 }} />
                                        : <div><span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span><span style={{ paddingLeft: "2%" }}><font size="large">Loading data...</font></span></div>
                                }
                            </Card>
                        </Col>
                    </Row>
                    <Modal visible={this.state.deleteModalShow}
                        onCancel={this.handleEditCancel}
                        footer={[
                            <div>
                                <Button style={{ color: "white", backgroundColor: "red" }} type="default" key="Cancel" onClick={this.handleEditCancel}>No</Button>
                                <Button style={{ color: "white", backgroundColor: "green" }} type="default" key="Ok" onClick={this.handleDelete}>Yes</Button>
                            </div>
                        ]}
                    >
                        Do you want to delete the suspense?
                    </Modal>
                </div>
            </div>
        );
    }
}

export default CaseSuspense;
