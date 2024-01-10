import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
    reducer: {
        cart : createReducer,
    },
});

export default appStore;