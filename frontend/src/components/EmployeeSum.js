const EmployeeSum = ({ employee }) =>
{
    return (
        <div className="employee-details">
            <h4>{employee.name}</h4>
            <p><strong>Position: </strong>{employee.position}</p>
            <p><strong>Employer: </strong>{employee.employer}</p>
            <p><strong>Profile: </strong><img src={employee.file} alt=""/></p>
            <p><strong>Rank Of Employment: </strong>{employee.type}</p>
            <p>{employee.createdAt}</p>
        </div>
    )
}

export default  EmployeeSum