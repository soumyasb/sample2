import React from "react";
import { Switch, Route } from 'react-router-dom'

import HomePage from "./contents/home/homepage";
import NewsItemPage from "./contents/admin/News/NewsItemPage";
import Search from "./Search";
import CustomerDetails from './contents/admin/Cases/case/CustomerDetails';
import CaseDetails from './contents/admin/Cases/case/CaseDetails';
import UnscheduledCases from './contents/admin/Cases/case/UnscheduledCases';
import ScheduledCases from './contents/admin/Cases/case/ScheduledCases';

const content = () => (
  <div className="contentlayout">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/news" component={NewsItemPage} />
      <Route path="/search/searchText/:searchText" component={Search} />
      <Route path="/customerdetails" component={CustomerDetails} />
      <Route path="/casedetails" component={CaseDetails} />
      <Route path="/scheduledCases" component={ScheduledCases} />
      <Route path="/UnscheduledCases" component={UnscheduledCases} />
    </Switch>
  </div>
);

export default content;
