import React, { useEffect, useState } from 'react';
import { getPokemon, formatText, localStorageSpace, getTypeColor } from '../components/helperFunctions';
import { useParams } from 'react-router-dom';
import pokeBallImg from '../images/pokeball.png';
import Footer from '../components/Footer';


function PokemonDetails(props) {
   const [pokeData, setPokeData] = useState();
   const [pokemon, setPokemon] = useState();
   let { name } = useParams();


   async function getData() {
      const data = await getPokemon(pokemon);
      setPokeData(data);
   }

   useEffect(() => {
      setPokeData(null);
      setPokemon(name);
   }, [name]);

   useEffect(() => {
      if (pokemon) {
         if (!localStorage.getItem(`${pokemon}Data`)) {
            getData();
         } else {
            const pokemonData = localStorage.getItem(`${pokemon}Data`);
            const pokemonObject = JSON.parse(pokemonData);
            
            setPokeData(pokemonObject);
         }
      }
   }, [pokemon]);

   useEffect(() => {
      let currentSpace = localStorageSpace();
      currentSpace = parseInt(currentSpace);

      if (currentSpace > 4000) {
         const itemsToDelete = [];
         console.log('DETAILS:  removing items now');

         for (let i = 0; i < localStorage.length; i++) {
            let shouldDelete = true;

            for (let j = 0; j < props.team.length; j++) {

               if (localStorage.key(i) === `${props.team[j]}Data`) {
                  shouldDelete = false;
                  break;
               } else {
                  shouldDelete = true;
               }
            }
            if (localStorage.key(i) === `${pokemon}Data` || localStorage.key(i) === `pokemonNames`) {
               shouldDelete = false;
            }

            if (shouldDelete === true) {
               console.log(`removing ${localStorage.key(i)}`);
               itemsToDelete.push(localStorage.key(i));
            }
         }

         itemsToDelete.forEach((item) => {
            for (let i = 0; i < localStorage.length; i++) {
               if (item === localStorage.key(i)) {
                  localStorage.removeItem(localStorage.key(i));
               }
            }
         });
      }
   });

   //--  Rendering Logic  --//
   if (!pokeData) {
      window.scroll({
         top: 130,
         left: 0,
         behavior: 'smooth'
       });
      return (
         <div id="loading-container">
            {/* <h2>Loading...</h2> */}
            <div className="loading-display">
               <img src={pokeBallImg} alt="pokeball loading icon"></img>
            </div>
         </div>
      );

   } else {

      const statList = pokeData.stats.map((item) => {
         let statName = item.stat.name;
         const baseStat = item["base_stat"];
         const barColor = `hsl(${baseStat - 10}, 70%, 50%)`;
         statName = formatText(statName);

         return (
            <li key={item.stat.name}>
               <span className="stat-name">{statName}</span>{'' + baseStat}
               <span style={{ backgroundColor: barColor, width: baseStat * 2 }} className="stat-bar"></span>
            </li>
         );
      });

      const statTotal = pokeData.stats.reduce((prev, current) => {
         return prev + current["base_stat"];
      }, 0);

      const pokeType = pokeData.types.map((slot) => {
         let typeColor = getTypeColor(slot.type.name);
         return (
            <h3
               key={slot.type.name}
               className="type" 
               style={{backgroundColor: typeColor}}
               >
                  {slot.type.name}
            </h3>
         );
      });

      return (
         <>
            <div className="container">
               <div id="poke-details">
                  <div id="pokemon-container">
                     <h2>{formatText(pokeData.name)}</h2>

                     {pokeData && <button
                        onClick={() => props.addToTeam(pokeData.name)}
                        className="button add-pokemon">Add</button>}

                     <img id="poke-img" src={pokeData.sprites.other["official-artwork"]["front_default"]} alt={pokeData.name} />

                     <div className="type-container">{pokeType}</div>
                  </div>

                  <ul className="stats">{statList}<li>Total: {statTotal}</li></ul>
               </div>
            </div>
            
            <Footer />
         </>
      );
   }
}

export default PokemonDetails;