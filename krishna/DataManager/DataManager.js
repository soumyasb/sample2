import React, { Component } from 'react';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";

import { Layout, Menu, Row, Col, Icon } from 'antd';

import Employees from './Employees';
import ActivityType from './ActivityType';
import DefaultHearingTime from './DefaultHearingTime';
import Holidays from './Holidays';
import Languages from './Languages';
import Offices from './Offices';

import './style.css';

const { Content, Sider } = Layout;

const RENDER_BY_TYPE = {
    Employees: <Employees />,
    ActivityType: <ActivityType />,
    DefaultHearingTime: <DefaultHearingTime />,
    Holidays: <Holidays />,
    Languages: <Languages />,
    Offices: <Offices />
};

class DataManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabValue: 'Employees'
        };

        this.handleLeftNavClick = this.handleLeftNavClick.bind(this);
    }

    handleLeftNavClick(e) {
        this.setState({
            tabValue: e.key
        });
    }

    render() {
        return (<div>
            <ScrollPanel style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0)" }}>
                <Layout style={{ height: '100%' }}>
                    <Content>
                        <Layout style={{ height: '100%', background: '#fff' }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={[this.state.tabValue]}
                                    defaultOpenKeys={['1']}
                                    style={{ height: '100%' }}
                                    onClick={this.handleLeftNavClick}
                                >
                                    <Menu.Item key="Employees">
                                        <span>Employees</span>
                                    </Menu.Item>
                                    <Menu.Item key="ActivityType">
                                        <span>Activity Type</span>
                                    </Menu.Item>
                                    <Menu.Item key="DefaultHearingTime">
                                        <span>Default Hearing Time</span>
                                    </Menu.Item>
                                    <Menu.Item key="Holidays">
                                        <span>Holidays</span>
                                    </Menu.Item>
                                    <Menu.Item key="Languages">
                                        <span>Languages</span>
                                    </Menu.Item>
                                    <Menu.Item key="Offices">
                                        <span>Offices</span>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Content style={{ height: "600px" }}>
                                <Row>
                                    <Col span={24}>
                                        {RENDER_BY_TYPE[this.state.tabValue]}
                                    </Col>
                                </Row>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </ScrollPanel>
        </div>);
    }
}

export default DataManager;