import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import Olpreducer from "../../src/app/modules/olp/redux/redux";
import Rolereducer from "../../src/app/modules/roles/redux/redux";
import Rightreducer from "../../src/app/modules/rights/redux/redux";
import Usersreducer from "../../src/app/modules/user/redux/redux";
import PLATFORMreducer from "../../src/app/modules/master/platform/redux/redux";
import Focusareareducer from "../../src/app/modules/master/focusarea/redux/redux";
import { employeesSlice } from "../../src/app/modules/Employee/redux/employeeSlice";
import { uiSlice } from "../../src/app/modules/Employee/redux/uiSlice";
import Dashboardreducer from "../../src/app/modules/Dashboard/redux/redux";

import Trainingreducer from "../../src/app/modules/Employee/redux/redux";


export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  Olpreducer,
  Rolereducer,
  Usersreducer,
  PLATFORMreducer,
  Focusareareducer,
  Rightreducer,
  employees: employeesSlice.reducer,
  ui: uiSlice.reducer,
  Trainingreducer,
  Dashboardreducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
