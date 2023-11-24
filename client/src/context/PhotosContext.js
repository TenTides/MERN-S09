import { createContext, useReducer } from "react";

export const PhotosContext = createContext()

export const photosReducer = (state, action) => 
{
    switch (action.type) {
        case 'SET_PHOTOS':
            return {photos: action.payload}
        case 'CREATE_PHOTO':
            return {photo: [action.payload,...state.photos]}
        case 'DELETE_PHOTO':
            return {
                    photos: state.photos.filter((photo) => photo._id !== action.payload),
                };
        default:
            return state
    }
}

export const PhotosContextProvider = ( {children} ) => 
{
    const [state,dispatch] = useReducer(photosReducer, {photos: null})

    return ( // needs to wrap the entire application
        <PhotosContext.Provider value={{...state,dispatch}}>
            { children }
        </PhotosContext.Provider>
    )
}