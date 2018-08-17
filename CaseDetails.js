import React, { Component } from 'react';
import { getCaseDetails, getHearingTypes, getCaseReasons, getCaseReferrals, getCaseCertifications, getCustomerD26Info, modifyCaseDetail
, getH6Info, getCaseComments, getCaseScheduleDetail, addCaseComment, deleteCaseComment } from "../../../store/actions/caseActions";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import moment from "moment";
import { connect } from "react-redux";
import { Table, List, Spin, Modal, Radio, Input, Tooltip, Button, Select, Layout, Menu, Icon, Badge, DatePicker } from 'antd';
import "../../../Cases.css";
import cloneDeep from 'lodash/cloneDeep';

const { MonthPicker } = DatePicker;
const monthFormat = 'MM-YY';

const {Option} = Select;
const {Content,Sider } = Layout;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
const 
getDropdownList = (listObj, selectedValue) =>   
{  
    let list = [];   

     listObj.map(item =>
{
  if(item.Value !== ""){
  if(item.Value === selectedValue)
  {
    list.push(<Option key={item.Value} value={item.Value} selected>{item.Text}</Option>)
  }
  else
  {
  list.push(<Option key={item.Value} value={item.Value}>{item.Text}</Option>)
  }
  }
});
    
    return list;     
   }
const oipcolumns = [  {
  title: <b>OIP Name</b>,
  dataIndex: 'OIPName',
 width: "20%",
  key: 'OIPName'
},
{
  title: <b>Agency</b>,
  dataIndex: 'AgencyName',
 width: "20%",
  key: 'AgencyName'
},
{
  title: <b>Phone No.</b>,
  dataIndex: 'PhoneNo',
 width: "20%",
  key: 'PhoneNo'
},
{
  title: <b>Cell No.</b>,
  dataIndex: 'CellNo',
 width: "20%",
  key: 'CellNo'
},
{
  title: <b>Fax</b>,
  dataIndex: 'FaxNo',
 width: "20%",
  key: 'FaxNo'
}];

const reschedcolumns = [  {
  title: <b>Schedule Date</b>,
  dataIndex: 'ScheduleDate',
  key: 'ScheduleDate'
},
{
  title: <b>Schedule Time</b>,
  dataIndex: 'ScheduleTime',
  key: 'ScheduleTime'
},
{
  title: <b>Location</b>,
  dataIndex: 'Location',
  key: 'Location'
},
{
  title: <b>Hearing Officer</b>,
  dataIndex: 'HearingOfficer',
  key: 'HearingOfficer'
},
{
  title: <b>Scheduled By</b>,
  dataIndex: 'ScheduledBy',
  key: 'ScheduledBy'
},
{
  title: <b>Authorized By</b>,
  dataIndex: 'AuthorizedBy',
  key: 'AuthorizedBy'
}];
   const getAccidentsList = (accidentsObj) =>   
{  
    let list = [];   

    accidentsObj.Accidents.map(item =>
{

  list.push(<Radio style={radioStyle} value={item.CaseNumber}><span style={{paddingLeft:"5px"}}>{item.CaseNumber}</span><span style={{paddingLeft:"25px"}}>{item.Date}</span><span style={{paddingLeft:"25px"}}>{item.City}</span></Radio>)
  }

);
    
    return list;     
   }
const reqRsnCodesForCerts = ["871","875","880","881","882","883","884","885","887","888","889","891","892","894","897","898"];


class CaseDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
          caseNumber: props.match.params.CaseNumber,
            editmode: false,
            caseDetailsObj: props.cases.caseDetailsObj,
            hearingTypes: props.cases.hearingTypesList,
            caseReasons: props.cases.caseReasonsList,
            caseReferrals: props.cases.caseReferralsList,
            caseCertifications: props.cases.caseCertificationsList,
            caseScheduleData: props.cases.caseScheduleData,
            customerD26Info: props.cases.customerD26Info,
            isRequired: false,
            tabValue: 'CaseDetail',
            caseSchedVisible: false,
            caseComments: props.cases.caseComments,
            newCommModal: false,
            openDelConf: false,
            commentValue: "",
            commentType: "C",
            commentNumber: "",
            purgeDate: "",
            enableSaveButton: false
        };
       this.onButtonClick = this.onButtonClick.bind(this);   
      // this.handleChange = this.handleChange.bind(this);
       this.handleClick = this.handleClick.bind(this);
       this.openCaseSchedule = this.openCaseSchedule.bind(this);
       this.onCommentTextChange = this.onCommentTextChange.bind(this);   
       this.onCommentTypeChange = this.onCommentTypeChange.bind(this);   
       this.onCommentNumberChange = this.onCommentNumberChange.bind(this);
       this.onPurgeDateChange = this.onPurgeDateChange.bind(this);
    }    
    componentDidMount() {
      this.props.getCaseDetails(this.state.caseNumber);
      this.props.getHearingTypes();
      this.props.getCaseReasons();
      this.props.getCaseReferrals();
      this.props.getCaseCertifications();
      this.props.getCaseComments(this.state.caseNumber);
     if (this.props.location.state !== undefined){ this.props.getCustomerD26Info(this.props.location.state.dlNumber); }
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.cases.caseDetailsObj !== nextProps.cases.caseDetailsObj) {
          if(nextProps.cases.caseDetailsObj !== undefined)
          {
          this.setState({ caseDetailsObj: nextProps.cases.caseDetailsObj});
          const newCaseDetailsObj = cloneDeep(nextProps.cases.caseDetailsObj);
          this.setState({ newCaseDetailsObj: newCaseDetailsObj});
          this.setState({ hearingType: nextProps.cases.caseDetailsObj.CD_HRNG_TYP});
          this.setState({ caseReason: nextProps.cases.caseDetailsObj.CD_RSN});
          this.setState({ caseReferral: nextProps.cases.caseDetailsObj.CD_REFR_SRCE_TYP});
          this.setState({ caseCertification: nextProps.cases.caseDetailsObj.CD_ENDR});
          this.setState({ hearingTypes: nextProps.cases.hearingTypesList});
          this.setState({ caseReasons: nextProps.cases.caseReasonsList});
          this.setState({ caseReferrals: nextProps.cases.caseReferralsList});
          this.setState({ caseCertifications: nextProps.cases.caseCertificationsList});
          this.setState({ value: nextProps.cases.caseDetailsObj.FRCaseNumber});
          if (this.props.location.state === undefined){ this.props.getCustomerD26Info(nextProps.cases.caseDetailsObj.DLNumber); }
          }
      }
      if(this.props.cases.caseComments !== nextProps.cases.caseComments)
      {
        this.setState({caseComments: nextProps.cases.caseComments});
      }
