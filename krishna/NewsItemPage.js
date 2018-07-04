import React, { Component } from "react";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initNewsItemPage } from "../../../../store/actions/newsItemActions";
import { Table, Button, Icon, Divider } from 'antd';
import { showModal } from "../../../../store/actions/uiActions";
import moment from "moment";
import NewsModal from './NewsModal';
import createNewsItemObj from '../../../../mocks/createnewsitem.json';

class NewsItemPage extends Component {
    
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Author',
                dataIndex: 'authorName',
                width: '6%',
                key: 'authorName'
                
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                width: '6%',
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
                width: '42%',
                key: 'newsText',
                render: (newsText) => 
                {
                    return <div style={{wordBreak: "keep-all"}}><p>{newsText}</p></div>
                }
            },
            {
                title: 'Create Date',
                dataIndex: 'createDate',
                width: '8%',
                key: 'createDate',
                render: (createDate) =>
                    moment(createDate).format("MM/DD/YYYY")
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                width: '8%',
                key: 'startDate',
                render: (startDate) =>
                    moment(startDate).format("MM/DD/YYYY")
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                width: '8%',
                key: 'endDate',
                render: (endDate) =>
                moment(endDate).format("MM/DD/YYYY")
            },
            {
                render: (item) => {
                    return (
                        <div style={{textAlign: "center"}}>
                            <Icon type="edit" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'edit', item.newsId)} />
                            <Divider type="vertical" />
                            <Icon type="delete" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'delete', item.newsId)} />
                            <Divider type="vertical" />
                            <Icon type="profile" style={{ cursor: 'pointer' }} onClick={e => this.showModal(e, 'details', item.newsId)} />
                        </div>
                    );
                },
            },
        ];

        this.state = {
            newsItemObj: createNewsItemObj
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
        
        if (actype !== 'create') {
            if(newsId) {
                const newsItemObj = this.props.newsItem.list.find(n => n.newsId === newsId);
                this.setState({ newsItemObj }); 
            }
        }
    }

    handleOk() {
        this.props.showModal(false);
    }

    handleCancel() {
        this.props.showModal(false);
    }

    render() {
        debugger

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
            showModal
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsItemPage);
