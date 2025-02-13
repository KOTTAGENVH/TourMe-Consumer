import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth/authSlice";
import darkmodeSlice from "./darkmode/darkmodeSlice";
import  idSlice  from "./idcapture/idcaptureSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
const persistedReducerdark = persistReducer(persistConfig, darkmodeSlice);
const persistedReducerid = persistReducer(persistConfig, idSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    darkmode: persistedReducerdark,
    id: persistedReducerid,
  },
});

export default store;
