import { useState } from 'react';
import './App.css';
import Employee from './components/Employee';


function App() {
  const [role, setRole] = useState('dev')
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
          <Employee name="Caleb" role="Intern" />
          <Employee name="Abby" role={role} />
          <Employee name="Michael" />
        </>
      ) : (
        <p>You cannot see the employee list</p>
      )}
    </div>
  );
}

export default App;
