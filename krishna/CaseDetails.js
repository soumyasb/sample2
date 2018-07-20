import React, { Component } from 'react';
import { searchCases } from '../../../../../store/actions/caseActions';
import { Card, Row, Col, Button, Icon, Menu, Input, Form, Select } from 'antd';
import MenuItem from "antd/lib/menu/MenuItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const FormItem = Form.Item;
const { Option } = Select;

class CaseDetails extends Component {
    constructor(props) {
        super(props);

        this.state={
          editMode: false,
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }    

    handleEdit() {
      this.setState({ editMode: true });
    }

    handleSave() {
      this.setState({ editMode: false });

      // API call to save the Case....
    }

    render() {
      const boxShadows = {
        boxShadow: 
          "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
      };

      const { editMode } = this.state;

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
                          <Button style={{ margin: '5px' }} onClick={this.handleEdit} disabled={editMode}><Icon type="edit" />Edit</Button>
                          <Button style={{ margin: '5px' }}><Icon type="delete" />Delete</Button>
                          <Button type="primary" disabled={!editMode} onClick={this.handleSave} style={{ margin: '5px' }}><Icon type="save" />Save</Button>
                        </div>
                      </div>}
                      bodyStyle={{
                        padding: "5px 30px"
                      }}
                    >
                      <Form className="ant-advanced-search-form">
                        <Col span={7}>
                          <Row gutter={12}>
                            <FormItem label={`Date of Birth`}>
                              <Input placeholder="Date of Birth" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`DL Number`}>
                              <Input placeholder="DL Number" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`License Class`}>
                              <Input placeholder="License Class" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Phone Number`}>
                              <Input placeholder="Phone Number" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Mailing Address`}>
                              <Input.TextArea placeholder="Mailing Address" rows="6" disabled={!editMode} />
                            </FormItem>
                          </Row>
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                          <Row gutter={12}>
                            <FormItem label={`Case Number`}>
                              <Input placeholder="Case Number" disabled={!editMode} />
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Received Date`}>
                              <Input placeholder="Received Date" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Case Status`}>
                              <Input placeholder="Case Status" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Hearing Type`}>
                              <Select placeholder='Hearing Type' disabled={!editMode}>
                                <Option value="0">0 - Telephone interview</Option>
                                <Option value="1">1 - Departmental Review</Option>
                                <Option value="2">2 - Interview</Option>
                                <Option value="3">3 - Re-examination</Option>
                                <Option value="4">4 - Hearing</Option>
                              </Select>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Reason`}>
                              <Input placeholder="Reason" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Referral`}>
                              <Input placeholder="Referral" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                          <Row gutter={12}>
                            <FormItem label={`Special Cert/Endorsement`}>
                              <Input placeholder="Special Cert/Endorsement" disabled={!editMode}/>
                            </FormItem>
                          </Row>
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                        </Col>
                      </Form>

                      {/* <div style={{display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                          <div>
                              DOB
                              <Input />
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
                        <div style={{ flex: 1 }}>
                          <div>
                              Case Number
                              Input
                          </div>
                        </div>
                      </div> */}
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