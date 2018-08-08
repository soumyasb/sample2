import React, { Component } from 'react';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel"
import { getCustomerDetails } from "../../../store/actions/caseActions";
import { withRouter } from "react-router-dom";
import { Modal, List, Table, Button, Icon, Input, Row, Col, Spin } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../../Cases.css";
import { showModal } from "../../../store/actions/uiActions";

const { TextArea } = Input;

const frcolumns = [
    {
        title: <b>FR CASE NO.</b>,
        dataIndex: 'CaseNumber',
        width: "30%",
        key: 'CaseNumber'
    },
    {
        title: <b>ACCIDENT DATE</b>,
        dataIndex: 'Date',
        width: "35%",
        key: 'Date',
        render: text => <span style={{ paddingLeft: "2%" }}>{text}</span>
    },
    {
        title: <b>LOCATION</b>,
        dataIndex: 'City',
        width: "35%",
        key: 'City'
    }];
const columns = [
    {
        title: 'Case Number',
        dataIndex: 'CaseNumber',
        width: 50,
        key: 'CaseNumber',
        render: text => <a href="">{text}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'CaseStatus',
        width: 50,
        key: 'CaseStatus'
    },
    {
        title: 'Received',
        dataIndex: 'DateReceived',
        width: 50,
        key: 'DateReceived'
    },
    {
        title: 'Referral',
        dataIndex: 'CD_REFR_SRCE_TYP',
        width: 50,
        key: 'CD_REFR_SRCE_TYP'
    },
    {
        title: 'Reason',
        dataIndex: 'CD_RSN',
        width: 50,
        key: 'CD_RSN'
    }];

class CustomerDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dlNumber: props.match.params.dlNumber,
            customerDetailsObj: props.cases.customerDetailsObj,
            modalvisible: false
        };
        this.openModal = this.openModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
        debugger;
        this.props.getCustomerDetails(this.state.dlNumber);
    }
    handleNewCase() {
        const { customerDetailsObj } = this.state;
        this.props.history.push(
            {
                pathname: `/newcase`,
                state: { detail: customerDetailsObj }
            })
    }
    componentWillReceiveProps(nextProps) {
        debugger;
        if (this.props.cases.customerDetailsObj !== nextProps.cases.customerDetailsObj) {
            if (nextProps.cases.customerDetailsObj !== undefined) {
                this.setState({ customerDetailsObj: nextProps.cases.customerDetailsObj });
            }
        }
    }
    isArchivedRow(record) {
        if (record.Archived) {
            return {

            }
        }
    }
    openModal(record) {
        this.setState({ modalvisible: true });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({ modalvisible: false });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({ modalvisible: false });
    }

    render() {
        debugger;

        const { customerDetailsObj } = this.state;
        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                <div style={{
                    justify: "center",
                    // width: "80%",
                    height: "90%",
                    // border: "1px solid white",
                    padding: "25px",
                    margin: "15px"
                }} >
                    {customerDetailsObj !== undefined ? (
                        <div>
                            <div style={{
                                justify: "center",
                                height: "30px",
                                backgroundColor: "white",
                                border: "3px solid white"
                            }} ><Icon type="idcard" /> <b>{customerDetailsObj.LastName},{customerDetailsObj.FirstName}</b></div>
                            <Row >
                                <Col span={72}>
                                    <div style={{
                                        width: "100%",
                                        height: "90%",
                                        border: "3px solid white",
                                        padding: "25px"
                                    }}>
                                        <Row gutter={64}>
                                            <Col span={6}>
                                                <Row> <b>DL Number</b>:
                                                    <Input value={customerDetailsObj.DLNumber} readOnly />
                                                    {/* <Input value="DL Number" disabled/>  */}
                                                </Row>
                                                <Row> <b>DOB</b>:
                                                    <Input value={customerDetailsObj.DOB} readOnly />
                                                    {/* <Input value="DOB" disabled/>  */}
                                                </Row>
                                            </Col>
                                            <Col span={6}>
                                                <Row> <b>License Class</b>:
                                                    <Input value={customerDetailsObj.classLicense} readOnly />
                                                    {/* <Input value="License Class" disabled/>  */}
                                                </Row>
                                                <Row> <b>Phone Number</b>:
                                                    <Input value={customerDetailsObj.PhoneNumber} readOnly />
                                                    {/* <Input value="Phone Number" disabled/>  */}
                                                </Row>
                                            </Col>
                                            <Col span={6}>
                                                <Row> <b>Address</b>:
                                                    <TextArea rows="3" value={this.state.customerDetailsObj.MailingAddress} readOnly />
                                                    {/* <Input value="AddressAddressAddress" disabled/>  */}
                                                </Row></Col>
                                            <Col span={6}>
                                                <Row>
                                                    <b> FINANCIAL RESPONSIBILITIES: List of Accidents </b>
                                                </Row>
                                                <Row>
                                                    {customerDetailsObj.Accidents.length !== 0 ? <Table
                                                        bordered={false}
                                                        size='small'
                                                        //style= {{align: "center", width: "100%", height: "100%"}}
                                                        scroll={{ y: 200, x: 200 }}
                                                        pagination={false}
                                                        columns={frcolumns}
                                                        dataSource={customerDetailsObj.Accidents}
                                                        rowKey={record => record.CaseNumber}
                                                        showHeader
                                                    /> : <div>{customerDetailsObj.AccidentMessage}</div>
                                                    }
                                                </Row>
                                                {/* </div> */}
                                                {/* </div> */}
                                            </Col>
                                        </Row>
                                        <Row span={16}>
                                            <Col span={8}>
                                                <Row>
                                                    {(customerDetailsObj.D26ValidationOK !== true) && <div><b>D26 Validation Message:</b>{customerDetailsObj.D26ValidationMessage}</div>}
                                                </Row>
                                                <Row>
                                                    {(customerDetailsObj.Message !== null) && <div><b>Message:</b>{customerDetailsObj.Message}</div>}
                                                </Row>
                                                <Row>
                                                    {(customerDetailsObj.ErrorMessage !== null) && <div><b>Message:</b>{customerDetailsObj.ErrorMessage}</div>}
                                                </Row>
                                            </Col>
                                            <Col span={8}>
                                                {customerDetailsObj.DCSDifferences.length > 0 && <div>
                                                    <List
                                                        size="small"
                                                        header={<div><b>DCS Differences</b></div>}
                                                        dataSource={customerDetailsObj.DCSDifferences}
                                                        renderItem={item => (<List.Item>{item}</List.Item>)}
                                                    />
                                                </div>}
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{
                                    justify: "center",
                                    height: "30px",
                                    backgroundColor: "white",
                                    border: "3px solid white"
                                }} ><span><b>CASES</b></span><span style={{ paddingLeft: "90%" }}><Button type="primary" onClick={() => this.handleNewCase()}>Add a Case</Button></span></div>
                                <div style={{
                                    justify: "center",
                                    // width: "80%",
                                    height: "300px",
                                    border: "3px solid white",
                                    padding: "25px"
                                }}>
                                    {customerDetailsObj.cases && <div><Table
                                        bordered={false}
                                        showHeader
                                        rowClassName={(record) => record.Archived === true ? 'archiveRowClass' : ''}
                                        size='small'
                                        style={{ align: "center", width: "100%", height: "300px" }}
                                        scroll={{ y: 200, x: 200 }}
                                        pagination={false}
                                        onRow={(record) => ({
                                            onClick: () => {
                                                debugger;
                                                //  if (record.CaseNumber) {
                                                if (record.CaseStatusCode !== 'CL') {
                                                    this.props.history.push(`/caseDetails/CaseNumber/${record.CaseNumber}`);
                                                }
                                                else {
                                                    //this.props.history.push(`/closedCaseDetails/CaseNumber/${record.CaseNumber}`);
                                                    this.openModal(record);
                                                }
                                                //  }                
                                            }
                                        })}
                                        columns={columns}
                                        dataSource={customerDetailsObj.cases}
                                        rowKey={record => record.CaseNumber}
                                    />
                                    </div>
                                    }
                                </div>
                            </Row>
                            {this.state.modalvisible && <Modal title="Basic Modal"
                                visible={this.state.modalvisible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}> Hi There! </Modal>
                            }
                        </div>
                    ) : (
                            <div><span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span><span style={{ paddingLeft: "2%" }}><font size="large">Loading...</font></span></div>
                        )}
                </div>
            </ScrollPanel>
        );
    }
}


const mapStateToProps = state => {
    return {
        cases: state.cases,
        ui: state.ui
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCustomerDetails,
            showModal

        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));
