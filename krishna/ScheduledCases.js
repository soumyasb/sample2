import React, { Component } from 'react';
import { getScheduledCases } from "../../../store/actions/caseActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, Table } from 'antd';
import moment from "moment";

class ScheduledCases extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduledCasesList: this.props.cases.scheduledCasesList,
        };
    }

    componentDidMount() {
        this.props.getScheduledCases(285, 1);
    }

    static getDerivedStateFromProps(props, prevState) {
        const scheduledCasesList = props.cases.scheduledCasesList;

        if (scheduledCasesList !== undefined && scheduledCasesList !== prevState.scheduledCasesList) {
            return { scheduledCasesList };
        }

        return null;
    }

    render() {
        // console.log(JSON.parse(localStorage.getItem('userInfo')));
        const columns = [
            {
                title: 'Status',
                dataIndex: 'CD_STATUS_REC',
                key: 'CD_STATUS_REC',
                sorter: (a, b) => { return a.CD_STATUS_REC.localeCompare(b.CD_STATUS_REC) }
            }, {
                title: 'Sched Date',
                dataIndex: 'dt_Cntct_Strt_Tim',
                key: 'dt_Cntct_Strt_Tim',
                render: (text) => moment(text).format("MMM Do YYYY"),
                sorter: (a, b) => { return a.dt_Cntct_Strt_Tim.localeCompare(b.dt_Cntct_Strt_Tim) }
            }, {
                title: 'Driver Name',
                key: 'DriverName',
                render: (text, record) => (
                    <span>
                        {`${record.PersonFirstName} ${record.PersonLastName}`}
                    </span>
                ),
                sorter: (a, b) => {
                    const driverNameA = a.PersonFirstName + ' ' + a.PersonLastName;
                    const driverNameB = b.PersonFirstName + ' ' + b.PersonLastName;

                    return driverNameA.trim().localeCompare(driverNameB.trim());
                }
            }, {
                title: 'DL Number',
                dataIndex: 'NBR_DL',
                key: 'NBR_DL',
                sorter: (a, b) => { return a.NBR_DL.localeCompare(b.NBR_DL) }
            }, {
                title: 'Sched Time',
                dataIndex: 'dt_Cntct_Strt_Tim',
                key: 'timeHoursMins',
                render: (text) => moment(text).format('hh:mm A')
            }, {
                title: 'Location',
                dataIndex: 'cd_Off_Abbr',
                key: 'cd_Off_Abbr',
                sorter: (a, b) => { return a.cd_Off_Abbr.localeCompare(b.cd_Off_Abbr) }
            }, {
                title: 'Type',
                dataIndex: 'CD_HRNG_TYP',
                key: 'CD_HRNG_TYP',
                sorter: (a, b) => { return a.CD_HRNG_TYP.localeCompare(b.CD_HRNG_TYP) }
            }, {
                title: 'Reason',
                dataIndex: 'CD_RSN',
                key: 'CD_RSN',
                sorter: (a, b) => { return a.CD_RSN.localeCompare(b.CD_RSN) }
            }, {
                title: 'Hearing Officer',
                key: 'HearingOfficer',
                render: (text, record) => (
                    <span>
                        {`${record.EmployeeFirstName} ${record.EmployeeLastName}`}
                    </span>
                ),
                sorter: (a, b) => {
                    const employeeNameA = a.EmployeeFirstName + ' ' + a.EmployeeLastName;
                    const employeeNameB = b.EmployeeFirstName + ' ' + b.EmployeeLastName;

                    return employeeNameA.localeCompare(employeeNameB);
                }

            }, {
                title: 'Case',
                dataIndex: 'CD_CASE',
                key: 'CD_CASE',
                sorter: (a, b) => { return a.CD_CASE.localeCompare(b.CD_CASE) },
            }
        ];

        const boxShadows = {
            boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
        };

        return (
            <div>
                {this.state.TEST}
                <Row>
                    <Col span={24}>
                        <Card
                            style={{
                                marginTop: "8px",
                                borderRadius: "16px",
                                ...boxShadows
                            }}
                        >
                            {this.state.scheduledCasesList && <Table
                                rowKey='CD_CASE'
                                title={() => <div><span><h1>Scheduled Cases</h1></span></div>}
                                footer={() => <p>{this.state.scheduledCasesList.length} cases scheduled</p>}
                                showHeader
                                columns={columns}
                                dataSource={this.state.scheduledCasesList}
                                pagination={{ pageSize: 8 }} />
                            }
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}


const mapStateToProps = state => {
    return {
        cases: state.cases
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getScheduledCases
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledCases);