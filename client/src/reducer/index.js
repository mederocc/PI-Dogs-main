const initialState = {
  breeds: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BREEDS":
      return { ...state, breeds: action.payload };

    case "GET_TEMPERAMENTS":
      return { ...state, temperaments: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
