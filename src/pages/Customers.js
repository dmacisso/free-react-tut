import { useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import { baseUrl } from '../shared';

// components
import AddCustomer from '../components/AddCustomer';

function Customers() {
  const [customers, setCustomers] = useState('');
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

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
        toggleShow();
        console.log(data);
        setCustomers([...customers, data.customer]);
        // assume add was successful
        // hide the Modal
        // make sure the list is updated appropriately
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <h1>Here are our Customers:</h1>
      {customers
        ? customers.map((customer) => {
            return (
              <div className="m-2" key={customer.id}>
                <Link to={`/customers/${customer.id}`}>
                  <button
                    className="no-underline bg-purple-600 hover:bg-slate-500 text-white font-bold
              py-2 px-4 rounded"
                  >
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}

      <AddCustomer
        show={show}
        toggleShow={toggleShow}
        newCustomer={newCustomer}
      />
    </>
  );
}

export default Customers;
