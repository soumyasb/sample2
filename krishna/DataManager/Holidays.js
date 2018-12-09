import React, { Component } from 'react';

import { Icon, Form, Input, InputNumber, Checkbox, DatePicker } from 'antd';
import moment from 'moment';

import DMTable from './DMTable';
import data from '../../mocks/GetAllHolidays.json';
import {
    getModalSettings,
    DM_ADD_ACTION_TYPE,
    DM_DELETE_ACTION_TYPE,
    DM_EDIT_ACTION_TYPE,
    DM_DETAILS_ACTION_TYPE
} from './DMTableFns';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};

const defaultObj = {
    ID: -1,
    HolidayDate: "",
    TermDate: null,
    LastUpdatedBy: null,
    LastUpdatedDate: null,
    CCYY: ''
}

class Holidays extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data,
            yearFilters: [...new Set(data.map(y => y.CCYY))]
                .map(y => {
                    return {
                        text: y,
                        value: y
                    };
                }),
            showModal: false,
            obj: {},
        };

        this.columns = [
            {
                title: 'Holiday',
                dataIndex: 'HolidayDate',
                key: 'HolidayDate',
                // Remove the below line.. if you want to add the details icon.. 
                render: c =>
                    <a onClick={e => this.handleShowModal(e, DM_DETAILS_ACTION_TYPE, c)}
                        style={{ textDecoration: 'underline', color: '#40a9ff' }}>
                        {moment(c).format('MMMM DD')}
                    </a>
            },
            {
                title: 'Year',
                dataIndex: 'CCYY',
                key: 'CCYY',
                filters: this.state.yearFilters,
                onFilter: (value, record) => record.CCYY === value
            }
        ];

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.renderModalFields = this.renderModalFields.bind(this);
    }

    componentDidMount() {
        // call an action here.... 

    }

    static getDerivedStateFromProps(props, prevState) {
        // Need to compare the props and prevState 
        // return the Data and yearFilters using map similar to what is in the constructor....
    }

    handleShowModal(e, actype, id) {
        if (actype !== DM_ADD_ACTION_TYPE) {
            if (id) {
                // the next line is fetching data from the json....
                this.setState({ obj: { ...data.find(d => d.HolidayDate === id) } });

                // TODO fetch the edit obj... (from action if needed)
                if (actype === DM_EDIT_ACTION_TYPE) {

                }
                if (actype === DM_DETAILS_ACTION_TYPE) {

                }
                if (actype === DM_DELETE_ACTION_TYPE) {

                }
            }
        }
        else {
            // TODO get the default Obj (from action if needed)

            this.setState({ obj: { ...defaultObj } });
        }

        this.setState({
            actionType: actype,
            showModal: actype !== DM_DELETE_ACTION_TYPE,
            showDeleteModal: actype === DM_DELETE_ACTION_TYPE
        });
    }

    handleCancel() {
        this.setState({ showModal: false, showDeleteModal: false });
    }

    handleOk(actionType) {
        // TODO 
        switch (actionType) {
            case DM_ADD_ACTION_TYPE:
                // TODO for adding 
                break;
            case DM_EDIT_ACTION_TYPE:
                // TODO for editing 
                break;
            case DM_DELETE_ACTION_TYPE:
                // TODO for deleting 
                break;
            default: break;
        }

        this.setState({ showModal: false, showDeleteModal: false });
    }

    onDateChange(d, ds, type) {
        const { obj } = this.state;
        obj[type] = ds || moment(new Date());

        if (type === 'HolidayDate') {
            obj.CCYY = d.format('YYYY');
        }

        this.setState({ obj });
    }

    renderModalFields() {
        const { actionType, obj } = this.state;
        const isEditable = actionType === DM_ADD_ACTION_TYPE || actionType === DM_EDIT_ACTION_TYPE;

        return (
            <Form layout={'horizontal'}>
                <FormItem
                    label="Holiday Date"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <DatePicker placeholder="Holiday Date"
                            value={obj.HolidayDate ? moment(new Date(obj.HolidayDate)) : ''}
                            onChange={(d, ds) => { this.onDateChange(d, ds, 'HolidayDate') }} />
                        :
                        <div>{obj.HolidayDate}</div>
                    }
                </FormItem>
                <FormItem
                    label="Terminated Date"
                    {...formItemLayout}
                >
                    {isEditable ?
                        <DatePicker placeholder="Terminated Date"
                            value={obj.TermDate ? moment(new Date(obj.TermDate)) : ''}
                            onChange={(d, ds) => { this.onDateChange(d, ds, 'TermDate') }} />
                        :
                        <div>{obj.TermDate}</div>
                    }
                </FormItem>
            </Form>
        );
    }

    render() {
        const { title, footer } =
            getModalSettings(this.state.actionType, this.handleOk, this.handleCancel, 'Holidays');

        return (
            <div>
                <DMTable title={'Holidays'}
                    tableData={data}
                    columns={this.columns}
                    handleShowModal={this.handleShowModal}
                    uniqueColumnName='HolidayDate'

                    searchField={['HolidayDate', 'CCYY']}

                    showModal={this.state.showModal}
                    showDeleteModal={this.state.showDeleteModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    modalTitle={title}
                    footer={footer}
                    width={'600px'}
                    renderModalFields={this.renderModalFields}
                />
            </div>
        )
    }
}

export default Holidays;