import { createSlice } from "@reduxjs/toolkit";
const initialUiState = {
  showAddProgress: false,
  showViewProgress: false,
  showAddToast: false,
  showEditToast: false,
  showDeleteToast: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
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
    showAddToaster: (state, action) => {
      state.toastMsg = action.payload;
      state.showAddToast = true;
    },
    hideAddToaster: (state) => {
      state.showAddToast = false;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
