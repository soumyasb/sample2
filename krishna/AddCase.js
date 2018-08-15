import React, { Component } from 'react';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { withRouter } from "react-router-dom";
import { getCreateCaseDetails, getHearingTypes, getCaseReasons, getCaseReferrals, getCaseCertifications, getCustomerD26Info, addCase } from "../../../store/actions/caseActions";
import { Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Radio, Input, Button, Select, Layout, Menu, Icon } from 'antd';
import "../../../Cases.css";

const { Content } = Layout;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const getDropdownList = (listObj, selectedValue) => listObj.map(item => {
  if(item.Value === selectedValue) {
    return (<Option key={item.Value} value={item.Value} selected>{item.Text}</Option>);
  }

  return (<Option key={item.Value} value={item.Value}>{item.Text}</Option>);
});

const getAccidentsList = (accidentsObj) => accidentsObj.Accidents.map(item =>
    (<Radio style={radioStyle} value={item.CaseNumber}>
      <span style={{paddingLeft:"5px"}}>{item.CaseNumber}</span>
      <span style={{paddingLeft:"25px"}}>{item.Date}</span>
      <span style={{paddingLeft:"25px"}}>{item.City}</span>
    </Radio>)
  );

const reqRsnCodesForCerts = ["871","875","880","881","882","883","884","885","887","888","889","891","892","894","897","898"];

class AddCase extends Component {
  constructor(props) {
    super(props);

    this.state={
      customerDetailsObj: props.cases.customerDetailsObj,
      createCaseObj: props.cases.createCaseObj,
      hearingTypes: props.cases.hearingTypesList,
      caseReasons: props.cases.caseReasonsList,
      caseReferrals: props.cases.caseReferralsList,
      caseCertifications: props.cases.caseCertificationsList,
      customerD26Info: props.cases.customerD26Info,
      dlNumber: props.match.params.dlNumber
    };

    this.onButtonClick = this.onButtonClick.bind(this);   
    this.handleChange = this.handleChange.bind(this);
    this.textChange = this.textChange.bind(this);   
  }    

  componentDidMount() {debugger
    if(this.props.location.state !== undefined) {
      this.props.getCreateCaseDetails(this.props.location.state.detail);
    } else {
      this.props.getCreateCaseDetails(this.state.customerDetailsObj);
    }
    this.props.getHearingTypes();
    this.props.getCaseReasons();
    this.props.getCaseReferrals();
    this.props.getCaseCertifications();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cases.createCaseObj !== nextProps.cases.createCaseObj) {
      if(nextProps.cases.createCaseObj !== undefined) {
        if(nextProps.cases.createCaseObj.CaseNumber) {
          this.props.history.push(`/caseDetails/CaseNumber/${nextProps.cases.createCaseObj.CaseNumber}`);
        }

        this.setState({ createCaseObj: nextProps.cases.createCaseObj});
        this.setState({ caseReason: nextProps.cases.createCaseObj.CD_RSN});
        this.setState({ caseReferral: nextProps.cases.createCaseObj.CD_REFR_SRCE_TYP});
        this.setState({ caseCertification: nextProps.cases.createCaseObj.CD_ENDR});
        this.setState({ hearingTypes: nextProps.cases.hearingTypesList});
        this.setState({ caseReasons: nextProps.cases.caseReasonsList});
        this.setState({ caseReferrals: nextProps.cases.caseReferralsList});
        this.setState({ caseCertifications: nextProps.cases.caseCertificationsList});
        this.setState({ value: nextProps.cases.createCaseObj.FRCaseNumber});
        this.setState({ phoneNumber: nextProps.cases.createCaseObj.PhoneNumber});
        this.props.getCustomerD26Info(nextProps.cases.createCaseObj.DLNumber);
      }
    }
  
