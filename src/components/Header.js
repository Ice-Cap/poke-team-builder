import React from 'react';
import pokeBallImg from '../images/pokeball.png';
import SearchBar from './SearchBar';
import TeamBar from './TeamBar';
import { Link } from 'react-router-dom';

function Header(props) {
   return (
      <>
         <div id='header'>
            <img src={pokeBallImg} alt='pokeball'></img>
            <h1>Poké Team Builder</h1>
         </div>
         <nav>
            <Link to='/'>Home</Link>
            <Link to='/pokedex'>Pokédex</Link>
            <Link to='/my-team'>My Team</Link>
            <Link to='/about'>About</Link>
         </nav>
         <SearchBar />
         <TeamBar team={props.team} removePokemon={props.removePokemon}/>
      </>
   );
}

export default Header