import React from 'react';
import charizardImg from '../images/charizard-2x.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

function Home() {
   const [pokemon, setPokemon] = useState();

   async function getPokemon(id) {
      try {
         let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
         let data = await response.json();
         setPokemon(data.name);

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      let randomNumber = Math.floor(Math.random() * 897 + 1);
      getPokemon(randomNumber);
   }, []);

   return (
      <>
         <div className="container">
            <div id="home-heading" className="home-message">
               <h2>Welcome to Poké Team Builder</h2>
               <h3>
                  Navigate to any pokémon's page to start adding pokémon to your team.
               </h3>
            </div>
            <div className="center">
                  <button
                     className="button home-btn"><Link to={`/pokemon/${pokemon}`}> Get a Random Pokémon </Link>
                  </button>
            </div>
            <img className="pokemon-img" src={charizardImg} alt="Charizard"></img>
         </div>
         <Footer />
      </>
   );
}

export default Home;