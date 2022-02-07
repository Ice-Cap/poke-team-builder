import React, { useEffect, useState } from 'react';
import { formatText, getTypeColor } from '../components/helperFunctions';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';


function Pokedex() {

   let [page, setPage] = useState(1);
   const [pageData, setPageData] = useState();
   const [pokemonOffset, setPokemonOffset] = useState(1);
   const [filters, setFilters] = useState({type: 'all'});
   const [isFiltered, setIsFiltered] = useState(false);

   let totalPokemon = 898;

   async function getPageData(url) {
      try {
         let res = await fetch(url);
         let data = await res.json();

         let dataStr = JSON.stringify(data);
         localStorage.setItem(`pokedexData${page}`, dataStr);

         setPageData(data);
      } catch (error) {
         console.log(`ERROR FROM POKEDEX: ${error}`);
      }
   }

   async function getFilteredPageData(url) {
      try {
         let res = await fetch(url);
         let data = await res.json();

         let dataStr = JSON.stringify(data);
         localStorage.setItem(`pokedexData${page}`, dataStr);

      } catch (error) {
         console.log(`ERROR FROM POKEDEX: ${error}`);
      }
   }


   useEffect(() => {

      getPageData('https://pokeapi.co/api/v2/pokemon?limit=20');
      
   }, []); 

   function nextPage() {

      if (pokemonOffset === 861) {

         setPage(page + 1);

         setPageData(null);

         getPageData('https://pokeapi.co/api/v2/pokemon?offset=880&limit=18');

         setPokemonOffset(pokemonOffset + 20);

      } else {
         setPage(page + 1);

         setPageData(null);

         getPageData(pageData.next);

         setPokemonOffset(pokemonOffset + 20);
      }
   }

   function previousPage() {
      setPage(page - 1);

      setPageData(null);

      getPageData(pageData.previous);

      setPokemonOffset(pokemonOffset - 20);
   }

   function jumpPageUp() {
      setPage(page + 10);

      setPokemonOffset(pokemonOffset + 200);

      setPageData(null);

      getPageData(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonOffset + 199}&limit=20`);
   }

   function jumpPageDown() {
      setPage(page - 10);

      setPokemonOffset(pokemonOffset - 200);

      setPageData(null);

      getPageData(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonOffset - 199}&limit=20`);
   }

   function jumpUpFour() {
      setPage(page + 4);

      setPokemonOffset(pokemonOffset + 80);

      setPageData(null);

      getPageData(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonOffset + 79}&limit=20`);
   }

   function showFilters() {
      const filters = document.getElementById("filters");
      filters.classList.toggle("show-filters");
      document.querySelector(".filter-button span").classList.toggle('rotate-arrow');
   }

   function setSelectedType() {

      const radioButtons = document.getElementsByName('type');

      radioButtons.forEach((button) => {
         if (button.checked) {
            setPageData(null);
            getFilteredPageData(`https://pokeapi.co/api/v2/type/${button.value}`);
            getPageData(`https://pokeapi.co/api/v2/type/${button.value}`);
            setFilters({type: button.value});
         }
      });
   
      setIsFiltered(true);
   }

      
   if (!pageData) {
      window.scroll(0, 0);
      return (
         <div id="loading-container">
            <h2 className="loading">LOADING...</h2>
         </div>
      );

   } else {

      let pokeList = [];
      if (isFiltered === false) {
         let names = pageData.results;

         pokeList = names.map((item, index) => {
            let pokemonName = formatText(item.name);

            let regex = /\/\d\d?\d?/;
            let myMatch = item.url.match(regex);
            let number = myMatch[0].slice(1);

            return (
               <li key={item.name}>
                  <Link to={`/pokemon/${item.name}`}>
                     <h4 className="number">{"#" + number}</h4>
                     <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`} alt={item.name}/>

                     <p>{pokemonName}</p>
                  </Link>
               </li>
            );

         });

      } else {
         let names = pageData.pokemon;

         pokeList = pageData.pokemon.map((item, index) => {
            let pokemonName = formatText(item.pokemon.name);

            let regex = /\/\d\d?\d?\d?/;
            let myMatch = item.pokemon.url.match(regex);
            let number = myMatch[0].slice(1);

            if (number <= totalPokemon) {
               return (
                  <li key={item.pokemon.name}>
                     <Link to={`/pokemon/${item.pokemon.name}`}>
                        <h4 className="number">{"#" + number}</h4>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`} alt={item.pokemon.name}/>
                        <p>{pokemonName}</p>
                     </Link>
                  </li>
               );
            }

            
         });
         
      }

      const types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

      const typeFilters = types.map((type) => {
         const typeColor = getTypeColor(type);
         return (
            <div className="type-filter" key={type}>
               <input type="radio" name="type" id={type} value={type}/>
               <label className="type" htmlFor={type} style={{backgroundColor: typeColor}}>{type}</label>
            </div>
         );

      });


      return (
         <>
            <div className="pokedex-container">
               <h2 className="heading">Pokédex</h2>

               <div className="filter-container">
                  <button onClick={showFilters} className="filter-button button">Filter By Type <span className="arrow"></span></button>

                  {isFiltered &&
                     <h3 className="type" style={{ backgroundColor: getTypeColor(filters.type) }}>{filters.type}</h3>
                  }
               </div>

               <div id="filters">
                  <div id="type-filters-container">
                     {typeFilters}
                  </div>
                  <div id="filter-submit-container">
                     <button onClick={setSelectedType} className="button filter-submit">Search</button>
                  </div>
               </div>

               <div>
                  <ul id="pokedex-list">{pokeList}</ul>

                  {isFiltered === false &&
                     <div className="page-buttons-container">

                        {page > 1 ?
                           <button className="page-button" onClick={previousPage}>Previous Page</button>
                           : <button disabled className="page-button disabled-button" onClick={previousPage}>Previous Page</button>}

                        <div className="page-links-container">

                           {page > 10 && <p onClick={jumpPageDown} className="page-link">{page - 10}...</p>}

                           <p className="page-number">{page}</p>

                           {page <= 34 && <p onClick={jumpPageUp} className="page-link">...{page + 10}</p>}

                           {page >= 35 && page <= 40 ? <p onClick={jumpUpFour} className="page-link">...{page + 4}</p> : ''}

                        </div>

                        {pokemonOffset < 881 ?
                           <button className="page-button" onClick={nextPage}>Next Page</button>
                           : <button disabled className="page-button disabled-button" onClick={nextPage}>Next Page</button>}

                     </div>
                  }

               </div>
            </div>
            <Footer />
         </>
      );
   }
}

export default Pokedex;