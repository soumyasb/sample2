import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "antd";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import MenuItem from "antd/lib/menu/MenuItem";

const { SubMenu } = Menu;

class sider extends Component {
  render() {
    return (
      <div className="siderlayout">
        <ScrollPanel style={{ width: "100%", height: "calc(100% - 100px)" }}>
          <div style={{ paddingRight: "1.5em", lineHeight: "1.5" }}>
            <Menu
              onClick={this.handleClick}
              style={{ width: 240 }}
              defaultSelectedKeys={["0"]}
              mode="inline"
            >
              <MenuItem key="0">
                <NavLink to="/" className="nav-text">
                    Home
                </NavLink>
              </MenuItem>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <span>Cases</span>
                  </span>
                }
              >
                <Menu.Item key="1">New Case</Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/scheduledCases" className='nav-text'>
                    Scheduled Cases
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/unscheduledCases" className='nav-text'>
                    Unscheduled Cases
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <span>Inquiry and Updates</span>
                  </span>
                }
              >
                <Menu.Item key="5">DL Inquiries</Menu.Item>
                <Menu.Item key="6">DL Updates</Menu.Item>
                <Menu.Item key="7">Batch DL Print</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
              <MenuItem key="9">Office Schedules</MenuItem>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <span>Profiles</span>
                  </span>
                }
              >
                <Menu.Item key="10">Employee</Menu.Item>
                <Menu.Item key="11">Hearing Room</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <span>Admin</span>
                  </span>
                }
              >
                <Menu.Item key="13">
                  <NavLink to="/News" className="nav-text">
                    News Items
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="14">Data Manager</Menu.Item>
                <Menu.Item key="15">Admin Tools</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <span>External Apps</span>
                  </span>
                }
              >
                <Menu.Item key="16">FOD Appointments</Menu.Item>
                <Menu.Item key="17">QuickWeb</Menu.Item>
              </SubMenu>
              <MenuItem key="18">About</MenuItem>
            </Menu>
          </div>
        </ScrollPanel>
      </div>
    );
  }
}

export default sider;
