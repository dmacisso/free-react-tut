import { useState } from 'react';
import './index.css';
import Employee from './components/Employee';
// import { v4 as uuidv4 } from 'uuid';

function App() {
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

  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  updateEmployee={updateEmployee}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>You cannot see the employee list</p>
      )}
    </div>
  );
}

export default App;
