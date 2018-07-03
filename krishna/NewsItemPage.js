import React, { Component } from "react";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initNewsItemPage, getCreateNewsItemObj } from "../../../../store/actions/newsItemActions";
import { Table, Button } from 'antd';
import { showModal } from "../../../../store/actions/uiActions";
import moment from "moment";
import NewsModal from './NewsModal';
import createNewsItemObj from '../../../../mocks/createnewsitem.json';

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
                render: (text, item) => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <a onClick={e => this.showModal(e, 'edit', item.newsId)}>Edit</a>
                            <br/><a onClick={e => this.showModal(e, 'details', item.newsId)}>Details</a>
                            <br/><a onClick={e => this.showModal(e, 'delete', item.newsId)}>Delete</a>
                        </div>
                    );
                },
            },
        ];

        this.state = {
            newsItemObj: createNewsItemObj,
        }

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    componentWillMount() {
        this.props.initNewsItemPage();
    }

    showModal(e, actype, newsId) {
        this.props.showModal(true, actype);
        
        if(newsId) {
            const newsItemObj = this.props.newsItem.list.find(n => n.newsId === newsId);
            this.setState({ newsItemObj }); 
        }
    }

    handleOk(e) {
        this.props.showModal(false);
    }

    handleCancel(e) {
        this.props.showModal(false);
    }

    render() {
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
                        dataSource={this.props.newsItem.list}
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
            initNewsItemPage,
            getCreateNewsItemObj,
            showModal
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItemPage);
