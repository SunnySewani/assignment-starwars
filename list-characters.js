import React from "react";
import { useTheFetch } from "./use-the-fetch";
import {FormControl, MenuItem, Select} from "@material-ui/core";

export const ListCharacters = ({ onChange }) => {
  const { loading, data } = useTheFetch("people/");

  const selectedCharacter = (e) => {
    onChange(data.results[e.target.value]);
  };
  return (
    <FormControl style={{minWidth: 120}}>
        <Select data-testId="character-select" onChange={selectedCharacter}>
            {!loading &&
              data.results.map((character, i) => (
              <MenuItem  value={i} key={i}>
                {character.name}
              </MenuItem >
            ))}
        {loading && <option>Loading ...</option>}
        </Select>
    </FormControl>
  
  );
}
