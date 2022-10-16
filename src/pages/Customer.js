import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';

// Components
import NotFound from '../components/NotFound';

export default function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState();
  useEffect(() => {
    const url = `${baseUrl}api/customers/${id}`;
    fetch(url)
      .then((res) => {
        if (res.status === 404) {
          //* redirect to a 404 page (new URL)
          // navigate('/404');
          //* render a 404 component on this page
          setNotFound(true);
        }
        return res.json();
      })

      .then((data) => setCustomer(data.customer));
  }, [id]);

  return (
    <>
      {notFound ? <p>The customer with id {id} for was not found</p> : null}
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : null}
      <button
        onClick={(e) => {
          // const url = `${baseUrl}api/customers/${id}}`;
          const url = baseUrl + 'api/customers/' + id;
          fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json'} })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Something went wrong when fetching');
              }
              // assume things went well..
              navigate('/customers');
            })
            .catch((err) => console.log(err));
        }}
      >
        Delete
      </button>
      <br />
      <Link to="/customers">Customers</Link>
    </>
  );
}
