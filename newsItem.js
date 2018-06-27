import React, { Component } from "react";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initNewsItemPage, getNewsItemPage } from "../../../store/actions/newsItemActions";

import { Table, Icon, Switch, Radio, Divider, Form } from 'antd';

const data = [];

const FormItem = Form.Item;

class newsitem extends React.Component {
    localState = {};

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Author Name',
                dataIndex: 'authorName',
                width: '20%',
                editable: true,
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                width: '5%',
                editable: true,
            },
            {
                title: 'Subject',
                dataIndex: 'subject',
                width: '10%',
                editable: true,
            },
            {
                title: 'News Text',
                dataIndex: 'newsText',
                width: '20%',
                editable: true,
            },
            {
                title: 'Created Date',
                dataIndex: 'createDate',
                width: '10%',
                editable: true,
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                width: '10%',
                editable: true,
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                width: '10%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {                  
                    return (
                        <div>                           
                            <a onClick={() => this.edit(record.key)}>Edit</a>
                            <br/><a onClick={() => this.edit(record.key)}>Details</a>
                            <br/><a onClick={() => this.edit(record.key)}>Delete</a>
                        </div>
                    );
                },
            },
        ];
    }

    componentWillMount() {
        this.props.initNewsItemPage();
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const newsItemProps = this.props.newsItem;
        const result = Object.keys(newsItemProps).map(function (key) {
            return newsItemProps[key];
        });
        console.log(result);
        
        this.state = { result, editingKey: '' };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex,
                    dataIndex: col.dataIndex,
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
                        bordered
                        dataSource={this.state.result}
                        columns={columns}
                        rowClassName="editable-row" />
                </div>
            </ScrollPanel>
         
        );
    }
}

const mapStateToProps = state => {
    return {
        newsItem: state.newsItem
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getNewsItemPage,
            initNewsItemPage
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(newsitem);
