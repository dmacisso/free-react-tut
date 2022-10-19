import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';

// Components
import NotFound from '../components/NotFound';

export default function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customer) return;
    if (!customer) return;

    // let equal = true;
    // if (customer.name !== tempCustomer.name)  equal = false;
    // if (customer.industry !== tempCustomer.industry) equal = false;
    // if (equal)   setChanged(false);

    customer.name === tempCustomer.name &&
    customer.industry === tempCustomer.industry
      ? setChanged(false)
      : setChanged(true);
  });

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
        if (!res.ok) {
          // console.log('response ', res);
          throw new Error('Something went wrong');
        }

        return res.json();
      })

      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  function updateCustomer(e) {
    e.preventDefault();
    const url = `${baseUrl}api/customers/${id}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        console.log('response: ', response);
        if (!response.ok) throw new Error('Something went wrong');
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        // console.log(data);
        setError(null);
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <p>The customer with id {id} for was not found</p> : null}

      {customer ? (
        <div>
          <form
            className="w-full max-w-sm"
            onSubmit={updateCustomer}
            id="customer"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="name">Name:</label>
              </div>
              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700"
                  id="name"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="industry">Industry:</label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="industry"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
          {changed ? (
            <div className="mb-2">
              <button
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-purple-400 hover:bg-slate-500 text-white font-bold
              py-2 px-4 rounded"
                form="customer"
              >
                Save
              </button>{' '}
            </div>
          ) : null}
          <div>
            <button
              className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                // const url = `${baseUrl}api/customers/${id}}`;
                const url = baseUrl + 'api/customers/' + id;
                fetch(url, {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error('Something went wrong when fetching');
                    }
                    // assume things went well..
                    navigate('/customers');
                  })
                  .catch((err) => setError(err.message));
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/customers">
        <button
          className="no-underline bg-purple-400 hover:bg-slate-500 text-white font-bold
              py-2 px-4 rounded"
        >
          &lt;&ndash; &ndash; Customers
        </button>
      </Link>
    </div>
  );
}
