import { combineReducers } from "@reduxjs/toolkit";
import { COORDINATES } from "./actionType";

const initialState = {
 longitude:0.0,
 latitude:0.0,
 place:"New York"
};

const coordinates = (state = initialState, action) => {
  switch (action.type) {
    case COORDINATES:
      return {
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        place:action.payload.place
      };
    default:
      return state;
  }
};
// src/store/reducers/index.js

const rootReducer = combineReducers({coordinates});

export default rootReducer;
