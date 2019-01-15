import React, { Component } from 'react';
import { Form, Input, Row, Button, DatePicker, Col, Radio, Select, Checkbox, Modal, Spin } from 'antd';
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import { getDUZData, saveDUZData,
//getDLInitialData
 } from "../../../store/actions/dlUpdatesActions";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';
import './me.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const dateFormat = "MM-DD-YYYY";

const defaultObj = {
    LoginId: '',
    NetName: '',
    RequestorCode: '',
    Operator: '',
    DLNumber: '',
    ThreeCharacterName: '',
    BirthDate: '',
    AuthoritySection: '',
    TypeAction: '',
    Reason: '',
    NewEffectiveDate: '',
    ThroughDate: '',
    MailDate: '',
    OrigAuthoritySection: '',
    OrigEffectiveDate: '',
    UpdateCopies: '',
    OutOfStateDLNo: '',
    OutOfStateCd: '',
    CommercialStatusIndicator:'',
    HearingType: '',
    HearingDate: '',
    HearingLocation: '',
    HearingResult: '',
    ModifiedHearingDate: '',
    EndStay: '',
    PMOption: 'N/A',
    PMCode: '',
    RestrictionsOptions: 'N/A',
    Restriction1: '',
    Restriction2: '',
    Restriction3: '',
    CoFo: '',
    LicenseLocation: '',
    FieldFile: '',
    RouteCode: '',
    MedicalSuspense: '',
    DUZResponse: '',
    NextDLNumber: '',
    Error: true
};

class DUZUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DLNumber: this.props.match.params.dlNumber,
            Obj: cloneDeep(defaultObj),
            NewEffectiveDate: "",
            MailDate: "",
            OrigEffectiveDate: "",
            ThroughDate:"",
            HearingDate: '',
            ModifiedHearingDate: "",
            errorObj: {},
            ErrorMessage: '',
            ErrorModalShow: false
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.dateFormatFunc = this.dateFormatFunc.bind(this);
    }
    componentDidMount(){
        if(sessionStorage.getItem('dlInitData')){
         const DLInitData = JSON.parse(sessionStorage.getItem('dlInitData'));
            this.setState({
                DLNumber: DLInitData.DLNumber,
                ThreeCharacterName: DLInitData.ThreeCharacterName,
                BirthDate: DLInitData.Birthdate
            });
            this.props.getDUZData(DLInitData.DLNumber);
        }
        else 
        {
            this.props.history.push(`/dlUpdates`);
        }
                }
    componentDidUpdate(prevProps){
                    
                            if ( prevProps.dlUpdates.DUZInitData !== this.props.dlUpdates.DUZInitData && this.props.dlUpdates.DUZInitData !== undefined) {
                                this.setState({DUZInitData: this.props.dlUpdates.DUZInitData});
                            }
                            if ( prevProps.dlUpdates.saveDUZData !== this.props.dlUpdates.saveDUZData && this.props.dlUpdates.saveDUZData !== undefined) {
                                this.setState({saveDUZData: this.props.dlUpdates.saveDUZData, openSuccessModal: true});
                            }
                            if ( prevProps.dlUpdates.dlUpdatesErrorData !== this.props.dlUpdates.dlUpdatesErrorData ) {
                                let errors = [];
                                Object.keys(this.props.dlUpdates.dlUpdatesErrorData).map((keyName, keyIndex) =>
                                {
                                    errors.push(this.props.dlUpdates.dlUpdatesErrorData[keyName][0]);
                                })
                                this.setState({errorObj: this.props.dlUpdates.dlUpdatesErrorData, ErrorMessage: errors, ErrorModalShow: true});
                            }
    }
    static getDerivedStateFromProps(props, prevState) {
        
                const { DUZInitData, saveDUZData, dlUpdatesErrorData } = props.dlUpdates;
                if (DUZInitData && DUZInitData !== prevState.DUZInitData)
                {
                    return { DUZInitData: DUZInitData, isloading: false };
                } 
                if (saveDUZData && saveDUZData !== prevState.saveDUZData) return { saveDUZData: saveDUZData, isloading: false };
                if (dlUpdatesErrorData && dlUpdatesErrorData !== prevState.dlUpdatesErrorData) return {errorObj: dlUpdatesErrorData, error: dlUpdatesErrorData, isloading: false };
                return null;
            }
    handleFieldChange(e, field) {
        const { Obj } = this.state;
        let ErrorMessage = '', ErrorModalShow = false;
        switch (field) {
            case 'DLNumber':
            case 'ThreeCharacterName':
            case 'PMOption':
            case 'RestrictionsOptions':
            debugger;
                Obj[field] = e.target.value;
                if( field === 'PMOption' && e.target.value === 'N/A')
                {
                    Obj.PMCode = '';
                }
                if( field === 'RestrictionsOptions' && e.target.value === 'N/A')
                {
                    Obj.Restriction1 = '';
                    Obj.Restriction2 = '';
                    Obj.Restriction3 = '';
                }
                if( (Obj['DLNumber'].length === 8) ) {
        //    this.setState({DLNumber: Obj['DLNumber']});
            //   this.props.getDLInitialData(Obj['DLNumber']);
                    this.props.getDUZData(Obj['DLNumber'] );
                }
                break;
            case 'OutOfStateDLNo':
                if (e.target.value.length <= 25) {
                    Obj[field] = e.target.value;
                }
                break;
            case 'NextDLNumber':
            if (e.target.value.length <= 3) {
                Obj[field] = e.target.value;
                }
                break;
                case 'RouteCode':
                // Todo: Allow Alpha characters only
                if (e.target.value.length <= 4) {
                    Obj[field] = e.target.value;
                    }
                    break;
                    case 'MedicalSuspense':
                                    //Todo: Allow Numerical characters only
                    if (e.target.value.length <= 2) {
                        Obj[field] = e.target.value;
                        }
                        break;
            case 'AuthoritySection':
            case 'TypeAction':
            case 'Reason':
            case 'CoFo':
            case 'UpdateCopies':
            case 'OrigAuthoritySection':
            case 'CommercialStatusIndicator':
            case 'HearingResult':
            case 'HearingType':
            case 'PMCode':
            case 'Restriction1':
            case 'Restriction2':
            case 'Restriction3':
            case 'HearingLocation':
            case 'EndStay':
            case 'LicenseLocation':
            case 'FieldFile':
            case 'OutOfStateCd':
                Obj[field] = e;
            default:
                break;
        }

        this.setState({ Obj });
    }

    onDateChange(d, ds, type) {
        const { Obj } = this.state;
        Obj[type] = ds || '';
        switch(type) {
            case 'NewEffectiveDate':
            this.setState({ Obj: Obj, NewEffectiveDate: d });
            break;
            case 'BirthDate':
            this.setState({ Obj: Obj, BirthDate: d });
            break;
            case 'OrigEffectiveDate':
            this.setState({ Obj: Obj, OrigEffectiveDate: d });
            break;
            case 'ThroughDate':
            this.setState({ Obj: Obj, ThroughDate: d });
            break;
            case 'MailDate':
            this.setState({ Obj: Obj, MailDate: d });
            break;
            case 'HearingDate':
            this.setState({ Obj: Obj, HearingDate: d });
            break;
            case 'ModifiedHearingDate':
            this.setState({ Obj: Obj, ModifiedHearingDate: d });
            break;
            default:
            break;
        }
    }
    handleModalClose() {
        this.setState({ ErrorModalShow: false, ErrorMessage: '' });
    }

    handleUpdate(type) {
        if(type === 'new')
        {
               this.setState({isNewDL: true});
              sessionStorage.removeItem('dlInitData');   
            }
     
        const { Obj, NewEffectiveDate, OrigEffectiveDate, ThroughDate, HearingDate, ModifiedHearingDate } = this.state;
        Obj['NewEffectiveDate'] = this.dateFormatFunc(NewEffectiveDate);
        Obj['OrigEffectiveDate'] = this.dateFormatFunc(OrigEffectiveDate);
        Obj['ThroughDate'] = this.dateFormatFunc(ThroughDate);
        Obj['HearingDate'] = this.dateFormatFunc(HearingDate);
        Obj['ModifiedHearingDate'] = this.dateFormatFunc(ModifiedHearingDate);
        Obj['RequestorCode'] = this.state.DUZInitData.RequestorCode;
        Obj['Operator'] = this.state.DUZInitData.Operator;
        Obj['NetName'] = this.state.DUZInitData.NetName;
        Obj['LoginId'] = this.state.DUZInitData.LoginId;
        Obj['DLNumber'] = this.state.DLNumber;
        Obj['ThreeCharacterLastName'] = this.state.ThreeCharacterName;
        this.setState({isloading: true, DLNumber: Obj['DLNumber']});
        this.props.saveDUZData(Obj);
    }
    dateFormatFunc = date =>
    {
        const fdate = moment(date).format('MM-DD-YYYY');
        if(fdate.includes('Invalid'))
        {
            return "";
        }
        else
        return fdate;
    }
    render() {
        const { Obj } = this.state;
        const { DUZInitData, saveDUZData, isNewDL, isloading } = this.state;

        return (
            <ScrollPanel
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)"
                }}
            >
                 {isloading !== true ?  <div style={{backgroundColor: "white", height: '800px', width: "95%", marginLeft: '2%'}}> 
               {saveDUZData && <Modal title={"Update Status"} visible={this.state.openSuccessModal} onCancel={(e) => this.setState({openSuccessModal: false})} footer={[<Button type="primary" key="Ok" onClick={(e) => {this.setState({openSuccessModal: false}); 
               if(isNewDL !== true ) {
                   this.props.history.push({ pathname: `/dlUpdates`,
            state: {dlNumber: saveDUZData.DLNumber}})}
            if(isNewDL === true)
            {
                this.setState({Obj: cloneDeep(defaultObj),
                    NewEffectiveDate: "",
                    OrigEffectiveDate: "",
                    ThroughDate: "",
                    HearingDate:"",
                    ModifiedHearingDate: "",
                    errorObj: {},
                    PhoneNumber: "",
                    ErrorMessage: '',
                    ErrorModalShow: false
                });
            }
            if(Obj.NextDLNumber !== '')
            {
                this.props.history.push({ pathname: `/${Obj.NextDLNumber.toLowerCase()}Update/DLNumber/${this.state.DLNumber}`,
                state: {DLNumber: this.state.DLNumber, ThreeCharacterName: this.state.ThreeCharacterName, BirthDate: this.state.BirthDate}});
            }
}}>OK</Button>]}><div><div dangerouslySetInnerHTML={{ __html: saveDUZData.DUZResponse.toString()}}/>
          </div></Modal>}
            {DUZInitData ?   
            <div><h1><b>Discretionary Action (DUZ)</b></h1>
                <Form className="ant-advanced-search-form">
                {isNewDL ? <Row>
                        <Col span={6} style={{ display: 'block' }}>
                            <FormItem
                                label={<b>DL # </b>}
                            >
                                <Input value={Obj.DLNumber} placeholder="DL Number" onChange={e => this.handleFieldChange(e, 'DLNumber')} />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                label={<b>3 Pos Last Name </b>}
                            >
                                <Input value={Obj.ThreeCharacterName} placeholder="3 Pos Last Name" onChange={e => this.handleFieldChange(e, 'ThreeCharacterName')} />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1} style={{ height: 'inherit', height: '39px' }} >
                            <FormItem
                                label={<b>Birth Date </b>}
                            >
                                <DatePicker placeholder="Birth Date"
                                    value={Obj.BirthDate ? moment(new Date(Obj.BirthDate)) : ''}
                                    onChange={(d, ds) => { this.onDateChange(d, ds, 'BirthDate') }}
                                />
                            </FormItem>
                        </Col>
                    </Row>:
               <Row>
                               <Col span={5}>
                               <FormItem
                                label={<b>DL #</b>}
                            >
                                   {this.state.DLNumber}
                                   </FormItem>
                               </Col>
                               <Col span={5} offset={1}>
                               <FormItem
                                label={<b>3 Pos Last Name</b>}
                            >
                                {this.state.ThreeCharacterName}
                                </FormItem>
                               </Col>
                               <Col span={6} offset={1} >
                            <FormItem
                                label={<b>Birth Date </b>}
                            >
                             {this.state.BirthDate}
                                   </FormItem>
                               </Col>
                           </Row>
               }
                    <Row>
                        <Col span={6}>
                            <FormItem
                              validateStatus = {Obj.AuthoritySection === '' && this.state.errorObj !== {}  && this.state.errorObj["AuthoritySection"] ? 'error' : ""}
                              help = {Obj.AuthoritySection === '' && this.state.errorObj !== {}  && this.state.errorObj["AuthoritySection"]}
                                label={<b>Authority Section </b>}
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'AuthoritySection')}
                                    value={Obj.AuthoritySection} showArrow={true} size={"default"}
                                >
                                    {DUZInitData.AuthoritySection.map((item) =>
                                        {
                                            return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                    })}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                 validateStatus = {Obj.AuthSect2 === '' && this.state.errorObj !== {}  && this.state.errorObj["TypeAction"] ? 'error' : ""}
                                 help = {Obj.AuthSect2 === '' && this.state.errorObj !== {}  && this.state.errorObj["TypeAction"]}
                                label={<b>Type Action </b>}
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'TypeAction')}
                                    value={Obj.TypeAction} showArrow={true} size={"default"}
                                >
                                       {DUZInitData.TypeAction.map((item) =>
                                        {
                                            return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                    })}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                 validateStatus = {Obj.Reason === '' && this.state.errorObj !== {}  && this.state.errorObj["Reason"] ? 'error' : ""}
                                 help = {Obj.Reason === '' && this.state.errorObj !== {}  && this.state.errorObj["Reason"]}
                                label={<b>Reason </b>}
                            >
                                <Select onChange={e => this.handleFieldChange(e, 'Reason')}
                                    value={Obj.Reason} showArrow={true} size={"default"}
                                >
                                  {DUZInitData.Reasons.map((item) =>
                                        {
                                            return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                    })}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                 validateStatus = {this.state.NewEffectiveDate === '' && this.state.errorObj !== {}  && this.state.errorObj["NewEffectiveDate"] ? 'error' : ""}
                                 help = {this.state.NewEffectiveDate === '' && this.state.errorObj !== {}  && this.state.errorObj["NewEffectiveDate"]}
                                label={<b>New Effective Date </b>}
                            >
                               <DatePicker placeholder="Select Date"
                                       value={this.state.NewEffectiveDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'NewEffectiveDate') }} />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                 validateStatus = {this.state.ThroughDate === '' && this.state.errorObj !== {}  && this.state.errorObj["ThroughDate"] ? 'error' : ""}
                                 help = {this.state.ThroughDate === '' && this.state.errorObj !== {}  && this.state.errorObj["ThroughDate"]}
                                label={<b>Mail Date </b>}
                            >
                                  <DatePicker placeholder="Select Date"
                                       value={this.state.ThroughDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'ThroughDate') }} />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                 validateStatus = {this.state.MailDate === '' && this.state.errorObj !== {}  && this.state.errorObj["MailDate"] ? 'error' : ""}
                                 help = {this.state.MailDate === '' && this.state.errorObj !== {}  && this.state.errorObj["MailDate"]}
                                label={<b>Mail Date </b>}
                            >
                                  <DatePicker placeholder="Select Date"
                                       value={this.state.MailDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'MailDate') }} />
                            </FormItem>
                        </Col>                     
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                 validateStatus = {Obj.OrigAuthSect === '' && this.state.errorObj !== {}  && this.state.errorObj["OrigAuthSect"] ? 'error' : ""}
                                 help = {Obj.OrigAuthSect === '' && this.state.errorObj !== {}  && this.state.errorObj["OrigAuthSect"]}
                                label={<b>Orig Auth Section </b>}
                            >
                                <Select  onChange={e => this.handleFieldChange(e, 'OrigAuthSect')}
                                    value={Obj.OrigAuthSect} showArrow={true} size={"default"}
                                >
                                      {DUZInitData.OriginalAuthoritySection.map((oas) =>
                                        {
                                            return <Option title={`${oas.Value} - ${oas.Text}`} key={oas.Value} value={oas.Value}>{oas.Value} - {oas.Text}</Option>
                                    })}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                 validateStatus = {this.state.OrigEffectiveDate === '' && this.state.errorObj !== {}  && this.state.errorObj["OrigEffectiveDate"] ? 'error' : ""}
                                 help = {this.state.OrigEffectiveDate === '' && this.state.errorObj !== {}  && this.state.errorObj["OrigEffectiveDate"]}
                                label={<b>Orig Effec Date </b>}
                            >
                                     <DatePicker placeholder="Select Date"
                                       value={this.state.OrigEffectiveDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'OrigEffectiveDate') }} />
                            </FormItem>
                        </Col>
                        <Col span={6} offset={1}>
                            <FormItem
                                 validateStatus = {Obj.UpdateCopies === '' && this.state.errorObj !== {}  && this.state.errorObj["UpdateCopies"] ? 'error' : ""}
                                 help = {Obj.UpdateCopies === '' && this.state.errorObj !== {}  && this.state.errorObj["UpdateCopies"]}
                                label={<b>Update Copies </b>}
                            >
                                <Select  onChange={e => this.handleFieldChange(e, 'UpdateCopies')}
                                    value={Obj.UpdateCopies} showArrow={true} size={"default"}
                                >
                                    {DUZInitData.UpdateCopies.map((item) =>
                                        {
                                            return <Option title={`${item.Value} - ${item.Text}`} key={item.Value} value={item.Value}>{item.Value} - {item.Text}</Option>
                                    })}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div style={{ border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                                <Row>
                                    <Col>
                                        <h4>Out-of-State-Data</h4>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={11}>
                                        <FormItem
                                             validateStatus = {Obj.OutOfStateDLNo === '' && this.state.errorObj !== {}  && this.state.errorObj["OutOfStateDLNo"] ? 'error' : ""}
                                             help = {Obj.OutOfStateDLNo === '' && this.state.errorObj !== {}  && this.state.errorObj["OutOfStateDLNo"]}
                                              label={<b>O / S DL # </b>}>
                                            <Input placeholder="O / S DL #" value={Obj.OutOfStateDLNo}
                                                onChange={e => this.handleFieldChange(e, 'OutOfStateDLNo')} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} offset={1}>
                                        <FormItem 
                                             validateStatus = {Obj.OutOfStateCd === '' && this.state.errorObj !== {}  && this.state.errorObj["OutOfStateCd"] ? 'error' : ""}
                                             help = {Obj.OutOfStateCd === '' && this.state.errorObj !== {}  && this.state.errorObj["OutOfStateCd"]}
                                             label={<b>O / S Code </b>}>
                                            <Select onChange={e => this.handleFieldChange(e, 'OutOfStateCd')}
                                                value={Obj.OutOfStateCd} showArrow={true} size={"default"}
                                            >
                                               {DUZInitData.OSCode.map((oc) => {
                                   return <Option title={`${oc.Value} - ${oc.Text}`} key={oc.Value} value={oc.Value}>{oc.Value} - {oc.Text}</Option>
                               })}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={8} offset={1}>
                            <FormItem 
                                 validateStatus = {Obj.CommercialStatusIndicator === '' && this.state.errorObj !== {}  && this.state.errorObj["CommercialStatusIndicator"] ? 'error' : ""}
                                 help = {Obj.CommercialStatusIndicator === '' && this.state.errorObj !== {}  && this.state.errorObj["CommercialStatusIndicator"]}
                                 label={<b>Commercial Status Ind </b>}>
                                <Select onChange={e => this.handleFieldChange(e, 'CommercialStatusIndicator')}
                                    value={Obj.CommercialStatusIndicator} showArrow={true} size={"default"}
                                >
                                    {DUZInitData.CommStatusIndicator.map((csi) => {
                                   return <Option title={`${csi.Value} - ${csi.Text}`} key={csi.Value} value={csi.Value}>{csi.Value} - {csi.Text}</Option>
                               })}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <br />
                    <div style={{ width: '80%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px' }}>
                        <Row>
                            <Col>
                                <h4>Hearing Information</h4>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <FormItem 
                                     validateStatus = {Obj.HearingType === '' && this.state.errorObj !== {}  && this.state.errorObj["HearingType"] ? 'error' : ""}
                                     help = {Obj.HearingType === '' && this.state.errorObj !== {}  && this.state.errorObj["HearingType"]}
                                     label={<b>Type </b>}>
                                    <Select onChange={e => this.handleFieldChange(e, 'HearingType')}
                                        value={Obj.HearingType} showArrow={true} size={"default"}
                                    >
                                      {DUZInitData.ChgHearingType.map((ht) => {
                                   return <Option title={`${ht.Value} - ${ht.Text}`} key={ht.Value} value={ht.Value}>{ht.Value} - {ht.Text}</Option>
                               })}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                     validateStatus = {this.state.HearingDate === '' && this.state.errorObj !== {}  && this.state.errorObj["HearingDate"] ? 'error' : ""}
                                     help = {this.state.HearingDate === '' && this.state.errorObj !== {}  && this.state.errorObj["HearingDate"]}
                                    label={<b>Date </b>}
                                >
                                     <DatePicker placeholder="Select Date"
                                       value={this.state.HearingDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'HearingDate') }} />
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem      
                                validateStatus = {Obj.DSFieldOffice === '' && this.state.errorObj !== {}  && this.state.errorObj["DSFieldOffice"] ? 'error' : ""}
                              help = {Obj.DSFieldOffice === '' && this.state.errorObj !== {}  && this.state.errorObj["DSFieldOffice"]}
                                label={<b>Location </b>}>
                                    <Input placeholder="Location" value={Obj.DSFieldOffice}
                                        onChange={e => this.handleFieldChange(e, 'DSFieldOffice')} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem 
                                     validateStatus = {Obj.HearingResult === '' && this.state.errorObj !== {}  && this.state.errorObj["HearingResult"] ? 'error' : ""}
                                     help = {Obj.HearingResult === '' && this.state.errorObj !== {}  && this.state.errorObj["HearingResult"]}
                                label={<b>Result </b>}>
                                    <Select onChange={e => this.handleFieldChange(e, 'HearingResult')}
                                        value={Obj.HearingResult} showArrow={true} size={"default"}
                                    >
                                        {DUZInitData.HearingResults.map((hr) => {
                                   return <Option title={`${hr.Value} - ${hr.Text}`} key={hr.Value} value={hr.Value}>{hr.Value} - {hr.Text}</Option>
                               })}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                     validateStatus = {this.state.ModifiedHearingDate === '' && this.state.errorObj !== {}  && this.state.errorObj["ModifiedHearingDate"] ? 'error' : ""}
                                     help = {this.state.ModifiedHearingDate === '' && this.state.errorObj !== {}  && this.state.errorObj["ModifiedHearingDate"]}
                                    label={<b>Mod Date </b>}
                                >
                                      <DatePicker placeholder="Select Date"
                                       value={this.state.ModifiedHearingDate} format={dateFormat} onChange={(d, ds) => { this.onDateChange(d, ds, 'ModifiedHearingDate') }} />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <br/>
                    <Row>
                    <div style={{width: '20%', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px', float: 'left' }}>
                    <Row>
                            <Col>
                                <h4>P/M Code</h4>
                                <hr />
                            </Col>
                        </Row> <Row><RadioGroup name="PMOption" value={Obj.PMOption} onChange={(e) => this.handleFieldChange(e, 'PMOption')}>
                                        <Radio key={`N`} value={'N/A'}>N/A</Radio>
                                        <Radio key={`A`} value={'Add'}>Add</Radio>

                                    </RadioGroup></Row><br /><Row>
                               <Select disabled={Obj.PMOption === 'N/A' ? true: false}  onChange={e => this.handleFieldChange(e, 'PMCode')}
                            value={Obj.PMCode} showArrow={true} size={"default"}
                        >
                         {DUZInitData.PMCode.map((ff) => {
                           return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
                       })}
                        </Select>  </Row>
                </div>
                <div style={{width: '30%', marginLeft: '20px', border: '0.5px dotted grey', borderRadius: '5px', padding: '10px', float: 'left' }}>
                <Row>
                            <Row>
                                <h4>Restriction</h4>
                                <hr />
                            </Row>
                           <Row> <RadioGroup name="RestrictionsOptions" value={Obj.RestrictionsOptions} onChange={(e) => this.handleFieldChange(e, 'RestrictionsOptions')}>
                                        <Radio  key={`N`} value={'N/A'}>N/A</Radio>
                                        <Radio  key={`A`} value={'Add'}>Add</Radio>
                                        <Radio  key={`D`} value={'Delete'}>Delete</Radio>
                                    </RadioGroup>
                               </Row>
                               <br />
                               <Row>
                                   <Col span={7}>
                               <Select disabled={Obj.RestrictionsOptions === 'N/A' ? true: false} onChange={e => this.handleFieldChange(e, 'Restriction1')}
                            value={Obj.Restriction1} showArrow={true} size={"default"}
                        >
                         {DUZInitData.Rest1.map((ff) => {
                           return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
                       })}
                        </Select>
                        </Col>
                        <Col style={{marginLeft: '10px'}} span={7}>
                        <Select disabled={Obj.RestrictionsOptions === 'N/A' ? true: false} onChange={e => this.handleFieldChange(e, 'Restriction2')}
                            value={Obj.Restriction2} showArrow={true} size={"default"}
                        >
                         {DUZInitData.Rest2.map((ff) => {
                           return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
                       })}
                        </Select>
                        </Col> <Col style={{marginLeft: '10px'}} span={7}>
                        <Select disabled={Obj.RestrictionsOptions === 'N/A' ? true: false} onChange={e => this.handleFieldChange(e, 'Restriction3')}
                            value={Obj.Restriction3} showArrow={true} size={"default"}
                        >
                         {DUZInitData.Rest2.map((ff) => {
                           return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
                       })}
                        </Select> </Col>
                               </Row>     
                        </Row>
                </div>
                    <div style={{ marginLeft: '20px', width: '40%', padding: '10px', float: 'left' }}>
                    <Row><Col span= {20}>
                            <FormItem
                                 validateStatus = {Obj.CoFo === '' && this.state.errorObj !== {}  && this.state.errorObj["CoFo"] ? 'error' : ""}
                                 help = {Obj.CoFo === '' && this.state.errorObj !== {}  && this.state.errorObj["CoFo"]}
                                label={<b>Co / Fo </b>}
                            >
                                <Select style={{width: '80%'}} onChange={e => this.handleFieldChange(e, 'CoFo')}
                                    value={Obj.CoFo} showArrow={true} size={"default"}
                                >
                                  {DUZInitData.CoFo.map((cf) =>
                                        {
                                            return <Option title={`${cf.Value} - ${cf.Text}`} key={cf.Value} value={cf.Value}>{cf.Value} - {cf.Text}</Option>
                                    })}
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                        <Col span={10}>
                    <FormItem style={{display: 'block'}}
                         validateStatus = {Obj.LicenseLocation === '' && this.state.errorObj !== {}  && this.state.errorObj["LicenseLocation"] ? 'error' : ""}
                         help = {Obj.LicenseLocation === '' && this.state.errorObj !== {}  && this.state.errorObj["LicenseLocation"]}
                        label={<b>License Location </b>}
                    >
                        <Select style={{width: '80%'}} onChange={e => this.handleFieldChange(e, 'LicenseLocation')}
                            value={Obj.LicenseLocation} showArrow={true} size={"default"}
                        >
                         {DUZInitData.LicenseLocation.map((ff) => {
                           return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
                       })}
                        </Select>
                    </FormItem>
                </Col>
                    <Col span={10}>
                    <FormItem style={{display: 'block'}}
                         validateStatus = {Obj.FieldFile === '' && this.state.errorObj !== {}  && this.state.errorObj["FieldFile"] ? 'error' : ""}
                         help = {Obj.FieldFile === '' && this.state.errorObj !== {}  && this.state.errorObj["FieldFile"]}
                        label={<b>Field File </b>}
                    >
                        <Select style={{width: '80%'}} onChange={e => this.handleFieldChange(e, 'FieldFile')}
                            value={Obj.FieldFile} showArrow={true} size={"default"}
                        >
                         {DUZInitData.FieldFile.map((ff) => {
                           return <Option title={`${ff.Value} - ${ff.Text}`} key={ff.Value} value={ff.Value}>{ff.Value} - {ff.Text}</Option>
                       })}
                        </Select>
                    </FormItem>
                </Col>
                </Row>
                <Row>
                        <Col span={10}>
                    <FormItem
                         validateStatus = {Obj.RouteCode === '' && this.state.errorObj !== {}  && this.state.errorObj["RouteCode"] ? 'error' : ""}
                         help = {Obj.RouteCode === '' && this.state.errorObj !== {}  && this.state.errorObj["RouteCode"]}
                        label={<b>Route Code </b>}
                    >
                      <Input style={{width: "85%"}} value={Obj.RouteCode} placeholder="Route Code" onChange={e => this.handleFieldChange(e, 'RouteCode')} />
                    </FormItem>
                </Col>
                    <Col style={{marginLeft: "20px"}} span={10}>
                    <FormItem
                         validateStatus = {Obj.MedicalSuspense === '' && this.state.errorObj !== {}  && this.state.errorObj["MedicalSuspense"] ? 'error' : ""}
                         help = {Obj.MedicalSuspense === '' && this.state.errorObj !== {}  && this.state.errorObj["MedicalSuspense"]}
                        label={<b>Medical Suspense </b>}
                    >
                    <Input style={{width: "100%"}}  value={Obj.MedicalSuspense} placeholder="Medical Suspense" onChange={e => this.handleFieldChange(e, 'MedicalSuspense')} />
                    </FormItem>
                </Col>
                </Row>
                </div>
                </Row>
                    <Row>
                        <Col span={20}>
                            <FormItem
                                 validateStatus = {Obj.NextDLNumber === '' && this.state.errorObj !== {}  && this.state.errorObj["NextDLNumber"] ? 'error' : ""}
                                 help = {Obj.NextDLNumber === '' && this.state.errorObj !== {}  && this.state.errorObj["NextDLNumber"]}
                                label={<b>Next Trans </b>}
                            >
                                <Input style={{width: '20%'}} value={Obj.NextDLNumber} placeholder="Next Transaction" onChange={e => this.handleFieldChange(e, 'NextDLNumber')} />
                            </FormItem>
                        </Col>
                        <Col span={4} style={{ float: 'right' }}>
                        {Obj.NextDLNumber !== '' ? <Button disabled
                           type="default">New DL</Button>: <Button style={{ color: "white", backgroundColor: "green" }}
                            type="default" key="New DL" onClick={(e) => this.handleUpdate('new')}>New DL</Button>} {' '}
                            <Button type="primary" key="Update" onClick={(e) => this.handleUpdate('update')}>Update</Button> {' '}
                            <Button style={{ color: "white", backgroundColor: "red" }}
                                type="default" key="Cancel" onClick={(e) =>
                                    {debugger;
                                    this.props.history.push({ pathname: `/dlUpdates`,
                                state: {dlNumber: this.state.DLNumber}})
                                    }
                            }>Cancel</Button>
                        </Col>
                    </Row>
                </Form></div>  : <div><span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span><span style={{ paddingLeft: "2%" }}><font size="large">Loading data...</font></span></div>}
                <Modal visible={this.state.ErrorModalShow}
                    title={'Error message'} maskClosable={false}
                    footer={[
                        <div>
                            <Button type="primary" key="Ok" onClick={(e) => 
                            {
                                this.setState({ErrorModalShow: false});
                                if(isNewDL === true)
                                {
                                    this.setState({Obj: cloneDeep(defaultObj),
                                        NewEffectiveDate: "",
                                        OrigEffectiveDate: "",
                                        ThroughDate: "",
                                        HearingDate:"",
                                        ModifiedHearingDate: "",
                                        errorObj: {},
                                        PhoneNumber: "",
                                        ErrorMessage: '',
                                        ErrorModalShow: false
                                    });
                                }
                                if(Obj.NextDLNumber !== '')
                                {
                                    this.props.history.push({ pathname: `/${Obj.NextDLNumber.toLowerCase()}Update/DLNumber/${this.state.DLNumber}`,
                                    state: {DLNumber: this.state.DLNumber, ThreeCharacterName: this.state.ThreeCharacterName, BirthDate: this.state.BirthDate}});
                                }  
                        }}>Ok</Button>
                        </div>
                    ]}
                >
                   {this.state.ErrorMessage && (typeof this.state.ErrorMessage === 'object') ? <ul><font color='red'>{this.state.ErrorMessage.map((item) => <li>{item}</li>)}</font></ul>: <div><font color= 'red'>{this.state.ErrorMessage}</font></div>}
                </Modal>
                </div> : <div><span style={{ paddingLeft: "40%" }}> <Spin size="large" /> </span><span style={{ paddingLeft: "2%" }}><font size="large">Loading data...</font></span></div>}
            </ScrollPanel >);
    }
}
    
const mapStateToProps = state => {
    return {
      dlUpdates: state.dlUpdates
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDUZData, saveDUZData,
            //getDLInitialData
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DUZUpdate); 