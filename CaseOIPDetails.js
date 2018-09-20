import React, { Component } from 'react';
import { Row, Col, Table, List, notification, Spin, Modal, Radio, Input, Tooltip, Button, Select, Layout, Menu, Icon, Tabs, Collapse } from 'antd';
import OIPLookResultsData from '../mocks/oiplookupresults.json';
import allOIPsforaCaseNumberData from '../mocks/alloipsforaCaseNumber.json';
import OIPTypesListData from '../mocks/OIPTypesList.json';
import OIPlanguagesData from '../mocks/OIPlanguages.json';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

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

const newLookupObj = {
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
            oipLookupItemObj: newLookupObj,
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleListMenuChange = this.handleListMenuChange.bind(this);
        this.handleNewOIP = this.handleNewOIP.bind(this);
        this.handleViewList = this.handleViewList.bind(this);
        this.handleLookupExisting = this.handleLookupExisting.bind(this);
        this.handleAssignToCase = this.handleAssignToCase.bind(this);
        this.handleEditModeAndCancel = this.handleEditModeAndCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLookupFieldChange = this.handleLookupFieldChange.bind(this);
        this.handleLookupReset = this.handleLookupReset.bind(this);
        this.handleLookupSearch = this.handleLookupSearch.bind(this);
    }

    handleLookupExisting() {
        this.setState({ displayViewList: false, disableNewButton: true });
    }

    handleViewList() {
        this.setState({ displayViewList: true, disableNewButton: false });
    }

    handleAssignToCase(e) {
        e.stopPropagation();
        console.log('Assign the Case.....');
        // TODO....
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

    handleDelete() {
        console.log('Delete the OIP......');
        // TODO....
    }

    handleEditModeAndCancel() {
        this.setState((state) => ({ editMode: !state.editMode }));
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
                        <b>NME_AGENCY </b>: <Input placeholder="NMEAGENCY" value={NMEAGENCY} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NMEAGENCY')} />
                    </Col>
                    <Col span={1} />
                    {(CDPRTYTYP === 'M' || CDPRTYTYP === 'N') && <Col span={5}>
                        <b>Language </b>:
                        <Select onChange={e => this.handleFieldChange(e, 'CDLANGUAGE')} value={CDLANGUAGE} disabled={!editMode}
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
                        <b>Last Name </b>: <Input placeholder="Last Name" value={NMESURNMEPRSN} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NMESURNMEPRSN')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>First Name </b>: <Input placeholder="First Name" value={NMEFRSTPRSN} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NMEFRSTPRSN')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Middle Name </b>: <Input placeholder="Middle Name" value={NMEMIDPRSN} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NMEMIDPRSN')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Suffix </b>: <Input placeholder="Suffix" value={NMESUFXPRSN} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NMESUFXPRSN')} />
                    </Col>
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={5}>
                        <b>Phone Number </b>: <Input placeholder="Phone Number" value={NBRPHONE} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NBRPHONE')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Cell Phone Number </b>: <Input placeholder="Cell Phone Number" value={NBRCELLPHONE} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NBRCELLPHONE')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Fax Number </b>: <Input placeholder="Fax Number" value={NBRFAX} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'NBRFAX')} />
                    </Col>
                    <Col span={1} />
                    <Col span={5}>
                        <b>Email Address </b>: <Input placeholder="Email Address" value={EmailAddress} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'EmailAddress')} />
                    </Col>
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={8}>
                        <b>Mailing Address </b>: <Input placeholder="Mailing Address" value={ADDRLN1} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'ADDRLN1')} />
                    </Col>
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={5}>
                        <b>City </b>: <Input placeholder="City" value={CDCITY} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'CDCITY')} />
                    </Col>
                    <Col span={1} />
                    <Col span={2}>
                        <b>State </b>: <Input placeholder="State" value={CDSTATE} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'CDSTATE')} />
                    </Col>
                    <Col span={1} />
                    <Col span={3}>
                        <b>Zip </b>: <Input placeholder="Zip" value={CDZIP} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'CDZIP')} />
                    </Col>
                    <Col span={1} />
                </div>
            </Row>
            <Row>
                <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                    <Col span={7}>
                        <b>Comment </b>: <TextArea rows={5} placeholder="Comment" value={TXTCOMM} disabled={!editMode}
                            onChange={e => this.handleFieldChange(e, 'TXTCOMM')} />
                    </Col>
                </div>
            </Row>
            <br />
            <Row>
                <Button style={{ backgroundColor: 'red', color: 'white' }}><Icon type="delete" theme="outlined" onClick={this.handleDelete} />Delete</Button>
                <Button style={{ float: 'right' }} onClick={this.handleEditModeAndCancel} disabled={!editMode}>
                    <Icon type="close" theme="outlined" />Cancel
                </Button>
                <Button style={{ float: 'right' }} onClick={this.handleEditModeAndCancel} disabled={editMode}>
                    <Icon type="edit" theme="outlined" />Edit
                </Button>
            </Row>
        </Col>);
    }

    renderLookupExisiting() {
        const { oiplookupresults } = this.state;

        return (
            <Collapse accordion>
                {
                    oiplookupresults.map(res => {
                        const header = <div>
                            <span>{`${res.NMEFRSTPRSN} ${res.NMESURNMEPRSN}`}</span>
                            <div style={{ float: 'right', marginRight: '20px' }}>
                                <a onClick={this.handleAssignToCase}>
                                    <Icon type="api" theme="outlined" />Assign to Case
                                </a>
                            </div>
                        </div>;
                        return (<Panel header={header} key={res.OIPID}>
                            <p>{`${res.ADDRLN1} ${res.CDCITY}, ${res.CDSTATE} ${res.CDZIP}`}</p>
                            {res.NBRPHONE && <p>{`Phone Number: ${res.NBRPHONE}`}</p>}
                            {res.NBRCELLPHONE && <p>{`Cell Phone Number: ${res.NBRCELLPHONE || ''}`}</p>}
                            {res.EmailAddress && <p>{`Email Address: ${res.EmailAddress || ''}`}</p>}
                        </Panel>);
                    })
                }
            </Collapse>
        );
    }

    handleLookupFieldChange(e, type) {
        const { oipLookupItemObj } = this.state;

        switch (type) {
            case 'CDPRTYTYP':
            case 'CDLANGUAGE':
                oipLookupItemObj[type] = e
                break;
            case 'NMEFRSTPRSN':
            case 'NMESURNMEPRSN':
            case 'NMEAGENCY':
            case 'NBRPHONE':
                oipLookupItemObj[type] = e.target.value;
            default:
                break;
        }

        this.setState({ oipLookupItemObj });

    }

    handleLookupReset() {
        this.setState({ oipLookupItemObj: newLookupObj });
    }

    handleLookupSearch() {
        let { oipLookupItemObj, oiplookupresults } = this.state;

        // TODO this needs to be removed after the API is used.....
        oiplookupresults = OIPLookResultsData;

        const { CDPRTYTYP, NMEAGENCY, CDLANGUAGE, NMEFRSTPRSN, NMESURNMEPRSN, NBRPHONE } = oipLookupItemObj;

        if (CDPRTYTYP !== '') {
            oiplookupresults = oiplookupresults.filter(l => l.CDPRTYTYP === CDPRTYTYP);

            if (CDPRTYTYP === 'L') {
                if (NMEAGENCY) {
                    oiplookupresults = oiplookupresults.filter(l => l.NMEAGENCY.toLowerCase().includes(NMEAGENCY.toLowerCase()));
                }
            } else if (CDPRTYTYP === 'M' || CDPRTYTYP === 'N') {
                if (CDLANGUAGE) {
                    oiplookupresults = oiplookupresults.filter(l => l.CDLANGUAGE === CDLANGUAGE);
                }
            } else {
                if (NMEFRSTPRSN) {
                    oiplookupresults = oiplookupresults.filter(l => l.NMEFRSTPRSN.toLowerCase().includes(NMEFRSTPRSN.toLowerCase()));
                }
                if (NMESURNMEPRSN) {
                    oiplookupresults = oiplookupresults.filter(l => l.NMESURNMEPRSN.toLowerCase().includes(NMESURNMEPRSN.toLowerCase()));
                }
                if (NBRPHONE) {
                    oiplookupresults = oiplookupresults.filter(l => l.NBRPHONE.toLowerCase().includes(NBRPHONE.toLowerCase()));
                }
            }
        }

        this.setState({ oipLookupItemObj, oiplookupresults })
    }

    render() {
        const { disableNewButton, displayViewList, oipLookupItemObj } = this.state;
        const oiptypesList = getDropdownList(OIPTypesListData);
        const oiplanguagesList = getDropdownList(OIPlanguagesData);

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
                        <div>
                            <Row>
                                <Col span={1} />
                                <Col span={4}>
                                    <b>OIP Type </b>:
                                    <Select onChange={(e) => this.handleLookupFieldChange(e, 'CDPRTYTYP')} value={oipLookupItemObj.CDPRTYTYP}
                                        showArrow={true} size={"default"} style={{ width: '100%' }}>
                                        {oiptypesList}
                                    </Select>
                                </Col>
                                {(oipLookupItemObj.CDPRTYTYP === 'A' || oipLookupItemObj.CDPRTYTYP === 'B' || oipLookupItemObj.CDPRTYTYP === 'D' ||
                                    oipLookupItemObj.CDPRTYTYP === 'G' || oipLookupItemObj.CDPRTYTYP === 'O' || oipLookupItemObj.CDPRTYTYP === 'P' ||
                                    oipLookupItemObj.CDPRTYTYP === 'R' || oipLookupItemObj.CDPRTYTYP === 'T' || oipLookupItemObj.CDPRTYTYP === 'W') && <div>
                                        <Col span={4}>
                                            <b>Last Name </b>: <Input placeholder="Last Name" value={oipLookupItemObj.NMESURNMEPRSN}
                                                onChange={e => this.handleLookupFieldChange(e, 'NMESURNMEPRSN')} />
                                        </Col>
                                        <Col span={4}>
                                            <b>First Name </b>: <Input placeholder="First Name" value={oipLookupItemObj.NMEFRSTPRSN}
                                                onChange={e => this.handleLookupFieldChange(e, 'NMEFRSTPRSN')} />
                                        </Col>
                                        <Col span={4}>
                                            <b>Phone Number </b>: <Input placeholder="Phone Number" value={oipLookupItemObj.NBRPHONE}
                                                onChange={e => this.handleLookupFieldChange(e, 'NBRPHONE')} />
                                        </Col>
                                    </div>}
                                {oipLookupItemObj.CDPRTYTYP === 'L' && <div>
                                    <Col span={4}>
                                        <b>NME_AGENCY </b>: <Input placeholder="NMEAGENCY" value={oipLookupItemObj.NMEAGENCY}
                                            onChange={e => this.handleLookupFieldChange(e, 'NMEAGENCY')} />
                                    </Col>
                                </div>}
                                {(oipLookupItemObj.CDPRTYTYP === 'M' || oipLookupItemObj.CDPRTYTYP === 'N') && <div>
                                    <Col span={4}>
                                        <b>Language </b>:
                                        <Select onChange={e => this.handleLookupFieldChange(e, 'CDLANGUAGE')} value={oipLookupItemObj.CDLANGUAGE}
                                            showArrow={true} size={"default"} style={{ width: '100%' }}>
                                            {oiplanguagesList}
                                        </Select>
                                    </Col>
                                </div>}
                                <Col span={4} style={{ float: 'right', verticalAlign: 'middle' }}>
                                    <Button onClick={this.handleLookupSearch}><Icon type="search" theme="outlined" />Search</Button>
                                    <Button onClick={this.handleLookupReset}>Reset</Button>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                {this.renderLookupExisiting()}
                            </Row>
                        </div>
                    }
                </div>
            </div >
        );
    }
}

export default CaseOIPDetails;