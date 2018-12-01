import React from 'react';
import { Table, Button, Icon, Divider, Modal } from 'antd';

import {
    DM_ADD_ACTION_TYPE,
    DM_DELETE_ACTION_TYPE,
    //DM_DETAILS_ACTION_TYPE,
    DM_EDIT_ACTION_TYPE
} from './DMTableFns';

const DMTable = ({
    title,
    tableData,
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
    children
}) => {

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
                    <span style={{ fontSize: "x-large" }}>{title}</span>
                    <span style={{ float: 'right' }}>
                        <Button type="primary" onClick={e => handleShowModal(e, DM_ADD_ACTION_TYPE)}>Create New</Button>
                    </span>
                </div>}
                showHeader={true}
                bordered
                dataSource={tableData}
                columns={columns}
                pagination={{ pageSize: 10 }}
            />
            <Modal
                visible={showModal}
                {...modalProps}
            >
                {children}
            </Modal>
            <Modal
                visible={showDeleteModal}
                {...modalProps}
            >
                Are you sure you want to Delete ?
            </Modal>
        </div >
    );
};


export default DMTable;