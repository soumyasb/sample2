import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Select, Checkbox } from 'antd';
import moment from 'moment';

import './me.css';
import data from '../mocks/ME4Init.json';

const FormItem = Form.Item;
const { Option } = Select;

const defaultObj = {
    dlNumber: '',
    selfCertCode: '',
    threeCharacterLastName: '',
    medCertReceiptDate: '',
    purge: false,
    examinerLicense: '',
    nextTran: '',
};

class ME6 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obj: defaultObj
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleFieldChange(e, field) {
        const { obj } = this.state;

        switch (field) {
            case 'dlNumber':
                obj[field] = e.target.value;
                break;
            case 'threeCharacterLastName':
            case 'nextTran':
                if (e.target.value.length <= 3) {
                    obj[field] = e.target.value;
                }
                break;
            case 'purge':
                obj[field] = e.target.checked;
                break;
            case 'selfCertCode':
                obj[field] = e;
                break;
            default:
                break;
        }

        this.setState({ obj });
    }

    onDateChange(d, ds, type) {
        const { obj } = this.state;
        obj[type] = ds || '';//moment(new Date());

        this.setState({ obj });
    }

    handleAdd(e) {
        const { obj } = this.state;

        obj.status = 'I';

        // TODO - use the obj to add...
    }

    handleCancel(e) {

    }

    handleUpdate(e) {
        const { obj } = this.state;

        obj.status = 'I';

        // TODO - use the obj to edit...
    }

    render() {
        const { obj } = this.state;

        return (
            <Form className="ant-advanced-search-form">
                <Row>
                    <Col span={6}>
                        <FormItem
                            label="DL # : "
                        >
                            <Input value={obj.dlNumber} placeholder="DL Number" onChange={e => this.handleFieldChange(e, 'dlNumber')} />
                        </FormItem>
                    </Col>
                    <Col span={6} offset={1}>
                        <FormItem
                            label="3 Pos Last Name : "
                        >
                            <Input value={obj.threeCharacterLastName} placeholder="3 Pos Last Name" onChange={e => this.handleFieldChange(e, 'threeCharacterLastName')} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <FormItem
                            label="Self-Cert Code : "
                        >
                            <Select onChange={e => this.handleFieldChange(e, 'selfCertCode')}
                                value={obj.selfCertCode} showArrow={true} size={"default"}
                            >
                                {data.SelfCertCode.map(item => <Option key={item.Value} value={item.Value}>{item.Text}</Option>)}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8} offset={1}>
                        <FormItem
                            label="Med Cert Receipt Date : "
                        >
                            <DatePicker placeholder="Med Cert Receipt Date"
                                value={obj.medCertReceiptDate ? moment(new Date(obj.medCertReceiptDate)) : ''}
                                onChange={(d, ds) => { this.onDateChange(d, ds, 'medCertReceiptDate') }}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ width: '50%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px', textAlign: 'center' }}>
                    <Checkbox checked={obj.purge}
                        onChange={e => this.handleFieldChange(e, 'purge')}
                        placeholder="input placeholder">
                        PURGE THIS RECORD
                        </Checkbox>
                </div>
                <br />
                <br />
                <Row>
                    <Col span={4}>
                        <FormItem
                            label="Next Trans : "
                        >
                            <Input value={obj.nextTran} placeholder="Next Transaction" onChange={e => this.handleFieldChange(e, 'nextTran')} />
                        </FormItem>
                    </Col>
                    <Col span={15} style={{ float: 'right' }}>
                        <Button style={{ color: "white", backgroundColor: "green" }}
                            type="default" key="New DL" onClick={this.handleAdd}>New DL</Button> {' '}
                        <Button type="primary" key="Update" onClick={this.handleUpdate}>Update</Button> {' '}
                        <Button style={{ color: "white", backgroundColor: "red" }}
                            type="default" key="Cancel" onClick={this.handleCancel}>Cancel</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ME6; 