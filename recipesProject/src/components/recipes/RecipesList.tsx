import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/recipesStor";
import { useEffect } from "react";
import { fetchRecipes } from "./recipeSlice";
import { Link, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

const RecipesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error } = useSelector((state: RootState) => state.recipes);
    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch]);
    return (
        <Grid container spacing={0}>
            {loading && <p>Loading recipes...</p>}
            {error && <p>Error: {error}</p>}
            <Grid item xs={12} md={8} style={{ padding: '16px' }}>
                <Outlet />
            </Grid>
            <Grid item xs={12} md={4} style={{ direction: 'rtl', padding: '16px' }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#e74c3c',
                    textShadow: '2px 2px 4px #ccc',
                    letterSpacing: '2px',
                    wordSpacing: '5px',
                    textAlign: 'right',
                    padding: '5px 10px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    display: 'inline-block',
                    marginTop: '10%',
                }}>
                    Recipes
                </h1>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {recipes.map((recipe) => (
                        <li key={recipe.id} style={{ marginBottom: '10px' }}>
                            <span style={{ fontSize: '24px', color: '#f39c12' }}>&#x1F372;</span>
                            <Link to={`/allrecipes/${recipe.id}`} style={{ textDecoration: 'none', color: '#e74c3c', fontSize: '18px' }}>
                                {recipe.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Grid>
        </Grid>
    );
}

export default RecipesList;