import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initNewsItemPage, getNewsItemPage } from "../../../../store/actions/newsItemActions";
import { Input, Table, Icon, Switch, Radio, Divider, Form, Modal, Button } from 'antd';
import { showModal } from "../../../../store/actions/uiActions";
import moment, { calendarFormat } from "moment";
import NewsModal from './NewsModal';

const data = [];

const FormItem = Form.Item;

const title = () => 'News Items';
const showHeader = true;
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

class NewsItemPage extends Component {
    
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Author Name',
                dataIndex: 'authorName',
                width: '10%',
                key: 'authorName'
                
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                width: '5%',
                key: 'priority'

            },
            {
                title: 'Subject',
                dataIndex: 'subject',
                width: '10%',
                key: 'subject'
            },
            {
                title: 'News Text',
                dataIndex: 'newsText',
                width: '50%',
                key: 'newsText',
                render: (newsText) => 
                {
                    return <div style={{wordBreak: "keep-all"}}><p>{newsText}</p></div>
                }

            },
            {
                title: 'Create Date',
                dataIndex: 'createDate',
                width: '7%',
                key: 'createDate',
                render: (createDate) =>
                    moment(createDate).format("MM/DD/YYYY")
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                width: '7%',
                key: 'startDate',
                render: (startDate) =>
                    moment(startDate).format("MM/DD/YYYY")
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                width: '7%',
                key: 'endDate',
                render: (endDate) =>
                moment(endDate).format("MM/DD/YYYY")
            },
            {
                 width: '4%',
                render: () => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <a onClick={e => this.showModal(e, 'edit')}>Edit</a>
                            <br/><a onClick={e => this.showModal(e, 'details')}>Details</a>
                            <br/><a onClick={e => this.showModal(e, 'delete')}>Delete</a>
                        </div>
                    );
                },
            },
        ];

        this.state = {
            newsItemObj: null,
        }

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    componentWillMount() {
        this.props.initNewsItemPage();
        //this.setState({newsItem:data});
    }

    showModal(e, actype) {
        this.props.showModal(true, actype);
    }

    handleOk(e) {
        this.props.showModal(false);
    }

    handleCancel(e) {
        this.props.showModal(false);
    }

    render() {
        const newsItemProps = this.props.newsItem;
        const result = Object.keys(newsItemProps).map(function (key) {
            return newsItemProps[key];
        });
        console.log(result);
        this.state = {result};

        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                    // inputType: col.dataIndex,
                    // dataIndex: col.dataIndex,
                    title: col.title
                }),
            };
        });

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "calc(100% - 40px)",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                <div>
                    <Table
                        size= {"small"}
                        rowKey = "newsId"
                        title={() => <div>
                            <h4>News Items</h4> 
                            <div><Button type="primary" onClick={(e) => this.showModal(e,'create')}>Create New</Button></div>
                        </div>} 
                        showHeader = {true}
                        bordered
                        expandRowByClick={true}
                        dataSource={this.state.result}
                        expandedRowRender={record => <p style={{ margin:10 }}>{record.newsText}</p>}
                        columns={columns}
                        pagination={{ pageSize: 8}}
                        scroll={{ y: 800, x: 800 }}
                    />
                </div>
                <NewsModal 
                    modalVisible={this.props.ui.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    actionType={this.props.ui.actionType}
                    newsItemObj={this.state.newsItemObj}
                />
             </ScrollPanel>
        );
    }
}

const mapStateToProps = state => {
    return {
        newsItem: state.newsItem,
        ui: state.ui
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getNewsItemPage,
            initNewsItemPage,
            showModal
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItemPage);
