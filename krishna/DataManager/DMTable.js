import React, { Component } from 'react';
import { Table, Row, Col, Button, Icon, Divider, Modal, Select, Input } from 'antd';

import {
    DM_ADD_ACTION_TYPE,
    DM_DELETE_ACTION_TYPE,
    //DM_DETAILS_ACTION_TYPE,
    DM_EDIT_ACTION_TYPE
} from './DMTableFns';

const { Option } = Select;

class DMTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageSize: 10,
            searchText: '',
            tableData: props.tableData
        }

        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handleSearchText = this.handleSearchText.bind(this);
    }

    handlePageSizeChange(pageSize) {
        this.setState({ pageSize });
    }

    handleSearchText(e) {

        let { tableData, searchField } = this.props;
        const searchText = e.target.value.toLowerCase();

        if (searchText && searchField) {
            // If only one field is sent..
            if (!Array.isArray(searchField)) {
                searchField = [searchField];
            }

            tableData = tableData.filter(t => {
                let ret = false;

                // multiple fields can be searched with the same searchText
                searchField.forEach(s => {
                    if (!ret) {
                        ret = t[s].toLowerCase().includes(searchText)
                    }
                });

                return ret;
            });
        }

        this.setState({ searchText, tableData });
    }

    render() {

        const {
            title,
            uniqueColumnName,
            handleShowModal,
            columns,
            showModal,
            showDeleteModal,
            handleOk,
            handleCancel,
            modalTitle,
            footer,
            width,
            renderModalFields
        } = this.props;

        const {
            pageSize,
            searchText,
            tableData
        } = this.state;

        if (!columns.find(c => c.title === 'Options')) {
            columns.push(
                {
                    title: 'Options',
                    width: '6%',
                    render: (item) => {
                        return (
                            <div style={{ textAlign: "center" }}>
                                <Icon type="edit" style={{ cursor: 'pointer' }} onClick={e => handleShowModal(e, DM_EDIT_ACTION_TYPE, item[uniqueColumnName])} />
                                <Divider type="vertical" />
                                <Icon type="delete" style={{ cursor: 'pointer' }} onClick={e => handleShowModal(e, DM_DELETE_ACTION_TYPE, item[uniqueColumnName])} />
                                {/* 
                                TODO --- Uncomment the below tags to display the details icon....
                            */}
                                {/* <Divider type="vertical" />
                            <Icon type="profile" style={{ cursor: 'pointer' }} onClick={e => handleShowModal(e, DM_DETAILS_ACTION_TYPE, item[uniqueColumnName])} /> */}
                            </div>
                        );
                    },
                }
            );
        }

        const modalProps = {
            onOk: handleOk,
            destroyOnClose: true,
            onCancel: handleCancel,
            title: modalTitle,
            footer,
            width,
        };

        return (
            <div>
                <Table
                    size={"small"}
                    rowKey={uniqueColumnName}
                    title={() => <div>
                        <div>
                            <span style={{ fontSize: "x-large" }}>{title}</span>
                            <span style={{ float: 'right' }}>
                                <Button type="primary" onClick={e => handleShowModal(e, DM_ADD_ACTION_TYPE)}>Create New</Button>
                            </span>
                        </div>
                        <br />
                        <Row>
                            <Col span={10}>
                                Show <Select onChange={this.handlePageSizeChange} value={pageSize}
                                    showArrow={true} size={"default"}>
                                    <Option value={5}>{5}</Option>
                                    <Option value={10}>{10}</Option>
                                    <Option value={20}>{20}</Option>
                                    <Option value={30}>{30}</Option>
                                </Select>  entries
                            </Col>
                            <Col span={4} offset={10}>
                                <Input value={searchText} placeholder={'Search'} onChange={this.handleSearchText} />
                            </Col>
                        </Row>
                    </div>}
                    showHeader={true}
                    bordered
                    dataSource={tableData}
                    columns={columns}
                    pagination={{ pageSize }}
                />
                <Modal
                    visible={showModal}
                    {...modalProps}
                >
                    {renderModalFields()}
                </Modal>
                <Modal
                    visible={showDeleteModal}
                    {...modalProps}
                >
                    Are you sure you want to Delete ?
            </Modal>
            </div >
        );
    }
}

export default DMTable;