if(this.props.cases.addCaseCommentData !== nextProps.cases.addCaseCommentData)
{
  if(nextProps.cases.addCaseCommentData.Error === false)
  {
    this.props.getCaseComments(this.state.caseNumber);
  }
  else{
    this.setState({addCaseCommentData: nextProps.cases.addCaseCommentData, commentSaveError: true})
  }
}
if(this.props.cases.commentDelData !== nextProps.cases.commentDelData)
{
  if(nextProps.cases.commentDelData.Error === false)
  {
    this.props.getCaseComments(this.state.caseNumber);
  }
  else{
    this.setState({ commentDelData: nextProps.cases.commentDelData, commentSaveError: true})
  }
}
debugger;
  if (this.props.cases.customerD26Info !== nextProps.cases.customerD26Info) {
        this.setState({ customerD26Info: nextProps.cases.customerD26Info});
  }
  if (this.props.cases.h6Info !== nextProps.cases.h6Info) {
    if(nextProps.cases.h6Info !== undefined)
    {
    this.setState({ h6Info: nextProps.cases.h6Info});
    }
}
if (this.props.cases.caseScheduleData !== nextProps.cases.caseScheduleData) {
  if(nextProps.cases.caseScheduleData !== undefined)
  {
  this.setState({ caseScheduleData: nextProps.cases.caseScheduleData});
  this.setState({scheddata: nextProps.cases.caseScheduleData.Contacts.results[0]});
  let odata = [], rdata = [];
{ nextProps.cases.caseScheduleData.OIPs !== undefined &&  nextProps.cases.caseScheduleData.OIPs.map((item) => {
  const oipitem = {
    OIPName: item.NME_FRST_PRSN + " "+ item.NME_SURNME_PRSN,
    AgencyName: item.NME_AGENCY,
    PhoneNo: item.NBR_PHONE,
    CellNo: item.NBR_CELL_PHONE,
    FaxNo: item.NBR_FAX
  }
  odata.push(oipitem);
}
)
}
this.setState({oipdata: odata});
 {  nextProps.cases.caseScheduleData.Reschedules.results !== undefined &&  nextProps.cases.caseScheduleData.Reschedules.results.map((item) => {
    rdata.push(item);
  })
}
this.setState({rescheddata: rdata});
}
  }
}
onButtonClick = (e,value) => 
{
if(value === 'Edit')
{
this.setState({editmode: true});
}
if(value === 'Back')
{
  this.props.getCaseDetails(this.state.caseNumber);
}
if(value === 'Cancel')
{
  this.setState({hearingType: this.props.cases.caseDetailsObj.CD_HRNG_TYP});
  this.setState({caseReason: this.props.cases.caseDetailsObj.CD_RSN});
  this.setState({caseReferral: this.props.cases.caseDetailsObj.CD_REFR_SRCE_TYP});
 // this.setState({hearingType: this.props.cases.caseDetailsObj.CD_HRNG_TYP});
  this.setState({caseCertification: this.props.cases.caseDetailsObj.CD_ENDR});
  this.setState({editmode: false});
  this.setState({ value: this.props.cases.caseDetailsObj.FRCaseNumber});
}
if(value === 'Save')
{
  const {newCaseDetailsObj} = this.state;
  // newCaseDetailsObj.CD_HRNG_TYP= this.state.hearingType;
  // newCaseDetailsObj.CD_RSN = this.state.caseReason;
  // newCaseDetailsObj.CD_REFR_SRCE_TYP = this.state.caseReferral;
  // newCaseDetailsObj.CD_ENDR = this.state.caseCertification;
  newCaseDetailsObj.FRCaseNumber = this.state.value;
   this.state.customerD26Info.Accidents.map(item =>
  {
    if(item.CaseNumber === newCaseDetailsObj.FRCaseNumber)
    {
      newCaseDetailsObj.AccidentDate = item.Date;
    }
  })
 this.state.customerD26Info.Accidents.map(item =>
    {
      if(item.CaseNumber === newCaseDetailsObj.FRCaseNumber)
      {
        newCaseDetailsObj.AccidentCity =  item.City;
      }
    })
    debugger;
    this.props.modifyCaseDetail(newCaseDetailsObj);
this.setState({editmode: false});
}
if(value === 'New')
{
  this.setState({commentValue:"", commentType: "C", commentNumber: "", purgeDate: "", newCommModal: true});
}
}
onChange = (e) => {
  this.setState({
    value: e.target.value,
  });
}
handleOk = (e) => {
  debugger;
  const lastnameFirst3 = this.state.caseDetailsObj.Customer.LastName.substring(0,3).toUpperCase();
  let commentData = {
    "commentTextInput": this.state.commentValue,
    "placeholder": "",
    "dlNumber": this.state.caseDetailsObj.Customer.DLNumber,
    "commentType": this.state.commentType,
    "commentNumber": this.state.commentNumber,
    "purgeDate": this.state.purgeDate.replace('-', ''),
    "lastnameFirst3": lastnameFirst3
  }
  this.props.addCaseComment(this.state.caseDetailsObj.CaseNumber, commentData);
  this.setState({newCommModal: false});
}

