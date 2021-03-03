import React, { useState, useEffect } from "react";
import { ListCharacters } from "./list-characters";
import {TextField} from '@material-ui/core';

export const CharacterDetails = () => {
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [release, setRelease] = useState('');
  let titleOfFilms = [];
  let filmsList = [];
  let lastRelease = '';
  const urls = (character && character.films) || [];

  useEffect(() => {
    Promise.all(urls.map(u=>fetch(u))).then(responses =>
    Promise.all(responses.map(res => res.json()))
      ).then(response => {
          titleOfFilms = response.map(m => m.title);
          setFilms(titleOfFilms);

          filmsList = response.map(m => ({title: m.title, year: Number(m.release_date.substring(0, 4))}))
          .sort((a,b) => (a.year > b.year) ? -1 : (a.year < b.year) ? 1 : 0)[0];

          lastRelease = filmsList ? `${filmsList.title} - ${filmsList.year}` : '';
          setRelease(lastRelease);
})
  }, [character]);

  return (
    <>
      <div style={{marginTop: '15px'}}>
      <ListCharacters onChange={setCharacter}/>
      </div>

      <div style={{margin: '20px 40px 0px 0px'}}>
      <h4> Movie List: </h4>
        {films.map(txt => <p>{txt}</p>)}
      </div>

      <h4 style={{margin: '20px 30px 20px 0px'}}> Last Release: </h4>
      <TextField
          value={release ? release : ''}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
    </>
  );
}
