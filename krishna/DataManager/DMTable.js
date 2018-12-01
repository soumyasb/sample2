import React, { Component } from 'react';
import { Table, Button, Icon, Divider, Modal } from 'antd';

import { getModalSettings } from './DMTableFns';

class DMTable extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { title, tableData, uniqueColumnName, handleShowModal } = this.props;
        let { columns } = this.props;

        if (!columns.find(c => c.title === 'Options')) {
            columns.push(
                {
                    title: 'Options',
                    width: '8%',
                    render: (item) => {
                        return (
                            <div style={{ textAlign: "center" }}>
                                <Icon type="edit" style={{ cursor: 'pointer' }} onClick={e => handleShowModal(e, 'edit', item[uniqueColumnName])} />
                                <Divider type="vertical" />
                                <Icon type="delete" style={{ cursor: 'pointer' }} onClick={e => handleShowModal(e, 'delete', item[uniqueColumnName])} />
                                <Divider type="vertical" />
                                <Icon type="profile" style={{ cursor: 'pointer' }} onClick={e => handleShowModal(e, 'details', item[uniqueColumnName])} />
                            </div>
                        );
                    },
                }
            );
        }

        return (
            <div>
                <Table
                    size={"small"}
                    rowKey={uniqueColumnName}
                    title={() => <div>
                        <span style={{ fontSize: "x-large" }}>{title}</span>
                        <span style={{ float: 'right' }}>
                            <Button type="primary" onClick={e => handleShowModal(e, 'create')}>Create New</Button>
                        </span>
                    </div>}
                    showHeader={true}
                    bordered
                    dataSource={tableData}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                />
                <Modal
                    visible={this.props.showModal}
                    onOk={this.props.handleOk}
                    destroyOnClose={true}
                    onCancel={this.props.handleCancel}
                    title={this.props.modalTitle}
                    okText={this.props.okText}
                    footer={this.props.footer}
                    width={this.props.width}
                >
                    {this.props.children}
                </Modal>
                <Modal
                    visible={this.props.showDeleteModal}
                    onOk={this.props.handleOk}
                    destroyOnClose={true}
                    onCancel={this.props.handleCancel}
                    title={this.props.modalTitle}
                    okText={'okText'}
                    footer={null}
                    width={'600px'}
                >
                    Are you sure you want to Delete ?
                </Modal>
            </div>
        );
    }
}

export default DMTable;