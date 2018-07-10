import React from "react";
import { Switch, Route } from 'react-router-dom'

import HomePage from "./contents/home/homepage";
import NewsItemPage from "./contents/admin/News/NewsItemPage";
import Search from "./Search";

const content = () => (
  <div className="contentlayout">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/news" component={NewsItemPage} />
      <Route path="/search" component={Search} />
      {/* <Route path='/search' 
          render={ props => <Search {...props} />}
        /> */}
    </Switch>
  </div>
);

export default content;
