import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon, Dropdown, Input } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MenuItem from "antd/lib/menu/MenuItem";
import { initHomePage } from "../store/actions/homePageActions";
import { bindActionCreators } from "redux";

const Search = Input.Search;

class header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerDetailsObj: ""
    };
  }
  componentDidMount() {
    this.props.initHomePage();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.cases !== nextProps.cases) {
      this.setState({ customerDetailsObj: nextProps.cases.customerDetailsObj })
    }
    !sessionStorage.getItem('userInfo') && sessionStorage.setItem('userInfo', JSON.stringify(nextProps.homePage));
  }


  handleSearch(searchText) {
    if (searchText) {
      //this.props.history.push(`/search?searchText=${searchText}`);
      this.props.history.push(`/search/searchText/${searchText}`);
    }
  }

  render() {
    let userInfo = "";
    if (sessionStorage.getItem('userInfo')) {
      userInfo = JSON.parse(sessionStorage.getItem('userInfo')).LoginId;
    }
    const userMenu = (
      <Menu>
        <Menu.Item key="0">DS Training</Menu.Item>
        <Menu.Item key="1">Lorem</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">LogOut</Menu.Item>
      </Menu>
    );

    const caseMenu = (
      <Menu>
        {this.state.customerDetailsObj !== "" &&
          <Menu.Item key="1"><NavLink to="/newcase" className='nav-text'>
            New Case
                  </NavLink></Menu.Item>
        }

        <Menu.Item key="2">    <NavLink to="/ScheduledCases" className='nav-text'>
          Scheduled Cases
                  </NavLink> </Menu.Item>
        <Menu.Item key="3"><NavLink to="/UnScheduledCases" className='nav-text'>
          Unscheduled Cases
                   </NavLink>
        </Menu.Item>
      </Menu>
    );

    const inquiryMenu = (
      <Menu>
        <Menu.Item key="1">DL Inquiries</Menu.Item>
        <Menu.Item key="2">DL Updates</Menu.Item>
        <Menu.Item key="3">Batch DL Print</Menu.Item>
        <Menu.Item key="4">Option 8</Menu.Item>
      </Menu>
    );

    const profileMenu = (
      <Menu>
        <Menu.Item key="1">
          <NavLink to="/employeeappointment" className='nav-text'>
            Employee
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/hearingroom" className='nav-text'>
            Hearing Room
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">Option 12</Menu.Item>
      </Menu>
    );

    const adminMenu = (
      <Menu>
        <Menu.Item key="1">
          <NavLink to="/News" className="nav-text">
            News Items
      </NavLink>
        </Menu.Item>
        <Menu.Item key="2">Data Manager</Menu.Item>
        <Menu.Item key="3">Admin Tools</Menu.Item>
      </Menu>
    );

    const extAppsMenu = (
      <Menu>
        <Menu.Item key="16">FOD Appointments</Menu.Item>
        <Menu.Item key="17">QuickWeb</Menu.Item>
      </Menu>
    );

    // const header = props => (
    return (
      <div className="headerlayout">
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={["0"]}
          mode="horizontal"
        >
          <Menu.Item key="1">
            <h1>DRIVER SAFETY</h1>

          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/" className="nav-text">
              <b>Home</b>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <Dropdown overlay={caseMenu} trigger={["click"]}>
              <a className="ant-dropdown-link">
                <b>Cases</b> <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="4">
            <Dropdown overlay={inquiryMenu} trigger={["click"]}>
              <a className="ant-dropdown-link">
                <b>Inquiry and Updates</b> <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="5"><b>Office Schedules</b></Menu.Item>
          <Menu.Item key="6">
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <a className="ant-dropdown-link">
                <b> Profiles</b> <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="7">
            <Dropdown overlay={adminMenu} trigger={["click"]}>
              <a className="ant-dropdown-link">
                <b>Admin</b> <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="8">
            <Dropdown overlay={extAppsMenu} trigger={["click"]}>
              <a className="ant-dropdown-link">
                <b>External Apps</b> <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="9"><b>About</b></Menu.Item>
          {/* <Menu.Item key="i1"><b></b></Menu.Item>
              <Menu.Item key="i2"><b></b></Menu.Item>
              <Menu.Item key="i3"><b></b></Menu.Item> */}
          <Menu.Item style={{ paddingLeft: "12%" }} key="10">
            <div>
              <Search
                placeholder="Search Case..."
                onSearch={value => { this.handleSearch(value); }}
                enterButton
              />
            </div>
          </Menu.Item>
          <MenuItem key="11">
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <a className="ant-dropdown-link">
                <Icon type="user" /> {userInfo} <Icon type="down" />
              </a>
            </Dropdown>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      initHomePage,
    },
    dispatch
  );
};
const mapStateToProps = state => {
  return {
    homePage: state.homePage,
    cases: state.cases
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(header));