openDelConf = (comm_number) => 
{
  this.setState({openDelConf: !this.state.openDelConf, commentNumber: comm_number}); 
} 

closeDelConf = (e) => 
{
  this.setState({openDelConf: !this.state.openDelConf, commentNumber: ""});
}
handleDelete =(comm_Number) => {
  let commentDelObj = {
    "dlNumber": this.state.caseDetailsObj.Customer.DLNumber,
    "commentNumber": this.state.commentNumber,
    "deleteFlag": true
  }
  this.props.deleteCaseComment(this.state.caseDetailsObj.CaseNumber, commentDelObj);
  this.setState({openDelConf: false, commentNumber: ""});
}

handleCancelComm = (e) => {
  this.setState({newCommModal: false, commentValue: "", commentType: "C", commentNumber: "", purgeDate: ""});
}

handleClick = (e) => {
  this.setState({
    tabValue: e.key
  })
  if(e.key === 'DadH6')
  {
    this.props.getH6Info(this.state.caseDetailsObj.DLNumber);
  }
}
openCaseSchedule() {
  this.props.getCaseScheduleDetail(this.state.caseDetailsObj.DLNumber, this.state.caseDetailsObj.CaseNumber);
  this.setState({caseSchedVisible: true});
}

handleCancel = (e) => {
  this.setState({
    caseSchedVisible: false,
  });
}

handleError = (e) => {
  this.setState({
    commentSaveError: false,
  });
}

handleChange = (e,listType) => {
  debugger;
 // const value = e;
  if(listType === 'HRNG_TYP')
{    
  const {newCaseDetailsObj} = this.state;
  newCaseDetailsObj.CD_HRNG_TYP = e;
 this.setState({newCaseDetailsObj: newCaseDetailsObj, hearingType: e, isDirty: true});
}
if(listType === 'CASE_RSN')
{    
  const {newCaseDetailsObj} = this.state;
  newCaseDetailsObj.CD_RSN = e;
 this.setState({newCaseDetailsObj: newCaseDetailsObj, caseReason: e, isDirty: true});
 //this.setState({caseReason: e});
}
if(listType === 'CASE_RFL')
{   
  const {newCaseDetailsObj} = this.state;
  newCaseDetailsObj.CD_REFR_SRCE_TYP = e;
 this.setState({newCaseDetailsObj: newCaseDetailsObj, caseReferral: e, isDirty: true}); 
 //this.setState({caseReferral: e});
}
if(listType === 'CASE_CERT')
{    
  const {newCaseDetailsObj} = this.state;
  newCaseDetailsObj.CD_ENDR = e;
 this.setState({newCaseDetailsObj: newCaseDetailsObj, caseCertification: e, isDirty: true});
 //this.setState({caseCertification: e});
}
}
onCommentTypeChange(e)
{
  this.setState({
    commentType: e.target.value,
    commentValue: "",
    commentNumber: "",
    purgeDate: ""
  });
}
onCommentNumberChange(e)
{
  const { value } = e.target;
  const reg = /^[0-9]*$/;
  if ((!isNaN(value) && reg.test(value))) {
    this.setState({
      commentNumber: e.target.value
    });
  }
 
}
onPurgeDateChange(date, dateString)
{
  debugger;
  const value  = dateString;
  //= e.target;
 // const reg = /^(0[1-9]|1[012])[\-]*$/;
  ///^[0-9-]*$/;
    this.setState({
      purgeDate: value
    });
}
onCommentTextChange(e) 
{
  this.setState({ commentValue: e.target.value });
}
    render() {
    const config = { 
      pagination : {
          pageSize: 2
      }
  }
      const boxShadows = {
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)"
    };
