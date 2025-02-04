import { createBrowserRouter } from "react-router-dom";
import About from "./components/About";
import AppLayout from "./components/layout/AppLayout";
import Home from "./components/Home"; 
import RecipeDetail from "./components/recipes/RecipeDetail";
import RecipesList from "./components/recipes/RecipesList";
import AddRecipe from "./components/recipes/addRecipe";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <>
            <AppLayout />
          
        </>,
        children: [
            {
                path: '/', 
                element: <Home /> 
            },
            {
                path: '/about', element: <About />, errorElement: <>error!</>
            },
            {
                path: '/allrecipes', element: <RecipesList />,
                children: [
                    {
                        path: ':id',
                        element: <RecipeDetail />
                    }
                ]
            },
            {
                path:'/addrecipe', element: <AddRecipe />
            }
        ]
    }
]);
