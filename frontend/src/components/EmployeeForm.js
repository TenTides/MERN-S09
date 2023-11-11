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
        const response = await fetch('/api/employees',{
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
            <h3>Add a New Employee</h3>
            <label>Name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
            <label>Position:</label>
            <input type="text" onChange={(e) => setPosition(e.target.value)} value={position}/>
            <label>Employer:</label>
            <input type="text" onChange={(e) => setEmployer(e.target.value)} value={employer}/>
            <label htmlFor="file-upload" className="custom-file-upload">Profile Photo:</label>
            <input type="file" name = "myFile" id = "file-upload" accept=".jpeg, .png, .jpg" onChange={handleFileChange}/>
            <label>Rank of Employment:</label>
            <input type="text" onChange={(e) => setType(e.target.value)} value={type}/>
            <button type="submit">Add Employee</button>
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