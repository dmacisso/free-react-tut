import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// components
import DefinitionSearch from '../components/DefinitionSearch';
import NotFound from '../components/NotFound';

export default function Definition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  let { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // useEffect(() => {
    // const url = 'https://bafdsafdsafdadfasfeddfs';
    //  const url = 'https://httpstat.us/501';
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;
    fetch(url)
      .then((response) => {
        // console.log(response.status);
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate('/login');
        } else if (response.status === 500) {
          setError(true);
        }
        if (!response.ok) {
          setError(true);
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }

  if (error === true) {
    return (
      <>
        <p>Something Went Wrong.. 😡</p>
        <Link to="/dictionary">Try Again..</Link>
      </>
    );
  }

  return (
    <>
      {word ? (
        <>
          <h1>
            Here is a definition of{' '}
            <span className="text-blue-600 italic"> "{search}"</span>{' '}
          </h1>

          {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech}: {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Another</p>
          <DefinitionSearch />
          <Link to="/dictionary">Search another</Link>
        </>
      ) : null}
    </>
  );
}
