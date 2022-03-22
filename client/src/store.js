import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./components/Services/LoginSlice";

const rootReducer = combineReducers({
    login: loginSlice.reducer
})

export const store = configureStore({ reducer: rootReducer})