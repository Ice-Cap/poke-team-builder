import './App.css';
import PokemonDetails from './pages/PokemonDetails';
import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Pokedex from './pages/Pokedex';
import Team from './pages/Team';
import About from './pages/About';

function App() {
   const [team, setTeam] = useState([]);
   const [update, setUpdate] = useState(1);
   const [loading, setLoading] = useState(true);
   
   useEffect(() => {
      setLoading((false));
   }, []);   

   // useEffect(() => {
   //    console.log(`APP:  Team: ${team}`);
   // }, [team]);

   // useEffect(() => {
   //    console.log(`APP:  Team: ${team}`);
   // });

   function addToTeam(pokemon) {
      if (team.length >= 6) {
        showWarning();
      } else {
         // console.log(`APP:  Added ${pokemon}`);
         setTeam([...team, pokemon]);
      }
   }

   function removePokemon(pokemonToRemove) {
      const indexOfPokemon = team.indexOf(pokemonToRemove);

      //--!  This works exactly as indended so use this  !--//
      team.splice(indexOfPokemon, 1);
      setTeam(team);
      setUpdate(update + 2);

      // console.log(`APP:  Removed ${pokemonToRemove}`);
   }

   function closeWarning() {
      const popup = document.getElementById('warning-pop-up');
      popup.style.display = 'none';
   }

   function showWarning() {
      const popup = document.getElementById('warning-pop-up');
      popup.style.display = 'block';
   }

   if (loading) {
      return null;
   }

   return (
      <Router>
         <div className="App">
            <Header team={team} removePokemon={removePokemon}/>
            <main>
               <div id="warning-pop-up">
                  <p onClick={closeWarning} className="warning-close">&times;</p>
                  <p>You can only have 6 pokémon in your team!</p>
               </div>
               <Switch>
                  <Route path='/' exact>
                     <Home />
                  </Route>
                  <Route path='/pokemon/:name'> 
                     <PokemonDetails team={team} addToTeam={addToTeam} />
                  </Route>
                  <Route path='/pokedex'>
                     <Pokedex />
                  </Route>
                  <Route path='/my-team'>
                     <Team team={team}/>
                  </Route>
                  <Route path='/about'>
                     <About />
                  </Route>
               </Switch>
            </main>
         </div>
      </Router>
      
   );
}

export default App;
