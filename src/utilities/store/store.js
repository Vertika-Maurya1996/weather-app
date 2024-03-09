// src/store/index.js
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from './reducer'; // Create this file with your reducers

const store = configureStore({reducer:rootReducer});

export default store;
