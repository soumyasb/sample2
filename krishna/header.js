import React, { Component } from "react";
import { Menu, Icon, Dropdown, Input } from "antd";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

const Search = Input.Search;

class header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searched: '',
    }
  }

  handleSearch(searchText) {
    if (searchText) {
      this.props.history.push(`/search?searchText=${searchText}`);
    }
  }

  render() {
    const userMenu = (
      <Menu>
        <Menu.Item key="0">DS Training</Menu.Item>
        <Menu.Item key="1">Lorem</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">LogOut</Menu.Item>
      </Menu>
    );

    return (
      <div className="headerlayout">
        <div className="headername">
          <h3 className="headertext">DSA REACT</h3>
        </div>
        <div>
          <div className="headerright">
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <a className="ant-dropdown-link">
                <Icon type="idcard" /> {this.props.homePage.loginId} <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <div className="headerleft">
            <Search
              placeholder="Search Case..."
              onSearch={value => { this.handleSearch(value); }}
              enterButton
            />
            {this.state.searched && <Redirect to='/Search' />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    homePage: state.homePage
  };
};

export default withRouter(connect(mapStateToProps)(header));
