import { Dispatch, createContext, useReducer } from "react";
import { User } from "../../models/allModels"
import { Provider } from "react-redux";
import recipesStore from "../../store/recipesStor";
import { RouterProvider } from "react-router-dom";
import { router } from "../../router";

type action = {
    type: string,
    data: User
}
const state = (state: User, action: action): User => {
    switch (action.type) {
        case 'CREATE':
            return { ...state, ...action.data }

        case 'UPDATE':
            return { ...state, ...action.data }

        default:
            return state
    }
}

export const UserContext = createContext<[User, Dispatch<action>]>([{} as User, () => { }]);

const UserReducer = () => {
    const [user, userDispatch] = useReducer(state, {} as User);

    return (
        <>
            <UserContext value={[user, userDispatch]}>
                <Provider store={recipesStore}>
                    <RouterProvider router={router} />
                </Provider>
            </UserContext>
        </>
    )
}


export default UserReducer;

