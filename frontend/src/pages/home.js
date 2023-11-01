import { useEffect, useState } from "react"
import EmployeeSum from "../components/EmployeeSum"

const Home = () =>
{
    const [employees, setEmployees] = useState(null)

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('/api/employees')
            const json = await response.json() // array of jsons

            if(response.ok)
            {
                setEmployees(json)
            }
        }
        fetchEmployees()
    }, []) // empty dependency array ensures function only fires off once

    return (
        <div className="home">
            <div className="employees">
                {employees && employees.map((employee) => (
                    <EmployeeSum key={employee._id} employee = {employee}/>
                ))}
            </div>
        </div>
    )
}
export default Home