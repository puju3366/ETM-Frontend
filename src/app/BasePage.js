import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { UserPage } from "./pages/UserPage";
import { UsersReportPage } from "./pages/UserReportPage";
import AddRole from "./modules/roles/AddRole";
import { OlpPage } from "./pages/OlpPage";
import { RolePage } from "./pages/RolePage";
import ViewUserReport from "./modules/report/ViewUserReport";
import EditRole from "./modules/roles/EditRole";
import { RightPage } from "./pages/RightPage";
import AddRight from "./modules/rights/AddRight";
import EditRight from "./modules/rights/EditRight";
import { MyPage } from "./pages/MyPage";
import AddOlp from "./modules/olp/AddOlp";
import EditOlp from "./modules/olp/EditOlp";
import ViewUser from "./modules/user/ViewUser";
import LinkEmp from "./modules/olp/LinkEmp";
import { PlatFormMasterPage } from "./pages/PlatFormMasterPage";
import { FocusareaMasterPage } from "./pages/FocusareaMasterPage";
import AddPlatForm from "./modules/master/platform/AddPlatform";
import EditPlatForm from "./modules/master/platform/EditPlatForm";
import AddFocusarea from "./modules/master/focusarea/AddFocusarea";
import EditFocusarea from "./modules/master/focusarea/EditFocusarea";
import { DashboardPage } from "./pages/DashboardPage";
import OlpTrainings from "./modules/Employee/pages/OlpTrainings";
import ViewProgress from "./modules/Employee/pages/ViewProgress";
import AddProgress from "./modules/Employee/pages/AddProgress";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);
// const OlpPage = lazy(() =>
//   import("./modules/Olp/pages/OlpPage")
// );



export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.user.userrole[0];

  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/" to="/dashboard" />
          }
          <ContentRoute path="/dashboard" component={DashboardPage} />
          <ContentRoute path="/builder" component={BuilderPage} />
          {/* {MAINROUTE} */}
          <Route path="/google-material" component={GoogleMaterialPage} />
          <Route path="/react-bootstrap" component={ReactBootstrapPage} />
          <Route path="/e-commerce" component={ECommercePage} />
          <Route path="/olp-training" component={OlpPage} />
          <Route path="/manage-user" component={UserPage} />
          <Route path="/user-report" component={UsersReportPage} />
          <Route path="/add-olp" component={AddOlp} />
          <Route path="/edit-olp/:id" component={EditOlp} />
          <Route path="/view-users/:id" component={ViewUser} />
          <Route path="/link-emp/:id" component={LinkEmp} />
          <Route path="/manage-platform" component={PlatFormMasterPage} />
          <Route path="/add-platform" component={AddPlatForm} />
          <Route path="/edit-platform/:id" component={EditPlatForm} />
          <Route path="/manage-focus-area" component={FocusareaMasterPage} />
          <Route path="/edit-focusarea/:id" component={EditFocusarea} />
          <Route path="/add-focusarea" component={AddFocusarea} />
          <Route path="/user-profile" component={UserProfilepage} />
          <Route path="/rights" component={RightPage} />
          <Route path="/add-rigths" component={AddRight} />
          <Route path="/edit-rights/:id" component={EditRight} />
          <Route path="/roles" component={RolePage} />
          <Route path="/add-role" component={AddRole} />
          <Route path="/edit-role/:id" component={EditRole} />
          <Route path="/my-training" component={OlpTrainings} />
          <Route path="/viewprogress/:id" component={ViewProgress} />
          <Route path="/addprogress/:id" component={AddProgress} />
          <Route path="/view-user-report/:id" component={ViewUserReport} />
          <Route path="/user-profile" component={UserProfilepage} />
          <Redirect to="error/error-v1" />
        </Switch>
      </Suspense>
    </>

  );
}
