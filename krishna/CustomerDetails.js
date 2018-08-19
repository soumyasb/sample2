import React, { Component } from 'react';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel"
import { getCustomerDetails, getClosedCaseDetail } from "../../../store/actions/caseActions";
import { withRouter } from "react-router-dom";
import { Modal, Popover, List, Table, Button, Icon, Input, Row, Col, Spin, Card } from 'antd';
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
        key: 'Date'
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
        key: 'CaseNumber'
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
            customerDetailsObj: props.cases.customerDetailsObj,
            closedCaseDetail: props.cases.closedCaseDetail
            //  modalvisible: false
        };
        this.openModal = this.openModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
        debugger;
        this.props.getCustomerDetails(this.props.match.params.dlNumber);
    }

    static getDerivedStateFromProps(props, prevState) {
        if (props.cases.customerDetailsObj &&
            props.cases.customerDetailsObj !== prevState.customerDetailsObj) {
            this.setState({ customerDetailsObj: props.cases.customerDetailsObj });
        }
        if (props.cases.closedCaseDetail &&
            props.cases.closedCaseDetail !== prevState.closedCaseDetail) {
            this.setState({ closedCaseDetail: props.cases.closedCaseDetail });
        }
    }

    handleNewCase() {
        const { customerDetailsObj } = this.state;
        this.props.history.push(
            {
                pathname: `/newcase`,
                state: { detail: customerDetailsObj }
            })
    }

    isArchivedRow(record) {
        if (record.Archived) {
            return {

            }
        }
    }
    openModal() {
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
        const boxShadows = {
            boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
        };
        const { customerDetailsObj, closedCaseDetail } = this.state;

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
                                                    <TextArea rows="3" value={customerDetailsObj.MailingAddress} readOnly />
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
                                                if (record.Archived === false) {
                                                    if (record.CaseStatusCode !== 'CL') {
                                                        this.props.history.push(`/caseDetails/CaseNumber/${record.CaseNumber}`);
                                                    }
                                                    else {
                                                        // this.props.history.push(`/closedCaseDetails/CaseNumber/${record.CaseNumber}`);
                                                        this.props.getClosedCaseDetail(record.CaseNumber);
                                                        this.setState({ modalvisible: true });
                                                    }
                                                }
                                                //  }                
                                            },

                                            onMouseEnter: () => {

                                            }

                                        })}
                                        columns={columns}
                                        dataSource={customerDetailsObj.cases}
                                        rowKey={record => record.CaseNumber}
                                    />

                                    </div>
                                    }
                                </div>
                                <div><font color="red" size="small">*</font> <font size="small">The cases highlighted in red are archived.</font></div>
                            </Row>
                            {this.state.modalvisible && <Modal title={"Closed case detail"}
                                visible={this.state.modalvisible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                width={'70%'}>
                                <div>
                                    <Row>
                                        <Col span={32}>
                                            <div>
                                                {/* <div style={{
                                    textAlign: "center",
                                    height: "30px",
                                    width: "80%",
                                    backgroundColor: "white",
                                    paddingLeft: "1%"
                                   }}> <b> CLOSED CASE DETAIL </b></div> */}
                                                <Card
                                                    style={{
                                                        marginTop: "8px",
                                                        borderRadius: "16px",
                                                        //    width: "80%",
                                                        ...boxShadows
                                                    }}
                                                >
                                                    {closedCaseDetail &&
                                                        <div> <div style={{
                                                            justify: "center",
                                                            height: "30px",
                                                            backgroundColor: "#c9e3fa",
                                                            paddingLeft: "1%"
                                                        }} ><b>Subject Information</b></div>
                                                            <div style={{
                                                                justify: "center",
                                                                height: "30px",
                                                                paddingLeft: "1%"
                                                            }}>
                                                                <span style={{ paddingLeft: '0.5%' }}><b>DL # :</b> {closedCaseDetail.DlNumber}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Case # : </b>{closedCaseDetail.CaseNumber}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Name : </b>{closedCaseDetail.SubjectName}</span>
                                                            </div>
                                                        </div>}
                                                </Card>
                                                <Card
                                                    style={{
                                                        marginTop: "8px",
                                                        borderRadius: "16px",
                                                        // width: "80%",
                                                        ...boxShadows
                                                    }}
                                                >
                                                    {closedCaseDetail &&
                                                        <div> <div style={{
                                                            justify: "center",
                                                            height: "30px",
                                                            backgroundColor: "#c9e3fa",
                                                            paddingLeft: "1%"
                                                        }} ><b>DS124 Coding Strip</b></div>
                                                            <div style={{
                                                                justify: "center",
                                                                height: "30px",
                                                                paddingLeft: "1%"
                                                            }}>  <span><b>Type : </b>{closedCaseDetail.Type}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Hearing Date: </b>{closedCaseDetail.HearingDate}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Location: </b>{closedCaseDetail.Location}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Reason: </b>{closedCaseDetail.Reason}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Sched Results: </b>{closedCaseDetail.ScheduledResults}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Type Action: </b>{closedCaseDetail.TypeAction}</span>
                                                                <span style={{ paddingLeft: '5%' }}><b>Modified Date: </b>{closedCaseDetail.ModifiedDate}</span></div>
                                                        </div>}
                                                </Card>
                                                <Card
                                                    style={{
                                                        marginTop: "8px",
                                                        borderRadius: "16px",
                                                        //   width: "80%",
                                                        ...boxShadows
                                                    }}
                                                >
                                                    {closedCaseDetail &&
                                                        <div>
                                                            <div style={{
                                                                justify: "center",
                                                                height: "30px",
                                                                backgroundColor: "#c9e3fa",
                                                                paddingLeft: "1%"
                                                            }} >
                                                                <b>Action Information </b>
                                                            </div>
                                                            <div style={{
                                                                justify: "center",
                                                                height: "60px",
                                                                paddingLeft: "1%"
                                                            }}>
                                                                <div>
                                                                    <span><b>Authority Section: </b>{closedCaseDetail.AuthoritySection1}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Authority Section: </b>{closedCaseDetail.AuthoritySection2}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Authority Section: </b>{closedCaseDetail.AuthoritySection3}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Effective Date: </b>{closedCaseDetail.EffectiveDate}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Through Date: </b>{closedCaseDetail.ThroughDate}</span>
                                                                </div>

                                                                <div>
                                                                    <span><b>Action Term Date : </b>{closedCaseDetail.ActionTermDate}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Mail Date: </b>{closedCaseDetail.MailDate}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Original Authority Section: </b>{closedCaseDetail.OriginalAuthoritySection}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Original Effective Date: </b>{closedCaseDetail.OriginalEffectiveDate}</span>
                                                                </div>
                                                            </div>
                                                        </div>}
                                                </Card>
                                                <Card
                                                    style={{
                                                        marginTop: "8px",
                                                        borderRadius: "16px",
                                                        //    width: "80%",
                                                        ...boxShadows
                                                    }}
                                                >
                                                    {closedCaseDetail &&
                                                        <div> <div style={{
                                                            justify: "center",
                                                            height: "30px",
                                                            backgroundColor: "#c9e3fa",
                                                            paddingLeft: "1%"
                                                        }} > <b>Case Closure Information </b></div>
                                                            <div style={{
                                                                justify: "center",
                                                                height: "60px",
                                                                paddingLeft: "1%"
                                                            }}><div> <span><b>Scheduled To: </b>{closedCaseDetail.ScheduledTo}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Date Updated: </b>{closedCaseDetail.DateUpdated}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Updated By: </b>{closedCaseDetail.UpdatedBy}</span></div>
                                                                <div> <span style={{ paddingLeft: '25%' }}><b>Date Closed: </b>{closedCaseDetail.DateClosed}</span>
                                                                    <span style={{ paddingLeft: '5%' }}><b>Closed By: </b>{closedCaseDetail.ClosedBy}</span>
                                                                </div></div>
                                                        </div>}
                                                </Card>
                                                {/* <div><Button type="primary" style={{marginLeft: "36%", marginTop: "1%"}} size={"small"} onClick={(e) => this.onButtonClick(e,'Back')}>Go Back</Button></div> */}
                                            </div>
                                        </Col>
                                    </Row>
                                </div> </Modal>
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
            getClosedCaseDetail

        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetails));

