import { useState } from "react"
import { useEmployeesContext } from "../hooks/useEmployeesContext"


const EmployeeForm = () =>
{   
    const {dispatch} = useEmployeesContext()

    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [employer, setEmployer] = useState('')
    const [file, setFile] = useState('')
    const [type, setType] = useState('')
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
        const employee = {name, position, employer, file, type}
        const response = await fetch('/api/photos',{
            method: 'POST',
            body: JSON.stringify(employee),
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
            setName('')
            setEmployer('')
            setPosition('')
            setFile('')
            setType('')
            setError(null)
            console.log('New Employee Added', json)
            dispatch({type:"CREATE_EMPLOYEE",payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleNewbie}>
            <h3>Add a New Photo</h3>
            <label htmlFor="file-upload" className="custom-file-upload">Source:</label>
            <input type="file" name = "myFile" id = "file-upload" accept=".jpeg, .png, .jpg" onChange={handleFileChange}/>
            <label>Tags:</label>
            <input type="text" onChange={(e) => setType(e.target.value)} value={type}/>
            <button type="submit">Add Photo</button>
            {error && <div className ="error">{error}</div>}
        </form>
    )

}
export default EmployeeForm

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