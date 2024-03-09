import { COORDINATES} from "./actionType";

const setCoords = (value) => {
  return {
    type: COORDINATES,
    payload: value,
  };
};

export default setCoords;