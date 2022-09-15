import './App.css';
import Employee from './components/Employee';

function App() {
  console.log('We are about to list the employees');
  const showEmployees = true;
  return (
    <div className="App">
      {console.log('Inside the jsx return')}
      {showEmployees ? (
        <>
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
        </>
      ) : (
        <p>You cannot see the employee list</p>
      )}
    </div>
  );
}

export default App;
