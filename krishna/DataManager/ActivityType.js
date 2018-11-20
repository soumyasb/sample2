import React, { Component } from 'react';

import { Icon, Modal, Button } from 'antd';

import DMTable from './DMTable';
import data from '../../mocks/GetAllActTypes.json';

const columns = [
    {
        title: 'Code',
        dataIndex: 'Code',
        key: 'Code'

    },
    {
        title: 'Abbreviation',
        dataIndex: 'Abbr',
        key: 'Abbr'

    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description'

    },
    {
        title: 'Confidential',
        dataIndex: 'Confidential',
        key: 'Confidential',
        render: c => c ? <Icon type="check" /> : <Icon type="close" />
    }
];

class ActivityType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };

        this.handleShowModal = this.handleShowModal.bind(this);
    }

    handleShowModal(e, actype, newsId) {
        // if (actype !== 'create') {
        //     if (newsId) {
        //         if (actype === 'edit') {
        //             this.props.initEditNewsItemObj(newsId);
        //         }
        //         if (actype === 'details') {
        //             this.props.initNewsItemDetails(newsId);
        //         }
        //         if (actype === 'delete') {
        //             this.props.initNewsItemDetails(newsId);
        //         }
        //     }
        // }
        // else {
        //     this.props.initCreateNewsItemObj();
        // }
        // this.setState({ actionType: actype, showModal: true });
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.state.showModal}
                    onOk={() => { }}
                    destroyOnClose={true}
                    onCancel={() => { }}
                    title={'title'}
                    okText={'okText'}
                    footer={null}
                    width={'750px'}
                >
                    Modal
                </Modal>
                <DMTable title={'Activity Type Maintenance'}
                    tableData={data}
                    columns={columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='Code'
                />
            </div>
        )
    }
}

export default ActivityType;