    if (this.props.cases.customerD26Info !== nextProps.cases.customerD26Info) {
      this.setState({ customerD26Info: nextProps.cases.customerD26Info});
    }
  }

  onButtonClick(e, value) {
    const { createCaseObj, customerD26Info } = this.state;

    if(value === 'Cancel') {
      this.props.history.push(`/customerDetails/dlNumber/${createCaseObj.DLNumber}`);
    }
    
    if(value === 'Save') {
      const accds = customerD26Info.Accidents.find(item => item.CaseNumber === createCaseObj.FRCaseNumber);
      if (accds) {
        createCaseObj.AccidentDate = accds.Date;
        createCaseObj.AccidentCity =  accds.City;
      }

      this.props.addCase(createCaseObj);
    }
  }

  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  textChange(e) {
    const { createCaseObj } = this.state;
    createCaseObj.PhoneNumber = e.target.value;
    this.setState({ createCaseObj });
  }

  handleChange = (e, listType) => {
    let obj = null;

    switch (listType) {
      case 'HRNG_TYP':
        obj = { HRNG_TYP: e };
        break;
      case 'CASE_RSN':  
        obj = { CASE_RSN: e };
        break;
      case 'CASE_RFL':
        obj = { CASE_RFL: e };
        break;
      case 'CASE_CERT':
        obj = { CASE_CERT: e };
        break;
      default:
        break;
    }

    if (obj) {
      const createCaseObj = Object.assign({}, this.state.createCaseObj, obj); 
      this.setState({ createCaseObj }); 
    }
  }

  render() {
    const {
      createCaseObj,
      customerD26Info,
      hearingTypes,
      caseReasons,
      caseReferrals,
      caseCertifications,
      caseReason,
      caseCertification,
    } = this.state;

    let accidentsList = [], hearingTypesList = [], caseReasonsList = [], caseReferralsList = [], caseCertificationsList = [];

    if (customerD26Info) { 
      accidentsList = getAccidentsList(customerD26Info);
    }
    
    if (createCaseObj) {
      if (hearingTypes) { 
        hearingTypesList = getDropdownList(hearingTypes, createCaseObj.CD_HRNG_TYP);    
      }
      
      if(caseReasons) { 
        caseReasonsList = getDropdownList(caseReasons, createCaseObj.CD_RSN);    
      }
      
      if(caseReferrals) { 
        caseReferralsList = getDropdownList(caseReferrals, createCaseObj.CD_REFR_SRCE_TYP);    
      }
      
      if(caseCertifications) { 
        caseCertificationsList = getDropdownList(caseCertifications, "");    
      }
    }

    const inputStyle = {
      width: '100%', 
      backgroundColor: "#f2efef",
      pointerEvents: "none"
    };
    
    return (   
      <ScrollPanel
          style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0)"
          }}
      >
      {(createCaseObj && caseReasonsList.length > 0 && caseReferralsList.length > 0 && caseCertificationsList.length > 0 && hearingTypesList.length > 0) ? (
        <div>
          <Row type="flex" justify="center">
            <Col span = {22}>     
              <div style={{
                justify: "center",
                height: "80px",
                paddingLeft: "1%",
                border: "3px solid white"}} >
                <div style={{paddingTop: "10px"}}>
                  <Icon type="idcard"  style={{ fontSize: 32 }}/> 
                  <span style={{fontSize: "xx-large"}}>{createCaseObj.LastName},{createCaseObj.FirstName}</span>
                  <span style={{fontSize: "x-large"}}>DL: {createCaseObj.DLNumber}</span>
                </div>
              </div>
                <Layout style={{ height: '100%', background: '#fff' }}>
                  <Content style={{height: "600px" }}>
                    <div style={{paddingLeft: '2%', paddingTop: '1%',justify: "center", width: '95%'}}>
                      <div style={{border: "solid", borderColor: "#c9e3fa", height: "500px"}}>
                        <div style={{
                          justify: "center",
                          height: "30px",
                          backgroundColor: "#c9e3fa",
                          paddingLeft: "1%"
                        }} >
                          <Icon type="profile" style={{ fontSize: 16 }}/>
                            <span style={{fontSize: 'large', paddingLeft: '0.5%'}}>Create New Case</span>
                              {
                                (createCaseObj.CaseStatusCode !== 'CL' && createCaseObj.CaseStatusCode !== 'UP') ?
                                  <span style={{paddingLeft: '80%'}}>
                                    <Button type="default" size={"small"} onClick={(e) => this.onButtonClick(e,'Cancel')}>Cancel</Button> 
                                    <Button type="default" size={"small"} onClick={(e) => this.onButtonClick(e,'Save')}>Save</Button>
                                  </span> :
                                  <span></span>
                              }
                        </div>

                        <Row type="flex" justify="space-around" >
                          <Col span = {6}>
                            <div style={{paddingTop: "5px"}}>
                              <b>Date of Birth</b>:
                              <Input value={createCaseObj.DOB} style={inputStyle} readOnly/>          
                            </div>
                            <div style={{paddingTop: "10px"}}>
                              <b>DL Number</b>:
                              <Input value={createCaseObj.DLNumber} style={inputStyle} readOnly/> 
                            </div>
                            <div style={{paddingTop: "10px"}}>
                              <b>License Class</b>:
                              <Input value={createCaseObj.classLicense} style={inputStyle} readOnly/> 
                            </div>
                            <div style={{paddingTop: "10px"}}>
                              <b>Phone Number</b>:
                              <Input value={createCaseObj.PhoneNumber} style={inputStyle} maxLength="10" onChange={e => this.textChange(e)} readOnly/> 
                            </div>
                            <div style={{paddingTop: "10px"}}>
                              <b>Mailing Address</b>:
                              <TextArea rows="5" value={createCaseObj.MailingAddress} style={inputStyle} readOnly/> 
                            </div>
                          </Col>
                          <Col span = {6}>
                            <div style={{paddingTop: "5px"}}>
                              <b>Case Number</b>:
                              <Input value="Case Number will be auto-generated" style={inputStyle} readOnly/> 
                            </div>
                            <div style={{paddingTop: "10px"}}>
                              <b>Received Date</b>:
                              <Input value= {createCaseObj.DT_RCPT} style={inputStyle} readOnly/> 
                            </div>          
                            <div style={{paddingTop: "10px"}}> 
                              <b>Case Status</b>:
                              <Input value={createCaseObj.CaseStatus} style={inputStyle} readOnly/> 
                            </div>
                            <div style={{paddingTop: "10px"}}> 
                              <b>Hearing Type</b>:
                              <Select value={createCaseObj.HRNG_TYP} onChange={e => this.handleChange(e, 'HRNG_TYP')} showArrow={true} size={"default"} style={{ width: '100%'}}>
                                {hearingTypesList}
                              </Select>
                            </div>
                            <div style={{paddingTop: "10px"}}> 
                              <b>Reason</b>:
                              <Select value={createCaseObj.CASE_RSN} onChange={e => this.handleChange(e, 'CASE_RSN')} showArrow={true} size={"default"} style={{ width: '100%'}} >
                                {caseReasonsList}
                              </Select> 
                            </div>
                            <div style={{paddingTop: "10px"}}> 
                              <b>Referral</b>:
                              <Select value={createCaseObj.CASE_RFL} onChange={e => this.handleChange(e, 'CASE_RFL')} showArrow={true} size={"default"} style={{ width: '100%'}} >
                                {caseReferralsList}
                              </Select> 
                            </div>
                            { reqRsnCodesForCerts.includes(caseReason) && <div style={{paddingTop: "10px"}}> 
                              <b>Special Cert/Endorsement</b>:
                              <Select value={caseCertification} onChange={e => this.handleChange(e, 'CASE_CERT')} showArrow={true} size={"default"} style={{ width: '100%'}} >
                                {caseCertificationsList}
                              </Select>
                            </div>}
                          </Col>
                          <Col span ={6}>
                            {caseReason === "950" ?
                            <div style={{ 
                              width: "100%",
                              height: "50%",
                              marginTop: "30%",
                              border: "1px solid #c9e3fa",
                              borderRadius: "6px"
                            }}>
                            <div style={{height: "15%", backgroundColor: "#c9e3fa",textAlign: "center"}}>
                              <div style={{paddingTop: "1%"}}>FINANCIAL RESPONSIBILITIES:</div>
                            </div>
                            <div style={{paddingTop: "1%", textAlign: "center"}}>
                              <b>List of Accidents:</b>
                            </div>
                            <div style={{paddingTop: "1%", paddingLeft: "10%"}}>
                              <span  style={{paddingTop: "1%", paddingLeft: "2%"}}>
                                <b>FR Case No.</b>
                              </span> 
                              <span style={{paddingTop: "1%", paddingLeft: "8%"}}>
                                <b>Accident Date</b>
                              </span> 
                              <span style={{paddingTop: "1%", paddingLeft: "8%"}}>
                                <b>Location</b>
                              </span>
                            </div>
                            <div style={{paddingTop: "1%", paddingLeft: "2%",overflow:"scroll", height: "61%"}}> 
                              {(accidentsList.length > 0) ? this.state.editmode === false ? 
                                <RadioGroup value={this.state.value} disabled>
                                  {accidentsList}
                                </RadioGroup> :
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                  {accidentsList}
                                </RadioGroup>
                              : "No accidents were found."}
                              </div>
                            </div>
                          : <div></div>}
                        </Col>
                      </Row>     
                    </div>  
                  </div>
                </Content>
              </Layout> 
          </Col>
        </Row>
      </div>) : <div></div>}
      </ScrollPanel>); 
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
          getCreateCaseDetails,
          getCaseCertifications,
          getCaseReasons,
          getCaseReferrals,
          getHearingTypes,
          getCustomerD26Info,
          addCase
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCase));