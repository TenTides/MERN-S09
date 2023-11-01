import { useEffect } from "react"
import { useEmployeesContext } from "../hooks/useEmployeesContext"
import EmployeeSum from "../components/EmployeeSum"
import EmployeeForm from"../components/EmployeeForm"

const Home = () =>
{
    const {employees,dispatch} = useEmployeesContext()

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('/api/employees')
            const json = await response.json() // array of jsons

            if(response.ok)
            {
                dispatch({type:'SET_EMPLOYEES',payload: json})
            }
        }
        fetchEmployees()
    }, [dispatch]) // empty dependency array ensures function only fires off once

    return (
        <div className="home">
            <div className="employees">
                {employees && employees.map((employee) => (
                    <EmployeeSum key={employee._id} employee = {employee}/>
                ))}
            </div>
            <EmployeeForm/>
        </div>
    )
}
export default Home