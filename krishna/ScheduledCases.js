import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, Table } from 'antd';
import moment from "moment";
import schedData from '../../../../../mocks/getscheduledcases.json';

class ScheduledCases extends Component {
    constructor(props) {
        super(props);

        this.state={
            scheduledCasesList: schedData.results, //this.props.case.scheduledCasesList
        };
    }    

    render() {
        const columns =[
            {
                title: 'Status',
                dataIndex: 'CD_STATUS_REC',
                key: 'CD_STATUS_REC',
            }, {
                title: 'Sched Date',
                dataIndex: 'dt_Cntct_Strt_Tim',
                key: 'dt_Cntct_Strt_Tim',
                render: (text) => moment(text).format("MMM Do YYYY"),
            }, {
                title: 'Driver Name',
                key: 'DriverName',
                render: (text, record) => (
                    <span>
                        {`${record.PersonFirstName} ${record.PersonLastName}`}
                    </span>
                ),
            }, {
                title: 'DL Number',
                dataIndex: 'NBR_DL',
                key: 'NBR_DL',
            }, {
                title: 'Sched Time',
                dataIndex: 'dt_Cntct_Strt_Tim',
                render: (text) => moment(text).format('hh:mm A'),
            }, {
                title: 'Status',
                dataIndex: 'CD_STATUS_REC',
                key: 'CD_STATUS_REC',
            }, {
                title: 'Location',
                dataIndex: 'cd_Off_Abbr',
                key: 'cd_Off_Abbr',
            }, {
                title: 'Type',
                dataIndex: 'CD_HRNG_TYP',
                key: 'CD_HRNG_TYP',
            }, {
                title: 'Reason',
                dataIndex: 'CD_RSN',
                key: 'CD_RSN',
            }, {
                title: 'Hearing Officer',
                key: 'HearingOfficer',
                render: (text, record) => (
                    <span>
                        {`${record.EmployeeFirstName} ${record.EmployeeLastName}`}
                    </span>
                ),
            }, {
                title: 'Case',
                dataIndex: 'CD_CASE',
                key: 'CD_CASE',
            }
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
                        {this.state.scheduledCasesList && <Table 
                            rowKey='CD_CASE'
                            title={() => <div><span><h1>Scheduled Cases</h1></span></div>} 
                            footer={() => <p>{this.state.scheduledCasesList.length} cases scheduled</p>} 
                            showHeader 
                            columns={columns} 
                            dataSource={this.state.scheduledCasesList}
                            pagination={{ pageSize: 10 }} />
                        }
                    </Card>
                </Col>
            </Row>
        </div>);
    }    
}

    
const mapStateToProps = state => {
    return {
       case: state.case
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            //actions needed
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledCases);