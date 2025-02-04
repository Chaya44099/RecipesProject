import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecipeType } from '../../models/allModels';

export const fetchRecipes = createAsyncThunk('recipes/fetch', async (_, thunkApi) => {
    try {
        const response = await axios.get<RecipeType[]>('http://localhost:3000/api/recipes');
        return response.data as RecipeType[];

    } catch (error) {
        return thunkApi.rejectWithValue('error');
    }
})

export const addRecipe = createAsyncThunk(
    'recipes/add',
    async (recipe: RecipeType, thunkApi) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/recipes',
                {
                    title: recipe.title,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                },
                {
                    headers: {
                        'user-id': recipe.authorId,
                    },
                }
            );
            return response.data.recipe as RecipeType;
        } catch (error) {
            return thunkApi.rejectWithValue('error');
        }
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [] as RecipeType[], loading: false,
        error: null as string | null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder .addCase(fetchRecipes.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<RecipeType[]>) => {
            state.loading = false;
            state.recipes = action.payload;
        })
        .addCase(fetchRecipes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; 
        })
        .addCase(addRecipe.fulfilled, (state, action: PayloadAction<RecipeType>) => {
            state.recipes.push(action.payload);
        })
       .addCase(addRecipe.rejected, (state, action) => {
            state.error = action.payload as string;
        });
}
});
export default recipesSlice;