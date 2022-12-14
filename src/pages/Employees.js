import { useState } from 'react';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';

// Components
import Employee from '../components/Employee';
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';
// import Header from '../components/Header';

function Employees() {
  // eslint-disable-next-line
  const [role, setRole] = useState('dev');
  // eslint-disable-next-line
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Caleb',
      role: 'Developer',
      img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 2,
      name: 'Marci',
      role: 'Admin',
      img: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 3,
      name: 'Sam',
      role: 'Student',
      img: 'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 4,
      name: 'Jayne',
      role: 'Manager',
      img: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 5,
      name: 'Sal',
      role: 'Author',
      img: 'https://images.pexels.com/photos/4355346/pexels-photo-4355346.jpeg?auto=compress&cs=tinysrgb&w=16000',
    },
    {
      id: 6,
      name: 'Heather',
      role: 'Developer',
      img: 'https://images.pexels.com/photos/3283568/pexels-photo-3283568.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updateEmployees = employees.map((employee) => {
      if (id === employee.id) {
        //* return new employee
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });
    setEmployees(updateEmployees);
  }

  function newEmployee(name, role, img) {
    const newEmployee = { id: uuidv4(), name: name, role: role, img: img };
    setEmployees([...employees, newEmployee]);
  }

  const showEmployees = true;
  return (
    <div className="">
      {showEmployees ? (
        <>
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                />
              );

              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p>You cannot see the employee list</p>
      )}
    </div>
  );
}

export default Employees;
