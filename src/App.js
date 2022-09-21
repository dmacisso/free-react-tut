import { useState } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

// Components
// import Employee from './components/Employee';
// import AddEmployee from './components/AddEmployee';
// import EditEmployee from './components/EditEmployee';
import Header from './components/Header';
import Employees from './pages/Employees';

function App() {
  return (
    <Header>
      <Employees />;
    </Header>
  );
}

export default App;
