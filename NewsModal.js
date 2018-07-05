import React, { Component } from "react";
import moment from 'moment';
import { Modal, Form, Input, Select, Checkbox, DatePicker, Button } from 'antd';
import newNewsItem from '../../../mocks/addnewsitem.json';
import { TreeSelect } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const getModalSettings = (actype, onOk, onCancel) => {
    let title, okText = '';
    let footer = [];
    switch(actype) {
        case 'create': 
            title = 'Create News Item';
            okText = 'Create';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        case 'edit': 
            title = 'Edit News Item';
            okText = 'Edit';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        case 'details': 
            title = 'details - TODO';
            okText = 'Details';
            footer = [
                <Button key="Close" onClick={onCancel}>Close</Button>
            ];
            break;
        case 'delete': 
            title = 'delete - TODO';
            okText = 'Delete';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        default: 
            title = 'Create News Item';
    }

    return {
        title,
        okText,
        footer,
    }

}

const getOfficeDetails = (newsItemObject, actype) =>
{
    let officedetails = [], officelist = [], officegrp = [];
    if(actype === 'create')
    {
     officelist = newsItemObject.offices.map((office) => 
    <Option key={office.officeId}>{office.officeName}</Option>
    );
}
else{
    debugger;
     newsItemObject.offices.forEach(element => {
         if(newsItemObject.officeGroup!== null && newsItemObject.officeGroup.includes(element.officeId))
         {
            officegrp.push(element.officeId);
       officelist.push(<Option key={element.officeId}>{element.officeName}</Option>);
         }
         else{
            officelist.push(<Option key={element.officeId}>{element.officeName}</Option>);
         }
    });   
     
}
officedetails = {officelist, officegrp};

 return officedetails;
}


class NewsModal extends Component {
    constructor(props) {
        super(props);

        this.state ={
            newsItemObj: props.newsItemObj,
            newsItemObject: props.newsItemObject,
            value: [""]
        }
this.onPriorityChange = this.onPriorityChange.bind(this);
this.onNewsTextChange = this.onNewsTextChange.bind(this);
this.onSubjectChange = this.onSubjectChange.bind(this);

        //bindInstanceMethods(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.newsItemObj !== nextProps.newsItemObj) {
        //     this.setState({ newsItemObj: nextProps.newsItemObj ,
        //     newNewsItem: nextProps.newNewsItem});
        // } 
    }

    onPriorityChange(val) {
        // const { newsItemObj } = this.state;
        // newsItemObj.priority = val;
        //this.setState({newsItemObj });

        const { newNewsItem } = this.state;   
        newNewsItem.priority = val;    
        this.setState({newNewsItem });
    }

    onNewsTextChange(e) {
        //  const { newsItemObj } = this.state;
        //  newsItemObj.newsText = e.target.value;
        //  this.setState({ newsItemObj });
        
        const { newNewsItem } = this.state;
        newNewsItem.newsText = e.target.value;
        this.setState({ newNewsItem });

    }

    onSubjectChange(e) {
        // const { newsItemObj } = this.state;
        //  newsItemObj.subject = e.target.value;
        //  this.setState({ newsItemObj });

        const { newNewsItem } = this.state;
        newNewsItem.subject = e.target.value;
        this.setState({ newNewsItem });
    }

    handleChange = (value) => {
        console.log('onChange ', value);
        this.setState({ value });
      }

    render() {
        let { newsItemObject } = this.state;
        debugger;
        const modalSettings = getModalSettings(this.props.actionType, this.props.onOk, this.props.onCancel);
        const officedetails = getOfficeDetails(newsItemObject, this.props.actionType);
        debugger;
        const defaultchecked = newsItemObject.allOffices;
        const tProps = {
             treedata: 
             [{label:"Sow", value: "sow", key: "value"},{label:"Sow", value: "sow", key: "value1"},{label:"Sow", value: "sow", key: "value2"}],
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
              width: 300,
            },
          };
           
        
       return(
            <Modal
                visible={this.props.modalVisible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                title={modalSettings.title}
                okText={modalSettings.okText} 
                footer={modalSettings.footer}
                width={'750px'}
            >
                <div>
                    <Form layout={'horizontal'}>
                        <FormItem
                            label="Priority"
                            {...formItemLayout}
                        >
                            <Select onChange={this.onPriorityChange}>
                               <Option value="A">Urgent</Option>
                               <Option value="B">Normal</Option>
                               <Option value="C">Low</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="Subject"
                            {...formItemLayout}
                        >
                            <Input value={newsItemObject.subject} placeholder="Subject" onChange={this.onSubjectChange} />
                        </FormItem>
                        <FormItem
                            label="News Text"
                            {...formItemLayout}
                        >
                            <TextArea value={newsItemObject.newsText} rows="6" onChange={this.onNewsTextChange} />
                        </FormItem>
                        <FormItem
                            label="Start Date"
                            {...formItemLayout}
                        >
                            <DatePicker placeholder="Start Date"
                                onChange={() => {}} />
                        </FormItem>
                        <FormItem
                            label="End Date"
                            {...formItemLayout}
                        >
                            <DatePicker placeholder="End Date"
                                onChange={() => {}} />
                        </FormItem>
                        <FormItem
                            label="Office Scope"
                            {...formItemLayout}
                        >
                            <Checkbox defaultchecked placeholder="input placeholder">
                                All offices in your region?
                            </Checkbox>
                        </FormItem>
                        <FormItem label="Select Offices" {...formItemLayout}>   
                                   
                           {/* <TreeSelect treedata = {officelist} value = {this.state.value}
                           onChange = {this.onChange}
                           treeCheckable = {true}
                           showCheckedStrategy = {SHOW_PARENT}
                           searchPlaceholder = {'Please select'}
                           style = {
                             {width: "300"}
                           } />           */}
                           <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={officedetails.officegrp}
    onChange={this.handleChange}
  >
    {officedetails.officelist}
  </Select>
                        {/* // <CheckboxGroup options={officelist} onChange={() => {}} />  */}
                      
                        
                            </FormItem>
                          
                    </Form>
                </div>  
            </Modal>
       );
        
    }
}

export default NewsModal;
