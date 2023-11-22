import { useContext } from "react";
import { PhotosContext } from "../context/PhotosContext";

export const usePhotosContext = () => {
    const context = useContext(PhotosContext)

    if(!context)
    {
        throw Error("usePhotosContext must be used inside an PhotosContextProvider")
    }

    return context
}