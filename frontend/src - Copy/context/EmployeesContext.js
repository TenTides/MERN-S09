import { createContext, useReducer } from "react";

export const EmployeesContext = createContext()

export const employeesReducer = (state, action) => 
{
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return {employees: action.payload}
        case 'CREATE_EMPLOYEE':
            return {employees: [action.payload,...state.employees]}
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