import { useState } from "react"

const EmployeeForm = () =>
{   
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [employer, setEmployer] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState('')


    const handleNewbie = async (e) =>{
        e.preventDefault()
        const employee = {name, position, employer, type}
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
            setType('')
            setError(null)
            console.log('New Employee Added', json)
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
            <label>Rank of Employment:</label>
            <input type="text" onChange={(e) => setType(e.target.value)} value={type}/>
            <button>Add Employee</button>
            {error && <div className ="error">{error}</div>}
        </form>
    )

}
export default EmployeeForm