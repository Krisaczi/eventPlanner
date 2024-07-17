import { configureStore } from "@reduxjs/toolkit";
import venuReducer from "../Components/venueSlice";
import avReducer from "../Components/avSlice";
import mealsReducer from "../Components/mealSlice";

export default configureStore({
  reducer: {
    venue: venuReducer,
    av: avReducer,
    meals: mealsReducer,
  },
});
