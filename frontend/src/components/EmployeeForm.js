import { useState } from "react"

const EmployeeForm = () =>
{   
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [employer, setEmployer] = useState('')
    const [type, setType] = useState('')
    return (
        <form className="create">
            <h3>Add a New Employee</h3>
            <label>Name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
            <label>Position:</label>
            <input type="text" onChange={(e) => setPosition(e.target.value)} value={position}/>
            <label>Employer:</label>
            <input type="text" onChange={(e) => setEmployer(e.target.value)} value={employer}/>
            <label>Rank of Employment:</label>
            <input type="text" onChange={(e) => setType(e.target.value)} value={type}/>

        </form>
    )

}