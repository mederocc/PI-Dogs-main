const initialState = {
  breeds: [],
  temperaments: [],
  filters: { source: "all", temp: "all", sorting: "AtoZ" },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BREEDS":
      return { ...state, breeds: action.payload };

    case "GET_TEMPERAMENTS":
      return { ...state, temperaments: action.payload };

    case "GET_FILTERS":
      return { ...state, filters: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
