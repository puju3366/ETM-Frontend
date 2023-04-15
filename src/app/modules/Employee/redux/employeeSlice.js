import {createSlice} from "@reduxjs/toolkit";
const initialEmployeeState = {
    showAddProgress : false,
    showViewProgress : false,
  };

  export const employeesSlice = createSlice({
    name: "employees",
    initialState: initialEmployeeState,
    reducers: {
        showModal: (state) => {
            state.showAddProgress = true;
        },
        hideModal: (state) => {
            state.showAddProgress = false;
        },
        showViewModal: (state) => {
          state.showViewProgress = true;
        },
        hideViewModal: (state) => {
          state.showViewProgress = false;
        },
    },
  });

export const employeeActions = employeesSlice.actions;
export default employeesSlice.reducer;
