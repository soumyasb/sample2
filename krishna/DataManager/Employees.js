import React, { Component } from 'react';

import DMTable from './DMTable';
import data from '../../mocks/EmployeesList.json';

const columns = [
    {
        title: 'User ID',
        dataIndex: 'UserID',
        key: 'UserID'

    },
    {
        title: 'Last Name',
        dataIndex: 'LastName',
        key: 'LastName'

    },
    {
        title: 'First Name',
        dataIndex: 'FirstName',
        key: 'FirstName'
    }
];


class Employees extends Component {
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
                <DMTable title={'Employees'}
                    tableData={data}
                    columns={columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='UserID'
                />
            </div>
        )
    }
}

export default Employees;