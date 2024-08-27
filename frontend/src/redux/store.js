import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./rootSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers ({
    root: rootSlice,
});

const store = configureStore({
  reducer,
});

export default store;
