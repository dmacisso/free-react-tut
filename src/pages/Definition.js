import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useFetch from '../hooks/UseFetch';

// components
import DefinitionSearch from '../components/DefinitionSearch';
import NotFound from '../components/NotFound';

export default function Definition() {
  // const [word, setWord] = useState();
  // const [notFound, setNotFound] = useState(false);
  // const [error, setError] = useState(false);

  let { search } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [word, errorStatus] = useFetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
  );

  if (errorStatus === 404) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Try again 🤞</Link>
      </>
    );
  }

  if (errorStatus) {
    return (
      <>
        <p>Something Went Wrong.. 😡</p>
        <Link to="/dictionary">Try Again.. 🤞</Link>
      </>
    );
  }

  // return <p> Work in progress</p>;

  return (
    <>
      {word?.[0]?.meanings ? (
        <>
          <h1>
            Here is a definition of
            <span className="text-blue-600 italic"> "{search}"</span>
          </h1>

          {word[0].meanings.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech}: {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Another</p>
          <DefinitionSearch />
          {/* <Link to="/dictionary">Search another</Link> */}
        </>
      ) : null}
    </>
  );
}
