import React, { useState } from 'react';
import { getPokemon } from './helperFunctions';
import { Link } from 'react-router-dom';


function TeamBar(props) {
   const popUp = document.getElementById('pop-up');

   const [clickedSprite, setClickedSprite] = useState();
   const [pokemon, setPokemon] = useState();

   // const sprites = props.team.map((pokemon) => {
   //    if (!localStorage.getItem(`${pokemon}Data`)) {
   //      const data = getPokemon(pokemon);
   //      return {
   //         sprite: data.sprites['front_default'],
   //         name: data.name
   //       };
   //    } else {
   //       const pokemonData = localStorage.getItem(`${pokemon}Data`);
   //       const pokemonObject = JSON.parse(pokemonData);
   //       return {
   //          sprite: pokemonObject.sprites['front_default'],
   //          name: pokemonObject.name
   //       };
   //    }

   // });

   let sprites = props.team.map((pokemon, index) => {
      if (!localStorage.getItem(`${pokemon}Data`)) {
         console.log('TEAM BAR:  Wasnt stored');
         getPokemon(pokemon).then((data) => {
            return (
               <li key={data.name += index} onClick={openPopup}>
                  <img src={data.sprites['front_default']} alt={data.name} />
               </li>
            );
         });
      } else {
         
         const pokemonData = localStorage.getItem(`${pokemon}Data`);
         const pokemonObject = JSON.parse(pokemonData);
         return (
            <li data-name={pokemonObject.name} data-url={pokemonObject.sprites['front_default']} key={pokemonObject.name += index} onClick={openPopup}>
               <img src={pokemonObject.sprites['front_default']} alt={pokemonObject.name} />
            </li>
         );
      }
   });

   function openPopup(e) {
      if (props.team.length > 0) {
         setClickedSprite(e.target.src);
         setPokemon(e.target.alt);
         popUp.style.display = 'block';
  
         if (e.target.nodeName === "LI") {
            setClickedSprite(e.target.dataset.url);
            setPokemon(e.target.dataset.name);
         }

      }
   }

   function closePopup() {
      popUp.style.display = 'none';
   }

   function remove() {
      closePopup();
      props.removePokemon(pokemon);

      // sprites = sprites.filter((member) => member !== pokemon);
   }


   return (
      <div id="team-bar">
         <ul>
            {sprites}
         </ul>
         <div id="pop-up">
            <h3>
               What would you like to do?
               <span onClick={closePopup} className="close-btn">&times;</span>
            </h3>
            <div className="center">
               <img src={clickedSprite} alt="" />
            </div>
            <div className="button-container">
               <button onClick={remove} className="button">Remove</button>
               <Link to={`/pokemon/${pokemon}`} onClick={closePopup}>
                  <button className="button see-stats">See Stats</button>
               </Link>
            </div>
            
         </div>
      </div>
   );
}

export default TeamBar;
