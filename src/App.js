import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/allReducers";
import { PageFooter } from "./pages/PageFooter";
import { PageLogin } from "./pages/PageLogin";
import { PageRegistration } from "./pages/PageRegistration";
// import {Drop} from "./components/DropComponent";
import history from "./history";
import {LayoutLogin} from "./layouts/LayoutLogin";
import {PageNotFound} from "./pages/PageNotFound";
import Post from './components/PostComponent';
import { PageMyProfile } from "./pages/PageMyProfile";
import { PageFeed } from "./pages/PageFeed";
import { CPost } from "./pages/PagePost";
import { CAllPost } from "./actions/ActionExplore";
import { CProfilePosts } from "./pages/PageProfile";
import EditProfilePage from "./pages/edit-profile";

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      {/* <Drop/> */}
      <Switch>
        <RouteWrapper path="/login" component={PageLogin} layout={LayoutLogin} />
        <RouteWrapper path="/registration" component={PageRegistration} layout={LayoutLogin} />
        <Route exact path="/feed" component={PageFeed} />
        <Route path='/post:id' component={Post} />
        <Route path="/explore" component={CAllPost} />
        <Route path="/test/:_id" component={CPost} />
        {/* <Route path='/posttest' component={PostPage} /> */}
        {/* <Route path="/me" component={PageMyProfile} /> */}
        <Route path="/profile/:_id" component={CProfilePosts} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path='*' exact={true} component={PageNotFound} />
      </Switch>
      <PageFooter path='/' component={PageFooter}/>
    </Router>
  </Provider>
);

function RouteWrapper({
  component: Component, 
  layout: Layout, 
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

export default App;
