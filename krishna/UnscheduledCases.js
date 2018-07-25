import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, Table } from 'antd';
import moment from "moment";
import unschedData from '../../../../../mocks/getunscheduledcases.json';

class UnscheduledCases extends Component {
    constructor(props) {
        super(props);

        this.state={
            unScheduledCasesList: unschedData.results,//this.props.case.unScheduledCasesList
        };
    }    

    render() {
        const columns =[
            {
                title: 'Status',
                dataIndex: 'CD_STATUS_REC',
                key: 'CD_STATUS_REC',
            }, {
                title: 'Receipt Date',
                dataIndex: 'DT_RCPT',
                key: 'DT_RCPT',
                render: (text) => moment(text).format("MMM Do YYYY"),
            }, {
                title: 'Location',
                dataIndex: 'CD_FLD_DSO_ALPHA',
                key: 'CD_FLD_DSO_ALPHA',
            }, {
                title: 'Type',
                dataIndex: 'CD_HRNG_TYP',
                key: 'CD_HRNG_TYP',
            }, {
                title: 'Reason',
                dataIndex: 'CD_RSN',
                key: 'CD_RSN',
            }, {
                title: 'Name',
                key: 'Name',
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
                title: 'Case',
                dataIndex: 'CD_CASE',
                key: 'CD_CASE',
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

export default connect(mapStateToProps, mapDispatchToProps)(UnscheduledCases);