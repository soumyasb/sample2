import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import moment from "moment";
import { Row, Col, Table, List, notification, Spin, Modal, Radio, Input, Tooltip, Button, Select, Layout, Menu, Icon, Tabs, Collapse } from 'antd';
import coversheetJson from '../mocks/coversheetdata.json';

class ComponentToPrint extends React.Component {
    render() {
        const { DLNumber, BirthDate, LastName, PhoneNumber, OIPPersons, OIPAgencies, Contacts, Comments } = coversheetJson;
        const caseNumber = 'SAC182670003'

        return (
            <div style={{ width: '900px', margin: '20px 50px', fontSize: 'large' }}>
                <Row>
                    <Col>
                        <div style={{ float: 'right' }}>
                            <img src="CASECVRSHT.jpg" height={50} width={450} />
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={24}>
                        <div style={{ textAlign: 'center', fontSize: 'x-large' }}>
                            <strong>DO NOT REMOVE THIS SHEET FROM THE FILE!!!!!!</strong>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={24}>
                        <div style={{ textAlign: 'right' }}>
                            <strong>{`CASE #: ${caseNumber}`}</strong>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={5}>{`DL #: ${DLNumber}`}</Col>
                    <Col span={6}>{`D.O.B: ${moment(BirthDate).format("MM/DD/YYYY")}`}</Col>
                    <Col span={6}>{`LAST NAME: ${LastName}`}</Col>
                    <Col>{`PHONE #: ${PhoneNumber}`}</Col>
                </Row>
                <hr />
                <br />
                {OIPPersons && OIPPersons.results && OIPPersons.results.length > 0 && <div>
                    <Row>
                        <Col>Persons:</Col>
                    </Row>
                    <hr />
                    {OIPPersons.results.map(person => <div>
                        <Row>
                            <Col span={5}>
                                {`Priority Type: ${person.OIP_CD_PRTY_TYP || ''}`}
                            </Col>
                            <Col span={10}>
                                {`Name: ${person.OIP_NME_FRST_PRSN || ''} ${person.OIP_NME_SURNME_PRSN || ''}`}
                            </Col>
                            <Col>
                                {`Phone: ${person.OIP_NBR_PHONE || ''}`}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {`Address: ${person.OIP_ADDR_LN1 || ''} ${person.OIP_CITY || ''} ${person.OIP_STATE || ''} ${person.OIP_ZIP || ''}`}
                            </Col>
                        </Row>
                        <hr />
                    </div>)}
                </div>}
                <br />
                {OIPAgencies && OIPAgencies.results && OIPAgencies.results.length > 0 && <div>
                    <Row>
                        <Col>Agencies:</Col>
                    </Row>
                    <hr />
                    {OIPAgencies.results.map(agency => <div>
                        <Row>
                            <Col span={5}>
                                {`Priority Type: ${agency.AGENCY_CD_PRTY_TYP || ''}`}
                            </Col>
                            <Col span={10}>
                                {`Name: ${agency.AGENCY_NME_FRST_PRSN || ''} ${agency.AGENCY_NME_SURNME_PRSN || ''}`}
                            </Col>
                            <Col>
                                {`Phone: ${agency.AGENCY_NBR_PHONE || ''}`}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {`Address: ${agency.AGENCY_ADDR_LN1 || ''} ${agency.AGENCY_CITY || ''} ${agency.AGENCY_STATE || ''} ${agency.AGENCY_ZIP || ''}`}
                            </Col>
                        </Row>
                        <hr />
                    </div>)}
                </div>}
                <br />
                {Contacts && Contacts.results && Contacts.results.length > 0 && <div>
                    <Row>
                        <Col>Contacts:</Col>
                    </Row>
                    <hr />
                    {Contacts.results.map(contact => <div>
                        TODO --- uncomment the below Row and add the Contacts section fields appropriately.
                        {/* <Row>
                            <Col span={5}>
                                {`Priority Type: ${contact.AGENCY_CD_PRTY_TYP || ''}`}
                            </Col>
                            <Col span={10}>
                                {`Name: ${contact.AGENCY_NME_FRST_PRSN || ''} ${contact.AGENCY_NME_SURNME_PRSN || ''}`}
                            </Col>
                            <Col>
                                {`Phone: ${contact.AGENCY_NBR_PHONE || ''}`}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {`Address: ${contact.AGENCY_ADDR_LN1 || ''} ${contact.AGENCY_CITY || ''} ${contact.AGENCY_STATE || ''} ${contact.AGENCY_ZIP || ''}`}
                            </Col>
                        </Row> */}
                        <hr />
                    </div>)}
                </div>}
                <br />
                {Comments && Comments.results && Comments.results.length > 0 && <div>
                    <Row>
                        <Col>Comments:</Col>
                    </Row>
                    <hr />
                    {Comments.results.map(comment => <div>
                        TODO --- uncomment the below Row and add the Comments section fields appropriately.
                        {/* <Row>
                            <Col span={5}>
                                {`Priority Type: ${comment.AGENCY_CD_PRTY_TYP || ''}`}
                            </Col>
                            <Col span={10}>
                                {`Name: ${comment.AGENCY_NME_FRST_PRSN || ''} ${comment.AGENCY_NME_SURNME_PRSN || ''}`}
                            </Col>
                            <Col>
                                {`Phone: ${comment.AGENCY_NBR_PHONE || ''}`}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {`Address: ${comment.AGENCY_ADDR_LN1 || ''} ${comment.AGENCY_CITY || ''} ${comment.AGENCY_STATE || ''} ${comment.AGENCY_ZIP || ''}`}
                            </Col>
                        </Row> */}
                        <hr />
                    </div>)}
                </div>}
            </div >
        );
    }
}

class PrintPage extends Component {

    render() {
        return (
            <div>
                <h1>Print page.</h1>
                <ReactToPrint
                    trigger={() => <a href="#">Print this out!</a>}
                    content={() => this.componentRef}
                />
                <ComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
        );
    }
}

export default PrintPage;