const {caseDetailsObj} = this.state;
let scheduleTitle = "";
if(caseDetailsObj !== undefined)
{
  scheduleTitle = "Case schedule detail for " + caseDetailsObj.CaseNumber;
}
let accidentsList = [];
let h6Info = [];
if(this.state.customerD26Info !== undefined )
{ 
 accidentsList = getAccidentsList(this.state.customerD26Info);
}
let hearingTypesList = [], caseReasonsList = [], caseReferralsList = [], caseCertificationsList = [];
if(this.state.caseDetailsObj!== undefined && this.state.hearingTypes !== undefined )
{ 
  hearingTypesList = getDropdownList(this.state.hearingTypes, this.state.caseDetailsObj.CD_HRNG_TYP);    
}
if(this.state.caseDetailsObj!== undefined && this.state.caseReasons !== undefined)
{ 
  caseReasonsList = getDropdownList(this.state.caseReasons, this.state.caseDetailsObj.CD_RSN);    
}
if(this.state.caseDetailsObj!== undefined && this.state.caseReferrals !== undefined)
{ 
  caseReferralsList = getDropdownList(this.state.caseReferrals, this.state.caseDetailsObj.CD_REFR_SRCE_TYP);    
}
if(this.state.caseDetailsObj!== undefined && this.state.caseCertifications !== undefined)
{ 
  caseCertificationsList = getDropdownList(this.state.caseCertifications, "");    
}
if(this.state.h6Info !== undefined)
{
   h6Info = Object.entries(this.state.h6Info).map(([key,value])=>{
  return (
      <div><b>{key}</b> :<div dangerouslySetInnerHTML={{ __html: value.toString()}}/> </div>
  );
})
}
let data= [];
if(this.state.caseComments !== undefined)
{
this.state.caseComments.Comments.map((item) => {
  data.push({
    DT_UPDT_TRANS:  moment( item.DT_UPDT_TRANS).format("MM/DD/YYYY HH:mm:ss"),
    NBR_COMM: item.NBR_COMM,
    TXT_COMM: item.TXT_COMM,
    EmployeeFullName: item.EmployeeFullName
  });
});
}

