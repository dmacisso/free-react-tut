import { useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import { baseUrl } from '../shared';

// components
import AddCustomer from '../components/AddCustomer';

function Customers() {
  const [customers, setCustomers] = useState('');

  useEffect(() => {
    const url = `${baseUrl}api/customers/`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCustomers(data.customers);
      });
  }, []);

  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + 'api/customers/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        // assume add was successful
        // hide the Modal
        // make sure the list is updated appropriately
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <ul>
        <h1>Here are our Customers:</h1>
        {customers
          ? customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={`/customers/${customer.id}`}>{customer.name}</Link>;
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer newCustomer={newCustomer} />
    </>
  );
}

export default Customers;
