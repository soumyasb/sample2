import React, { Component } from "react";

import {
  Row,
  Col,
  Card,
  Spin,
  Modal,
  Collapse,
  Badge,
  notification,
  Table
} from "antd";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Slider from "react-slick";
import moment from "moment";
import { initHomePage } from "../../../store/actions/homePageActions";
import { setNewsModal, setNewsIdx } from "../../../store/actions/uiActions";

class homepage extends Component {
  localState = {};

  componentWillMount() {
    this.props.initHomePage();
  }

  showModal = (e, idx) => {
    this.props.setNewsModal(true);
    this.props.setNewsIdx(idx);
  };
  handleOk = e => {
    this.props.setNewsModal(false);
  };
  handleCancel = e => {
    this.props.setNewsModal(false);
  };
  handleRowClick = e => {
    this.props.history.push(`/casedetails/caseId/${e.cD_CASE}`);
  }

  render() {
    const { homePage } = this.props;
    const newsChars = 250;

    const boxShadows = {
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
    };

    const welcome =
      this.props.homePage.firstName !== undefined ? (
        <div>
          <h2>
            {"Welcome, " +
              this.props.homePage.firstName +
              " " +
              this.props.homePage.lastName +
              "!"}
          </h2>
          <h3>
            {"Your current office is " +
              this.props.homePage.office.nmeOff +
              " | " +
              this.props.homePage.office.cdOffId}
          </h3>
        </div>
      ) : (
        <Spin size="large" />
      );

    const listData =
      homePage.news !== undefined
        ? homePage.news.map((i, idx) => (
            <div key={idx}>
              <Card
                style={{
                  height: "280px",
                  borderRadius: "16px",
                  marginRight: "1px"
                }}
              >
                <h2>{i.subject}</h2>
                <h4>
                  {"by: " +
                    i.authorName +
                    " | priority: " +
                    (i.priority === "A" ? "Urgent" : "Normal") +
                    " | date: " +
                    i.createDate.slice(0, 10)}
                </h4>
                <p>
                  {i.newsText.length > newsChars &&
                    i.newsText.slice(0, newsChars) + "..."}
                  {i.newsText.length <= newsChars &&
                    i.newsText.slice(0, newsChars)}
                </p>
                <a
                  href="#"
                  onClick={e => this.showModal(e, idx)}
                  style={{ color: "blue" }}
                >
                  {i.newsText.length > newsChars && "Read More..."}
                  {i.newsText.length <= newsChars && ""}
                </a>
              </Card>
            </div>
          ))
        : "";

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      autoplaySpeed: 5000
      // beforeChange: function(currentSlide, nextSlide) {
      //   console.log("before change", currentSlide, nextSlide);
      // },
      // afterChange: function(currentSlide) {
      //   console.log("after change", currentSlide);
      // }
    };

    const columns = [
      {
        title: 'Case #',
        dataIndex: 'cD_CASE',
        key: 'cD_CASE',
      }, {
        title: 'DL #',
        dataIndex: 'nbR_DL',
        key: 'nbR_DL',
      }, {
        title: 'Subject Name',
        dataIndex: 'nmE_SURNME_PRSN',
        key: 'nmE_SURNME_PRSN',
      }, {
        title: 'Due Date',
        dataIndex: 'dT_SUSP',
        key: 'dT_SUSP',
        render: (text) => moment(text).format("MMM Do YYYY")
      }, {
        title: 'Reason',
        dataIndex: 'cD_RSN',
        key: 'cD_RSN',
      }, {
        title: 'Description',
        dataIndex: 'desC_SUSP_RSN',
        key: 'dT_SUSP',
      }
    ];

    const openNotificationWithIcon = (e, type) => {
      notification[type]({
        message: "Selected Suspense Case",
        description: "You selected case #" + e.cD_CASE
      });
    };
    return (
      <ScrollPanel
        style={{
          width: "100%",
          height: "calc(100% - 40px)",
          backgroundColor: "rgba(0,0,0,0)"
        }}
      >
        <Col lg={24} xl={{ span: 22, offset: 1 }} xxl={{ span: 20, offset: 2 }}>
          <div style={{ paddingRight: "1.5em", lineHeight: "1.5" }}>
            <Card
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              bordered={false}
              bodyStyle={{ padding: "5px" }}
            >
              <Row gutter={12}>
                <Col span={12}>
                  <Card
                    style={{
                      borderRadius: "16px",
                      height: "400px",
                      ...boxShadows
                    }}
                  >
                    {welcome}
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    style={{
                      borderRadius: "16px",
                      height: "400px",
                      overflow: "hidden",
                      ...boxShadows
                    }}
                    title="News"
                    bodyStyle={{
                      padding: "5px 30px"
                    }}
                  >
                    <Slider {...settings}>{listData}</Slider>
                  </Card>

                  <Modal
                    title={
                      homePage.news !== undefined ? (
                        <h2>{homePage.news[this.props.ui.newsIdx].subject}</h2>
                      ) : (
                        ""
                      )
                    }
                    visible={this.props.ui.newsModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <h3>
                      {homePage.news !== undefined
                        ? "by: " +
                          homePage.news[this.props.ui.newsIdx].authorName +
                          " | date: " +
                          moment(
                            homePage.news[this.props.ui.newsIdx].createDate
                          ).format("MMM Do YYYY") +
                          " | priority: " +
                          (homePage.news[this.props.ui.newsIdx].priority === "A"
                            ? "Urgent"
                            : "Normal")
                        : ""}
                    </h3>
                    <p>
                      {homePage.news !== undefined
                        ? homePage.news[this.props.ui.newsIdx].newsText
                        : ""}
                    </p>
                  </Modal>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card
                    style={{
                      marginTop: "8px",
                      borderRadius: "16px",
                      ...boxShadows
                    }}
                  >
                    <Collapse defaultActiveKey={['1']}>
                      <Collapse.Panel
                        header={
                          <div>
                            <h3>
                              Suspense Cases{" "}
                              <Badge count={homePage.suspenseCount} />
                            </h3>
                          </div>
                        }
                        key="1"
                      >
                        <Table
                          columns={columns}
                          pagination={{ pageSize: 5 }}
                          onRowClick={(e) => this.handleRowClick(e)} 
                          dataSource={homePage.suspense} />
                      </Collapse.Panel>
                    </Collapse>
                  </Card>
                </Col>
              </Row>
            </Card>
          </div>
        </Col>
      </ScrollPanel>
    );
  }
}

const mapStateToProps = state => {
  return {
    homePage: state.homePage,
    ui: state.ui
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      initHomePage,
      setNewsModal,
      setNewsIdx
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(homepage));
