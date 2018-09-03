import React from "react";
import { Switch, Route } from 'react-router-dom'

import HomePage from "./contents/home/homepage";
import NewsPage from "./contents/admin/NewsItem";
import Search from "./contents/case/Search";
import CustomerDetails from "./contents/case/CustomerDetails";
import CaseDetails from "./contents/case/CaseDetails";
import ClosedCaseDetail from "./contents/case/ClosedCaseDetail";
import ScheduledCases from "./contents/case/ScheduledCases";
import UnScheduledCases from "./contents/case/UnscheduledCases";
import AddCase from "./contents/case/AddCase";
import EmployeeAppointment from '../components/contents/profiles/EmployeeAppointment';
import HearingRoom from '../components/contents/profiles/HearingRoom';

const content = () => (
  <div className="contentlayout">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/news" component={NewsPage} />
      <Route path="/search/searchText/:searchText" component={Search} />
      <Route path="/customerDetails/dlNumber/:dlNumber" component={CustomerDetails} />
      <Route path="/caseDetails/CaseNumber/:CaseNumber" component={CaseDetails} />
      <Route path="/closedCaseDetails/CaseNumber/:CaseNumber" component={ClosedCaseDetail} />
      <Route path="/scheduledCases" component={ScheduledCases} />
      <Route path="/unScheduledCases" component={UnScheduledCases} />
      {/* <Route path="/newcase" render={() => <AddCase />} /> */}
      <Route path="/newcase" component={AddCase} />
      <Route path="/employeeappointment" component={EmployeeAppointment} />
      <Route path="/hearingroom" component={HearingRoom} />
    </Switch>
  </div>
);

export default content;
