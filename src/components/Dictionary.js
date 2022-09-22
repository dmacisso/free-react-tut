import { useState, useEffect } from 'react';

export default function Dictionary() {
  const [word, setWord] = useState('');
  const [word2, setWord2] = useState('');

  useEffect(() => {
    console.log('state updated ' + word);
  }, [word]);
  
  useEffect(() => {
    console.log('state updated ' + word2);
  }, [word2]);

  /* 
  limit what state useEffect cares about ---> dependency array []
  no dependency array --> update for every state change
  empty dependency array --> executes once
  passing in data --> only executes when those state variables change.
  */

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <h2>Lets get the definition for {word}</h2>
      <input
        type="text"
        onChange={(e) => {
          setWord2(e.target.value);
        }}
      />
      <h2>Lets get the definition for {word2}</h2>
    </>
  );
}
