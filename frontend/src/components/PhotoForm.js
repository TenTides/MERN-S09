import { useState } from "react"
import { usePhotosContext } from "../hooks/usePhotosContext"
import './PhotoForm.css'

const PhotoForm = ({onClose, userID}) =>
{   
    const {dispatch} = usePhotosContext()

    const [file, setFile] = useState('')
    const [tags, setTags] = useState('')
    const [error, setError] = useState('')

    const handleFileChange = async (e) => 
    {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const maxSize = 5 * 1024 * 1024; // 5mb
          if (selectedFile.size > maxSize) {
            setError('File size exceeds the allowed limit');
            return;
          }
          try {
            const base64String = await convertToBase64(selectedFile);
            setFile(base64String);
          } catch (error) {
            console.error('Error converting to base64:', error);
            setError('Error converting to base64');
          }
        }
    };

    const handleNewbie = async (e) =>{
        e.preventDefault()
        const photo = {file, tags, userID}
        const response = await fetch('/profile/photos',{
            method: 'POST',
            body: JSON.stringify(photo),
            headers:
            {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok)
        {
            setError(json.error)
        }
        if(response.ok)
        {
            setFile('')
            setTags('')
            setError(null)
            console.log('New Photo Added', json)
            dispatch({type:"CREATE_PHOTO",payload: json})

            try {
                const response = await fetch('/profile/photos');
                const updatedJson = await response.json();
                if (response.ok) {
                  dispatch({ type: 'SET_PHOTOS', payload: updatedJson });
                } else {
                  console.error('Error fetching photos after upload:', updatedJson.error);
                }
              } catch (error) {
                console.error('Error fetching photos after upload:', error.message);
              }

            onClose();
        }
    }

    const handleClose = () => {
        setFile("");
        setTags("");
        setError(null);
        onClose();
      };

    return (
        <form className="create" onSubmit={handleNewbie}>
            <h3>Add a New Photo</h3>
            <span className="closebtn" onClick={handleClose}>&times;</span>
            <label htmlFor="file-upload" className="custom-file-upload">Source:</label>
            <input type="file" name = "myFile" id = "file-upload" accept=".jpeg, .png, .jpg" onChange={handleFileChange}/>
            <label>Tags:</label>
            <input type="text" onChange={(e) => setTags(e.target.value)} value={tags}/>
            <button type="submit">Add Photo</button>
            {error && <div className ="error">{error}</div>}
        </form>
    )

}
export default PhotoForm

function convertToBase64(file){
    return new Promise((resolve,reject) =>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload  = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}