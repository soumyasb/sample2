import React, { Component } from 'react';
import { searchCases } from '../../../../../store/actions/caseActions';
import { Card, Row, Col, Button, Icon, Menu } from 'antd';
import MenuItem from "antd/lib/menu/MenuItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class CaseDetails extends Component {
    constructor(props) {
        super(props);

        this.state={
            // whatever the props needed
        };
    }    

    render() {
      const boxShadows = {
        boxShadow: 
          "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
      };

      return (
        <div>
          <Col lg={24} xl={{ span: 22, offset: 1 }} xxl={{ span: 20, offset: 2 }}>
            <div style={{ paddingRight: "1.5em", lineHeight: "1.5" }}>
              <Card style={{
                        borderRadius: "16px",
                        margin: '10px 5px 0 5px',
                        ...boxShadows
                      }}>
                <h1>
                  <Icon type="idcard" /> Vincent George
                </h1>
                <h4>
                  DL Number: I0000000 &nbsp;&nbsp;&nbsp;
                  Case: SAC0909090909
                </h4>
              </Card>
              <Card
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
                bordered={false}
                bodyStyle={{ padding: "5px" }}
              >
                <Row gutter={12}>
                  <Col span={4}>
                    <Card
                      style={{
                        borderRadius: "16px",
                        ...boxShadows
                      }}
                      bodyStyle={{ padding: 0, borderRadius: '16px' }}
                    >
                      <Menu
                        style={{ borderRadius: '16px' }}
                        defaultSelectedKeys={["0"]}
                        mode="inline"
                      >
                        <MenuItem key="0" style={{ borderRadius: 'inherit' }}><Icon type="profile" />Case Detail</MenuItem>
                        <MenuItem key="1" style={{ borderRadius: 'inherit' }}><Icon type="team" />OIP</MenuItem>
                        <MenuItem key="2" style={{ borderRadius: 'inherit' }}><Icon type="solution" />Comments</MenuItem>
                        <MenuItem key="3" style={{ borderRadius: 'inherit' }}><Icon type="schedule" />Schedule</MenuItem>
                        <MenuItem key="4" style={{ borderRadius: 'inherit' }}><Icon type="red-envelope" />Closure</MenuItem>
                        <MenuItem key="5" style={{ borderRadius: 'inherit' }}><Icon type="pause" />Suspense</MenuItem>
                        <MenuItem key="6" style={{ borderRadius: 'inherit' }}><Icon type="file-text" />DAD-H6</MenuItem>
                      </Menu>
                    </Card>
                  </Col>
                  <Col span={20}>
                    <Card
                      style={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        ...boxShadows
                      }}
                      title={<div style={{ display: 'flex' }}>
                        <div style={{ flex: 3 }}>
                          <h2><Icon type="profile" />&nbsp;Case Detail</h2>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Button style={{ margin: '5px' }}><Icon type="edit" />Edit</Button>
                          <Button style={{ margin: '5px' }}><Icon type="delete" />Delete</Button>
                          <Button type="primary" disabled={true} style={{ margin: '5px' }}><Icon type="save" />Save</Button>
                        </div>
                      </div>}
                      bodyStyle={{
                        padding: "5px 30px"
                      }}
                    >
                      <div style={{display: 'flex' }}>
                        <div>
                          <div>
                              DOB
                              Input
                          </div>
                          <div>
                              DL Number
                              Input
                          </div>
                          <div>
                              License Class
                              Input
                          </div>
                          <div>
                              Phone
                              Input
                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>
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
           // Whatever the actions needed 
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetails);