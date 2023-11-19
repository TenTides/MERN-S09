import { createContext, useReducer } from "react";

export const EmployeesContext = createContext()

export const employeesReducer = (state, action) => 
{
    switch (action.type) {
        case 'SET_PHOTOS':
            return {employees: action.payload}
        case 'CREATE_PHOTO':
            return {photo: [action.payload,...state.employees]}
        case 'DELETE_PHOTO':
            return {
                    photos: state.photos.filter((photo) => photo._id !== action.payload),
                };
        default:
            return state
    }
}

export const EmployeesContextProvider = ( {children} ) => 
{
    const [state,dispatch] = useReducer(employeesReducer, {employees: null})

    return ( // needs to wrap the entire application
        <EmployeesContext.Provider value={{...state,dispatch}}>
            { children }
        </EmployeesContext.Provider>
    )
}