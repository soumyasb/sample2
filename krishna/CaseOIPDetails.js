import React, { Component } from 'react';
import { Row, Col, Table, List, notification, Spin, Modal, Radio, Input, Tooltip, Button, Select, Layout, Menu, Icon, Tabs } from 'antd';
import OIPLookResultsData from '../mocks/oiplookupresults.json';
import allOIPsforaCaseNumberData from '../mocks/alloipsforaCaseNumber.json';
import OIPTypesListData from '../mocks/OIPTypesList.json';
import OIPlanguagesData from '../mocks/OIPlanguages.json';

const { Option } = Select;
const { TextArea } = Input;

const newOIPItemObj = {
    detailsDisplayed: [
        "NME_AGENCY",
        "NBR_PHONE",
        "NBR_CELL_PHONE",
        "NBR_FAX"
    ],
    detailsCleanNames: [
        "Agency Name",
        "Phone Number",
        "Cell Number",
        "Fax Number"
    ],
    OIPID: -1,
    NbrOIP: null,
    CDUPDTTECHID: null,
    NMEFRSTPRSN: null,
    NMESURNMEPRSN: null,
    NMEMIDPRSN: null,
    NMESUFXPRSN: null,
    NBRPHONE: null,
    NBRCELLPHONE: null,
    NBRFAX: null,
    EmailAddress: null,
    ADDRLN1: null,
    CDCITY: null,
    CDSTATE: null,
    CDZIP: null,
    NMEAGENCY: null,
    TXTCOMM: null,
    CDPRTYTYP: null,
    DESCPRTYTYP: null,
    CdCase: null,
    CDLANGUAGE: null,
}

const getDropdownList = (listObj, selectedValue) => {
    let list = listObj.map(item => {
        if (item.Value !== "") {
            if (item.Value === selectedValue) {
                return <Option key={item.Value} value={item.Value} selected>{item.Text}</Option>;
            }
            return <Option key={item.Value} value={item.Value}>{item.Text}</Option>;
        }
    });
    return list;
}

class CaseOIPDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allOIPsforaCaseNumber: allOIPsforaCaseNumberData,
            oiplookupresults: OIPLookResultsData,
            oipItemObj: allOIPsforaCaseNumberData[0],
            disableNewButton: false,
            displayViewList: true,
            editMode: false,
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleListMenuChange = this.handleListMenuChange.bind(this);
        this.handleNewOIP = this.handleNewOIP.bind(this);
        this.handleViewList = this.handleViewList.bind(this);
        this.handleLookupExisting = this.handleLookupExisting.bind(this);
    }

    handleLookupExisting() {
        this.setState({ displayViewList: false });
    }

    handleViewList() {
        this.setState({ displayViewList: true });
    }

    handleNewOIP() {
        const { allOIPsforaCaseNumber } = this.state;

        allOIPsforaCaseNumber.unshift(newOIPItemObj);
        this.setState({
            allOIPsforaCaseNumber,
            disableNewButton: true,
            oipItemObj: newOIPItemObj,
        });
    }

    handleListMenuChange(e) {
        const oipItemObj = this.state.allOIPsforaCaseNumber.find(i => i.OIPID === parseInt(e.key));
        this.setState({ oipItemObj });
    }

    handleFieldChange(e, type) {
        const { oipItemObj } = this.state;

        switch (type) {
            case 'CDPRTYTYP':
            case 'CDLANGUAGE':
                oipItemObj[type] = e
                break;
            case 'NMEFRSTPRSN':
            case 'NMESURNMEPRSN':
            case 'NMEMIDPRSN':
            case 'NMESUFXPRSN':
            case 'NMEAGENCY':
            case 'NBRPHONE':
            case 'NBRCELLPHONE':
            case 'NBRFAX':
            case 'EmailAddress':
            case 'ADDRLN1':
            case 'CDCITY':
            case 'CDSTATE':
            case 'CDZIP':
            case 'TXTCOMM':
            case 'DESCPRTYTYP':
            case 'CdCase':
                oipItemObj[type] = e.target.value;
            default:
                break;
        }

        this.setState({ oipItemObj });
    }

    renderLeftNavOIPs() {
        const { allOIPsforaCaseNumber, oipItemObj } = this.state;

        const menuItems = allOIPsforaCaseNumber.map(item => {
            const menuText = (item.NMEFRSTPRSN && item.NMESURNMEPRSN) ? `${item.NMEFRSTPRSN} ${item.NMESURNMEPRSN}` : 'New OIP';
            return <Menu.Item key={item.OIPID} value={item.OIPID}>{menuText}</Menu.Item>;
        });

        return (<Col span={6} style={{ paddingRight: "15px" }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={[allOIPsforaCaseNumber[0].OIPID.toString()]}
                style={{ height: '100%' }}
                onClick={this.handleListMenuChange}
                selectedKeys={[oipItemObj.OIPID.toString()]}
            >
                {menuItems}
            </Menu>
        </Col>);
    }

    renderDetails() {
        const oiptypesList = getDropdownList(OIPTypesListData);
        const oiplanguagesList = getDropdownList(OIPlanguagesData);

        const { oipItemObj, editMode } = this.state;

        const { OIPID, NbrOIP, CDUPDTTECHID, NMEFRSTPRSN, NMESURNMEPRSN,
            NMEMIDPRSN, NMESUFXPRSN, NBRPHONE, NBRCELLPHONE, NBRFAX,
            EmailAddress, ADDRLN1, CDCITY, CDSTATE, CDZIP, NMEAGENCY,
            TXTCOMM, CDPRTYTYP, DESCPRTYTYP, CdCase, CDLANGUAGE,
        } = oipItemObj;

        return (<Col span={18} style={{ padding: "15px" }}>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={5}>
                        <b>OIP Type </b>:
                        <Select onChange={e => this.handleFieldChange(e, 'CDPRTYTYP')} value={CDPRTYTYP} disabled={!editMode}
                            showArrow={true} size={"default"} style={{ width: '100%' }}>
                            {oiptypesList}
                        </Select>
                    </Col>
                    <Col span={1} />
                    <Col span={7}>
                        <b>NME_AGENCY </b>: <Input placeholder="NME_AGENCY" value={NMEAGENCY}
                            onChange={e => this.handleFieldChange(e, 'NME_AGENCY')} />
                    </Col>
                    <Col span={1} />
                    {(CDPRTYTYP === 'M' || CDPRTYTYP === 'N') && <Col span={5}>
                        <b>Language </b>:
                        <Select onChange={e => this.handleFieldChange(e, 'CDLANGUAGE')} value={CDLANGUAGE}
                            showArrow={true} size={"default"} style={{ width: '100%' }}>
                            {oiplanguagesList}
                        </Select>
                    </Col>}
                    <Col span={2} />
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={5}>
                        <b>Last Name </b>: <Input placeholder="Last Name" value={NMESURNMEPRSN}
                            onChange={e => this.handleFieldChange(e, 'NMESURNMEPRSN')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>First Name </b>: <Input placeholder="First Name" value={NMEFRSTPRSN}
                            onChange={e => this.handleFieldChange(e, 'NMEFRSTPRSN')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Middle Name </b>: <Input placeholder="Middle Name" value={NMEMIDPRSN}
                            onChange={e => this.handleFieldChange(e, 'NMEMIDPRSN')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Suffix </b>: <Input placeholder="Suffix" value={NMESUFXPRSN}
                            onChange={e => this.handleFieldChange(e, 'NMESUFXPRSN')} />
                    </Col>
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={5}>
                        <b>Phone Number </b>: <Input placeholder="Phone Number" value={NBRPHONE}
                            onChange={e => this.handleFieldChange(e, 'NBRPHONE')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Cell Phone Number </b>: <Input placeholder="Cell Phone Number" value={NBRCELLPHONE}
                            onChange={e => this.handleFieldChange(e, 'NBRCELLPHONE')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Fax Number </b>: <Input placeholder="Fax Number" value={NBRFAX}
                            onChange={e => this.handleFieldChange(e, 'NBRFAX')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Email Address </b>: <Input placeholder="Email Address" value={EmailAddress}
                            onChange={e => this.handleFieldChange(e, 'EmailAddress')} />
                    </Col>
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={8}>
                        <b>Mailing Address </b>: <Input placeholder="Mailing Address" value={ADDRLN1}
                            onChange={e => this.handleFieldChange(e, 'ADDRLN1')} />
                    </Col>
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={5}>
                        <b>City </b>: <Input placeholder="City" value={CDCITY}
                            onChange={e => this.handleFieldChange(e, 'CDCITY')} />
                    </Col>
                    <Col span={1} />
                    <Col span={2}>
                        <b>State </b>: <Input placeholder="State" value={CDSTATE}
                            onChange={e => this.handleFieldChange(e, 'CDSTATE')} />
                    </Col>
                    <Col span={1} />
                    <Col span={3}>
                        <b>Zip </b>: <Input placeholder="Zip" value={CDZIP}
                            onChange={e => this.handleFieldChange(e, 'CDZIP')} />
                    </Col>
                    <Col span={1} />
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={7}>
                        <b>Comment </b>: <TextArea rows={5} placeholder="Comment" value={TXTCOMM}
                            onChange={e => this.handleFieldChange(e, 'TXTCOMM')} />
                    </Col>
                </div>
            </Row>
        </Col>);
    }

    render() {
        const { disableNewButton, displayViewList } = this.state;
        return (
            <div>
                OIP Details
                <div>
                    <Button onClick={this.handleViewList}> View List </Button>
                    <Button type={"primary"} onClick={this.handleLookupExisting}> Lookup Existing </Button>
                    <Button style={{ backgroundColor: 'green', color: 'white' }} disabled={disableNewButton} onClick={this.handleNewOIP}> + New OIP </Button>
                </div>
                <br />
                <div>
                    {displayViewList &&
                        <Row type="flex" justify="space-around" >
                            {this.renderLeftNavOIPs()}
                            {this.renderDetails()}
                        </Row>
                    }
                    {!displayViewList &&
                        <Row>
                            Display list....
                        </Row>
                    }
                </div>
            </div >
        );
    }
}

export default CaseOIPDetails;