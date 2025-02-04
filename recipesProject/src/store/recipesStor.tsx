import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipesSlice from "../components/recipes/recipeSlice";

const recipesStore = configureStore({

    reducer: combineSlices(recipesSlice),
})
export type RootState = ReturnType<typeof recipesStore.getState>

export type AppDispatch = typeof recipesStore.dispatch
export default recipesStore;