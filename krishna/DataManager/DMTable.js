import React, { Component } from 'react';
import { Row, Col, Table, Button, Icon, Divider } from 'antd';

// const getModalSettings = ({ actionType, onOk, onCancel }) => {
//     let title, okText = '';
//     let footer = [];

//     switch (actionType) {
//         case 'create':
//             title = 'Create News Item';
//             okText = 'Create';
//             footer = [
//                 <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
//                 <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
//             ];
//             break;
//         case 'edit':
//             title = 'Edit News Item';
//             okText = 'Save';
//             footer = [
//                 <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
//                 <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
//             ];
//             break;
//         case 'details':
//             title = 'News Item Details';
//             okText = 'Details';
//             footer = [
//                 <Button key="Close" onClick={onCancel}>Close</Button>
//             ];
//             break;
//         case 'delete':
//             title = 'Delete News Item';
//             okText = 'Delete';
//             footer = [
//                 <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
//                 <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
//             ];
//             break;
//         default:
//             title = 'Create News Item';
//     }

//     return {
//         title,
//         okText,
//         footer,
//     }

// }


class DMTable extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        const { title, tableData, uniqueColumnName, showModal } = this.props;
        let { columns } = this.props;

        if (!columns.find(c => c.title === 'Options')) {
            columns.push(
                {
                    title: 'Options',
                    width: '8%',
                    render: (item) => {
                        return (
                            <div style={{ textAlign: "center" }}>
                                <Icon type="edit" style={{ cursor: 'pointer' }} onClick={e => showModal(e, 'edit', item[uniqueColumnName])} />
                                <Divider type="vertical" />
                                <Icon type="delete" style={{ cursor: 'pointer' }} onClick={e => showModal(e, 'delete', item[uniqueColumnName])} />
                                <Divider type="vertical" />
                                <Icon type="profile" style={{ cursor: 'pointer' }} onClick={e => showModal(e, 'details', item[uniqueColumnName])} />
                            </div>
                        );
                    },
                });
        }

        return (<div>
            <Table
                size={"small"}
                rowKey={uniqueColumnName}
                title={() => <div>
                    <span style={{ fontSize: "x-large" }}>{title}</span>
                    <span style={{ float: 'right' }}>
                        <Button type="primary" onClick={e => showModal(e, 'create')}>Create New</Button>
                    </span>
                </div>}
                showHeader={true}
                bordered
                dataSource={tableData}
                columns={columns}
                pagination={{ pageSize: 10 }}
            />
        </div>)
    }
}

export default DMTable;