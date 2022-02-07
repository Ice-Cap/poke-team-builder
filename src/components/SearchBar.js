import React, { useState, useEffect } from 'react';
import { formatText } from './helperFunctions';
import { Link } from 'react-router-dom';



function SearchBar() {
   const [pokemon, setPokemon] = useState([]);
   const [userSearch, setUserSearch] = useState();
   const [suggestions, setSuggestions] = useState(pokemon);

   function handleChange(e) {
      setUserSearch(e.target.value.toLowerCase());
      let matches = pokemon.filter((item) => {
         if (item.name.includes(userSearch) && item.name[0] === userSearch[0]) {
            return item;
         }
      });
      setSuggestions(matches);
   }

   async function getPokemonNames() {
      let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0');
      let data = await res.json();
      setPokemon(data.results);
      let dataStr = JSON.stringify(data);
      localStorage.setItem('pokemonNames', dataStr);
   }

   useEffect(() => {
      if (!localStorage.getItem('pokemonNames')) {
         getPokemonNames();
      } else {
         const pokemonData = localStorage.getItem('pokemonNames');
         const pokemonObject = JSON.parse(pokemonData);
         setPokemon(pokemonObject.results);
      }
   }, []);

   useEffect(() => {
      const list = document.getElementById('search-list');
      const input = document.getElementById('search-input');
      window.addEventListener('click', (e) => {
         if (e.target === input) {
            list.style.display = 'block';
         } else {
            list.style.display = 'none';
         }
      });
   }, []);

   const searchList = suggestions.map((item) => {
      let formattedItem = formatText(item.name);
      
      return <li key={item.name}><Link to={`/pokemon/${item.name}`}>{formattedItem}</Link></li>;
   });

   return (
      <div id='search-bar'>
         <input 
            id="search-input"
            autoComplete="off"
            onChange={handleChange} 
            placeholder='Search' 
            type='text'>
         </input>
         <ul id="search-list">{searchList}</ul>
      </div>
   );
}


export default SearchBar;