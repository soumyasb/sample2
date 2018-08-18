import React, { Component } from 'react';
import { getUnScheduledCases } from "../../../store/actions/caseActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, Table } from 'antd';
import moment from "moment";

class UnScheduledCases extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unScheduledCasesList: this.props.cases.unScheduledCasesList
        };
    }

    componentDidMount() {
        this.props.getUnScheduledCases(285, 1);
    }

    static getDerivedStateFromProps(props, prevState) {
        const unScheduledCasesList = props.cases.unScheduledCasesList;

        if (unScheduledCasesList && unScheduledCasesList !== prevState.unScheduledCasesList) {
            return {
                unScheduledCasesList
            };
        }

        return null;
    }

    render() {
        console.log(JSON.parse(sessionStorage.getItem('userInfo')));
        const columns = [
            {
                title: 'Status',
                dataIndex: 'CD_STATUS_REC',
                key: 'CD_STATUS_REC',
                sorter: (a, b) => { return a.CD_STATUS_REC.localeCompare(b.CD_STATUS_REC) }
            }, {
                title: 'Receipt Date',
                dataIndex: 'DT_RCPT',
                key: 'DT_RCPT',
                render: (text) => moment(text).format("MMM Do YYYY"),
                sorter: (a, b) => { return a.DT_RCPT.localeCompare(b.DT_RCPT) }
            }, {
                title: 'Location',
                dataIndex: 'CD_FLD_DSO_ALPHA',
                key: 'CD_FLD_DSO_ALPHA',
                sorter: (a, b) => { return a.CD_FLD_DSO_ALPHA.localeCompare(b.CD_FLD_DSO_ALPHA) }
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
                title: 'Name',
                key: 'Name',
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
                title: 'Case',
                dataIndex: 'CD_CASE',
                key: 'CD_CASE',
                sorter: (a, b) => { return a.CD_CASE.localeCompare(b.CD_CASE) }
            },
        ];

        const boxShadows = {
            boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
        };

        return (
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
                            {this.state.unScheduledCasesList && <Table
                                rowKey='CD_CASE'
                                title={() => <div><span><h1>Unscheduled Cases</h1></span></div>}
                                footer={() => <p>{this.state.unScheduledCasesList.length} cases scheduled</p>}
                                showHeader
                                columns={columns}
                                dataSource={this.state.unScheduledCasesList}
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
            getUnScheduledCases
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UnScheduledCases);