const {caseScheduleData} = this.state;
const {scheddata} = this.state;
const {oipdata}= this.state; 
const {rescheddata} = this.state;
const {commentType} = this.state;

        return (   
          <ScrollPanel
          style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0)"
          }}
      >
       {caseDetailsObj !== undefined && (caseDetailsObj.CaseNumber === this.props.match.params.CaseNumber ? (
          <div> 
          <Row type="flex" justify="center">
     <Col span = {22}>     
        { caseDetailsObj.Customer && <div style={{
            justify: "center",
            height: "80px",
            paddingLeft: "1%",
            border: "3px solid white"}} ><div style={{paddingTop: "10px"}}><Icon type="idcard"  style={{ fontSize: 32 }}/> 
            {this.props.location.state !== undefined ? <span onClick={(e) => this.props.history.push(`/customerDetails/dlNumber/${this.props.location.state.dlNumber}`)} style={{paddingLeft: "1%", fontSize: "xx-large", cursor: "pointer"}}>{caseDetailsObj.Customer.LastName},{caseDetailsObj.Customer.FirstName}</span>
            : <span onClick={(e) => this.props.history.push(`/customerDetails/dlNumber/${this.state.caseDetailsObj.Customer.DLNumber}`)} style={{paddingLeft: "1%", fontSize: "xx-large", cursor: "pointer"}}>{caseDetailsObj.Customer.LastName},{caseDetailsObj.Customer.FirstName}</span>}
            {this.props.location.state !== undefined ? <span style={{paddingLeft: "5%", fontSize: "x-large"}}>DL#: {this.props.location.state.dlNumber}</span>
            : <span style={{paddingLeft: "5%", fontSize: "x-large"}}>DL#: {this.state.caseDetailsObj.Customer.DLNumber}</span>}
            <span style={{paddingLeft: "5%", fontSize: "x-large"}}>Case#: {this.props.match.params.CaseNumber}</span>
        </div></div> }
 
 
    <Layout style={{ height: '100%'}}>
     <Content>
      <Layout style={{ height: '100%', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            style={{ height: '100%' }}
            onClick={e => this.handleClick(e)}
          >
            <Menu.Item key="CaseDetail"> <Icon type="profile" />
              <span>Case Detail</span>
</Menu.Item>
<Menu.Item key="OIP">
<Icon type="team" />
              <span>OIP</span>
</Menu.Item>
<Menu.Item key="Comments"> 
<Icon type="message" />
              <span>Comments</span>
             {this.state.caseComments !== undefined && <span style ={{paddingLeft: "5%"}} ><Badge showZero={true} count={this.state.caseComments.TotalComments} />  </span>}
</Menu.Item>
<Menu.Item key="Schedule">
<Icon type="schedule" />
              <span>Schedule</span>
</Menu.Item>
<Menu.Item key="Closure">
<Icon type="book" />
              <span>Closure</span>
</Menu.Item>
<Menu.Item key="Suspense">
<Icon type="pause-circle" />
              <span>Suspense</span>
</Menu.Item>
<Menu.Item key="DadH6">
<Icon type="file-text" />
              <span>DAD H6</span>
</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{height: "600px" }}>
        
       {this.state.tabValue === 'CaseDetail' ? (<div style={{paddingLeft: '2%', paddingTop: '1%',justify: "center", width: '95%'}}>
       {this.state.caseDetailsObj.ErrorMessage !== null ?    <div style={{border: "solid", borderColor: "#c9e3fa", height: "200px"}}> 
               <div style={{
    justify: "center",
    height: "30px",
    backgroundColor: "#c9e3fa",
    paddingLeft: "1%"
   }} ><Icon type="exclamation-circle" style={{ fontSize: 16 }}/> <span style={{fontSize: 'large', paddingLeft: '0.5%'}}>ERROR</span><div dangerouslySetInnerHTML={{ __html: this.state.caseDetailsObj.ErrorMessage}}/><Button type="default" size={"small"} onClick={(e) => this.onButtonClick(e,'Back')}>Go Back</Button></div></div>: 
               <div style={{border: "solid", borderColor: "#c9e3fa", height: "500px"}}> 
               <div style={{
    justify: "center",
    height: "30px",
    backgroundColor: "#c9e3fa",
    paddingLeft: "1%"
   }} ><Icon type="profile" style={{ fontSize: 16 }}/> <span style={{fontSize: 'large', paddingLeft: '0.5%'}}>Case Detail</span>
   {(this.state.caseDetailsObj.CaseStatusCode !== 'CL' && this.state.caseDetailsObj.CaseStatusCode !== 'UP') ?
  <span> {this.state.editmode === true ?(<span> <Button style={{marginLeft: "80%", color:  "white", backgroundColor: "red"}} type="default" size={"small"} onClick={(e) => this.onButtonClick(e,'Cancel')}>Cancel</Button> 
  {(this.state.isDirty === true)  ? <Button  style={{marginLeft: "2%", color:  "white", backgroundColor: "green"}} type="default" size={"small"} onClick={(e) => this.onButtonClick(e,'Save')}>Save</Button>
  :<Button  style={{marginLeft: "2%"}} type="default" size={"small"} onClick={(e) => this.onButtonClick(e,'Save')} disabled>Save</Button> }</span>) :
    <span style={{paddingLeft: '87%'}}><Button type="primary" size={"small"} onClick={(e) => this.onButtonClick(e,'Edit')}>Edit</Button></span>
  } </span> :
  <span></span>
}
</div>
       <Row type="flex" justify="space-around" >
    <Col span = {6}>
    <div style={{paddingTop: "5px"}}>
           <b>Date of Birth</b>:
        <Input value={caseDetailsObj.Customer.DOB} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/>          
            </div>
            <div style={{paddingTop: "10px"}}>
   <b>DL Number</b>:
  <Input value={caseDetailsObj.Customer.DLNumber} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/> 
            </div>
            <div style={{paddingTop: "10px"}}>
       <b>License Class</b>:
        <Input value={caseDetailsObj.Customer.classLicense} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/> 
            </div>
            <div style={{paddingTop: "10px"}}> <b>Phone Number</b>:
        <Input value={caseDetailsObj.Customer.PhoneNumber} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/> 
            </div>
            <div style={{paddingTop: "10px"}}> <b>Mailing Address</b>:
        <TextArea rows="5" value={caseDetailsObj.Customer.MailingAddress} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/> 
        </div>
       </Col>
        <Col span = {6}>
        <div style={{paddingTop: "5px"}}> <b>Case Number</b>:
        <Input value={caseDetailsObj.CaseNumber} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/> 
        </div>
        <div style={{paddingTop: "10px"}}> <b>Received Date</b>:
        <Input value={caseDetailsObj.DateReceived} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/> 
        </div>          
            <div style={{paddingTop: "10px"}}> <b>Case Status</b>:
        <Input value={caseDetailsObj.CaseStatus} style={{ width: '100%', backgroundColor: "#f2efef", pointerEvents: "none"}} readOnly/> 
        </div>
        <div style={{paddingTop: "10px"}}> <b>Hearing Type</b>:
        {this.state.editmode === true ?

          <Select onChange={e => this.handleChange(e, 'HRNG_TYP')} showArrow={true} size={"default"} style={{ width: '100%'}}>
                                 {hearingTypesList}
                              </Select> :
                              <Select value={caseDetailsObj.CD_HRNG_TYP} showArrow={true} size={"default"} style={{ width: '100%'}} disabled >        
                                {hearingTypesList}               
                              </Select>
          }
        </div>
        <div style={{paddingTop: "10px"}}> <b>Reason</b>:
        {this.state.editmode === true ?
          <Select onChange={e => this.handleChange(e, 'CASE_RSN')} showArrow={true} size={"default"} style={{ width: '100%'}} >
                                 {caseReasonsList}
                              </Select> :
                              <Select value={caseDetailsObj.CD_RSN} showArrow={true} size={"default"} style={{ width: '100%'}} disabled >
                              {caseReasonsList}
                              </Select>
          }
        </div>
        <div style={{paddingTop: "10px"}}> <b>Referral</b>:
        {this.state.editmode === true ?
        <Select onChange={e => this.handleChange(e, 'CASE_RFL')} showArrow={true} size={"default"} style={{ width: '100%'}} >
                               {caseReferralsList}
                            </Select> :
                            <Select value={caseDetailsObj.CD_REFR_SRCE_TYP} showArrow={true} size={"default"} style={{ width: '100%'}} disabled >
                            {caseReferralsList}
                            </Select>
        }
        </div>
       { reqRsnCodesForCerts.includes(this.state.caseReason) && <div style={{paddingTop: "10px"}}> <b>Special Cert/Endorsement</b>:
        {this.state.editmode === true ?
          <Select onChange={e => this.handleChange(e, 'CASE_CERT')} showArrow={true} size={"default"} style={{ width: '100%'}} >
                                 {caseCertificationsList}
                              </Select> :
                              <Select value={caseDetailsObj.CD_ENDR} showArrow={true} size={"default"} style={{ width: '100%'}} disabled >
                              </Select>
          }
        </div>
       }
            </Col>
            <Col span ={6}>
            {(this.state.customerD26Info !== undefined && this.state.caseReason === "950") &&
             <div style={{ 
              width: "100%",
              height: "50%",
              marginTop: "30%",
               border: "1px solid #c9e3fa",
               borderRadius: "6px"
             }}>
    <div style={{height: "15%", backgroundColor: "#c9e3fa",textAlign: "center"}}><div style={{paddingTop: "1%"}}>FINANCIAL RESPONSIBILITIES:</div></div>
    <div style={{paddingTop: "1%", textAlign: "center"}}><b>List of Accidents:</b> </div>
    <div style={{paddingTop: "1%", paddingLeft: "10%"}}><span  style={{paddingTop: "1%", paddingLeft: "2%"}}><b>FR Case No.</b></span> 
    <span  style={{paddingTop: "1%", paddingLeft: "8%"}}><b>Accident Date</b></span> 
    <span  style={{paddingTop: "1%", paddingLeft: "8%"}}><b>Location</b></span></div>
    {this.state.customerD26Info.Accidents.length > 0 ?
    <div style={{paddingTop: "1%", paddingLeft: "2%", overflow:"scroll", height: "61%"}}>
     {this.state.editmode === false ? <RadioGroup onChange={this.onChange} value={this.state.value} disabled>
        {accidentsList}
      </RadioGroup> :
      <RadioGroup onChange={this.onChange} value={this.state.value}>
      {accidentsList}
    </RadioGroup>
    }
</div>
:
<div style={{paddingLeft: "25%"}}>{this.state.customerD26Info.AccidentMessage}</div>}

          </div>}
           </Col >
            </Row>     
            {(this.state.caseDetailsObj.CaseStatusCode === 'SC') &&  <div style={{
    justify: "center",
    height: "30px",
    backgroundColor: "#c9e3fa",
    paddingLeft: "1%",
    marginTop: "25px"
   }} >
   <Button style={{marginLeft: "45%", marginTop: "4px"}} type="primary" size={"small"} onClick={this.openCaseSchedule}><Icon type="calendar" style={{ fontSize: 16 , color: "white"}}/>Schedule Detail</Button> 
<Modal     title={scheduleTitle}
          visible={this.state.caseSchedVisible}
          onCancel={this.handleCancel}
        
          footer = { [
            <Button type="primary" key="Ok" onClick={this.handleCancel}>Ok</Button>
        ]}
          width={'60%'}> 
          {caseScheduleData && 
 <div> <Row span = {32} gutter={16}>
<Col span = {12}> <div         
                                    style={{
                                    borderRadius: "8px",
                                    border: "solid",
                                    borderColor: "#c9e3fa", 
                                    ...boxShadows
                                    }}
                                >
<div   style={{
                                    backgroundColor: "#c9e3fa",
                                    borderRadius: "8px",
                                    ...boxShadows
                                    }}>Tracking Information</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Subject: </b>{caseScheduleData.CaseDetail.SubjectName}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>DL #: </b>{caseScheduleData.CaseDetail.DLNumber}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Type: </b>{caseScheduleData.CaseDetail.HearingType}</div>       
                                     <div style={{ paddingLeft: '5%'}}><b>Reason: </b>{caseScheduleData.CaseDetail.Reason}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Receipt Date: </b>{caseScheduleData.CaseDetail.ReceiptDate}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Other Interested Parties: </b></div>
                                     <div style={{ paddingLeft: '5%'}}><div style={{ backgroundColor: '#f2efef', marginRight: "5px", marginBottom: "5px", borderRadius: "8px"}}>   
                                     { oipdata.length !== 0 ? <Table
                                 bordered = {false} 
                                 size = 'small'                           
                                 pagination = {false}
                                 columns={oipcolumns} 
                                 dataSource={oipdata}
                                 rowKey={record => record.OIPName}
                                 showHeader
                                /> : "No OIPs"}
                                </div></div>
                                </div>
                                </Col>
                                <Col span ={12}>
                                {scheddata !== undefined ? <div         
                                    style={{
                                    borderRadius: "8px",
                                    border: "solid",
                                    borderColor: "#c9e3fa", 
                                    ...boxShadows
                                    }}
                                >
 <div   style={{
                                    backgroundColor: "#c9e3fa",
                                    borderRadius: "8px",
                                    ...boxShadows
                                    }}>Scheduling Information</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled Date: </b>{scheddata.ScheduledDate}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled Time: </b>{scheddata.StartTime} to {scheddata.EndTime}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Hearing Officer: </b>{scheddata.SCHEDBY_NME_FRST_PRSN} {scheddata.SCHEDBY_NME_SRNME_PRSN} </div>
                                     <div style={{ paddingLeft: '5%'}}><b>Location: </b>{scheddata.Location}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled By: </b>{scheddata.ScheduledBy}</div>       
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled On: </b>{scheddata.ScheduledOn}</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Status: </b><font color="red">{scheddata.Status}</font></div>
                                  </div> :  <div         
                                    style={{
                                    borderRadius: "8px",
                                    border: "solid",
                                    borderColor: "#c9e3fa", 
                                    ...boxShadows
                                    }}
                                >
 <div   style={{
                                    backgroundColor: "#c9e3fa",
                                    borderRadius: "8px",
                                    ...boxShadows
                                    }}>Scheduling Information</div>
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled Date: </b></div>
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled Time: </b></div>
                                     <div style={{ paddingLeft: '5%'}}><b>Hearing Officer: </b></div>
                                     <div style={{ paddingLeft: '5%'}}><b>Location: </b></div>
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled By: </b></div>       
                                     <div style={{ paddingLeft: '5%'}}><b>Scheduled On: </b></div>
                                     <div style={{ paddingLeft: '5%'}}><b>Status: </b></div>
                                  </div> }
                                  </Col>
    </Row>
    <Row style={{marginTop: "24px"}}>  <div
                                    style={{
                                    borderRadius: "8px",
                                    border: "solid",
                                    borderColor: "#c9e3fa", 
                                    ...boxShadows
                                    }}
                                >
                                    <div   style={{
                                    backgroundColor: "#c9e3fa",
                                    borderRadius: "8px",
                                    ...boxShadows
                                    }}>Reschedule Information</div>
                               {rescheddata.length !== 0 ? <Table
                                 bordered = {false} 
                                 size = 'small'                           
                                 pagination = {false}
                                 columns={reschedcolumns} 
                                 dataSource={rescheddata}
                                 rowKey={record => record.ScheduleTime}
                                 showHeader
                                /> : "No Reschedules"
                                  }
                                     </div>
                                     </Row>
                                     </div>
          }
           </Modal>
</div> }
            </div>}
  </div> ): 

(
       this.state.tabValue === 'DadH6' ? <div>
         <div style={{paddingLeft: '2%', paddingTop: '1%',justify: "center", width: '95%'}}>  <div style={{border: "solid", borderColor: "#c9e3fa"}}> 
<div style={{
justify: "center",
height: "30px",
backgroundColor: "#c9e3fa",
paddingLeft: "1%"
}} ><Icon type="profile" style={{ fontSize: 16 }} /> <span style={{fontSize: 'large', paddingLeft: '0.5%'}}>DAD H6 Information</span></div>{(h6Info.length > 0) ?  <div>{h6Info}</div>:
<div><span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span><span style={{ paddingLeft: "2%" }}><font size="large">Loading data...</font></span></div>
}</div></div></div> : <div>
{this.state.tabValue === 'Comments' &&  <div style={{paddingLeft: '2%', paddingTop: '1%',justify: "center", width: '95%'}}>  <div style={{border: "solid", borderColor: "#c9e3fa", height: "500px"}}> 
<div style={{
justify: "center",
height: "30px",
backgroundColor: "#c9e3fa",
paddingLeft: "1%"
}} ><Icon type="message" style={{ fontSize: 16 }} /> <span style={{fontSize: 'large', paddingLeft: '0.5%'}}>Comments</span><Button style={{marginLeft: "82%"}} type="default" size={"small"} onClick={(e) => this.onButtonClick(e,'New')}><Icon type="plus-square"></Icon>New Comment</Button></div>
<Modal     title="New Case Comment"
          visible={this.state.newCommModal}
          onCancel={this.handleCancelComm}    
          footer = { [
            <div>
            <Button style={{ color:  "white", backgroundColor: "red"}} type="default" key="Cancel" onClick={this.handleCancelComm}>Cancel</Button>
          {this.state.commentType === "C" ?( (this.state.commentValue.length > 0 ) ? <Button style={{ color:  "white", backgroundColor: "green"}} type="default" key="Ok" onClick={this.handleOk}>Save</Button> : <Button type="default" key="Ok" disabled>Save</Button>) :
 ( (this.state.commentValue.length > 0 && this.state.commentNumber.length > 0 && this.state.purgeDate.length > 0 ) ? <Button style={{ color:  "white", backgroundColor: "green"}} type="default" key="Ok" onClick={this.handleOk}>Save</Button> : <Button type="default" key="Ok" disabled>Save</Button> )}
            </div>
        ]}
          width={'60%'}> 
<div><RadioGroup name="commentType" value={this.state.commentType} onChange ={this.onCommentTypeChange}>
                                <Radio value={"C"}>Case Only</Radio>
                                <Radio value={"CD"}>Case and DL</Radio>
                                <Radio value={"D"}>DL Only</Radio>
                              </RadioGroup>
                              </div>
                              {commentType === "C" && <div style={{marginTop: "2%"}}>
                              <TextArea value={this.state.commentValue} rows="5" placeholder="Enter a comment" maxLength="250" style={{ width: '100%'}} onChange={this.onCommentTextChange}/> <div>
    {250 - this.state.commentValue.length}/250</div>
                              </div>}
                              {(commentType === "CD" || commentType === "D") && <div style={{marginTop: "2%"}}>
                              <div><span><b>Comment Number:</b></span><Tooltip
        trigger={['focus']}
        title="Input a number"
        placement="topLeft"
        //overlayClassName="numeric-input"
      ><Input value={this.state.commentNumber} onChange={this.onCommentNumberChange} style={{width:"20%"}}/></Tooltip><span><b>Purge Date (ex 12-19):</b></span><Tooltip
      //trigger={['focus']}
      title="Input a date after 11-19"
      placement="topLeft"
      //overlayClassName="numeric-input"
    >
      <MonthPicker onChange={this.onPurgeDateChange} style={{width:"20%"}} placeholder="mm-yy" format={monthFormat} />
    {/* <Input maxLength={5} value={this.state.purgeDate} onChange={this.onPurgeDateChange} placeholder= "mm-yy" style={{width:"20%"}}/> */}
    </Tooltip></div>
                              <TextArea value={this.state.commentValue} rows="5" placeholder="Enter a comment" maxLength="63" style={{ width: '100%'}} onChange={this.onCommentTextChange}/> <div>
    {63 - this.state.commentValue.length}/63</div>
                              </div>}
                             
          </Modal>
        {this.state.commentDelData !== undefined &&  <Modal
          title="ERROR" 
          visible={this.state.commentSaveError} onCancel={this.handleError}  footer = { [
            <div>
            <Button type="primary" key="Ok" onClick={this.handleError}>Ok</Button>
            </div>
        ]}><font size="40px" color="red"><div dangerouslySetInnerHTML={{ __html: this.state.commentDelData.Message.toString()}}/> </font></Modal>}
        {
          this.state.addCaseCommentData !== undefined &&  <Modal
          title={this.state.addCaseCommentData.Title} 
          visible={this.state.commentSaveError} onCancel={this.handleError}  footer = { [
            <div>
            <Button type="primary" key="Ok" onClick={this.handleError}>Ok</Button>
            </div>
        ]}><font size="40px" color="red"><div dangerouslySetInnerHTML={{ __html: this.state.addCaseCommentData.StatusMessage.toString()}}/> </font>
       {/* {this.state.addCaseCommentData.ErrorFields !== {} && <font size="40px" color="red"><div dangerouslySetInnerHTML={{ __html: this.state.addCaseCommentData.ErrorFields.commentTextInput.toString()}}/> </font>} */}
       </Modal>
        }
 {this.state.caseComments.Comments.length !== 0 ? <List
    dataSource={data}
    pagination={{pageSize: 5}}
    renderItem={item => (
      <List.Item key={item.NBR_COMM}>
        <List.Item.Meta
          title={<div style={{fontSize:16,  display: "inline-block", width: "100%"}}><div style={{float:"left", width: "5%"}}>{item.NBR_COMM}-</div><div  style={{float:"left", width: "85%"}}>{item.TXT_COMM}</div></div>}
          description={<div style={{paddingLeft:"5%", fontSize:12}}><span style={{fontWeight: "bold"}}>Posted On:</span><span style={{marginLeft: "10px"}}>{item.DT_UPDT_TRANS}</span><span style={{fontWeight: "bold", marginLeft: "30px"}}>Author:</span><span style={{marginLeft: "10px"}}>{item.EmployeeFullName}</span></div>}       
        />
        <Tooltip
        title="Delete Comment"
        placement="topLeft"
      ><span style={{ marginRight: "5%", paddingLeft: "5px", cursor: "pointer"}} onClick={(e) => this.openDelConf(item.NBR_COMM)}><Icon type="delete" style={{fontSize: 16, color: "red"}}/></span></Tooltip>
      </List.Item>
    )}
  /> : <div style={{paddingLeft: "45%",paddingTop: "10%"}}><h1>No comments on this case.</h1></div>
  }
  <Modal visible={this.state.openDelConf}
  onCancel={this.closeDelConf}
  footer = { [
    <div>
       <Button style={{ color:  "white", backgroundColor: "red"}} type="default" key="Cancel" onClick={this.closeDelConf}>No</Button>
      <Button style={{ color:  "white", backgroundColor: "green"}} type="default" key="Ok" onClick={this.handleDelete}>Yes</Button>
    </div>
]}
  >
  Do you want to delete the comment #{this.state.commentNumber}?
  </Modal>
  </div></div>}

       </div>
)
       }
        </Content>
      </Layout>
    </Content>
    </Layout>
    </Col>
    </Row>
    </div>
       ):(<div><span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span><span style={{ paddingLeft: "2%" }}><font size="large">Loading data...</font></span></div>))}
    </ScrollPanel>
); 
    }
}

const mapStateToProps = state => {
    return {
       cases: state.cases
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
          getCaseDetails,
          getCaseCertifications,
          getCaseReasons,
          getCaseReferrals,
          getHearingTypes,
          getCustomerD26Info,
          modifyCaseDetail,
          getH6Info,
          getCaseComments,
          getCaseScheduleDetail,
          addCaseComment,
          deleteCaseComment
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetails);