const initialState = {
  breeds: [],
  temperaments: [],
  filters: { source: "all", temp: "all", sorting: "AtoZ" },
  queryError: { error: false, message: "" },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BREEDS":
      if (typeof action.payload !== "object") {
        return {
          ...state,
          queryError: { error: true, message: action.payload },
        };
      }
      return {
        ...state,
        breeds: action.payload,
        queryError: { error: false, message: "" },
      };

    case "GET_TEMPERAMENTS":
      return { ...state, temperaments: action.payload };

    case "GET_FILTERS":
      return { ...state, filters: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
