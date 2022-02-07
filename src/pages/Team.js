import React, { useState, useEffect } from 'react';
import { getTypeColor, typeCounter, formatText} from '../components/helperFunctions';
import { findWeaknesses, findStrengths } from '../components/typeChartFunctions';
import Footer from '../components/Footer';

function Team(props) {

   const [pokeData, setPokeData] = useState([]);
   const [updating, setUpdating] = useState(true);
   const [typeCount, setTypeCount] = useState({});
   const [weaknesses, setWeaknesses] = useState({});
   const [teamTypes, setTeamTypes] = useState([]);
   const [strengths, setStrengths] = useState({});
   const [teamStats, setTeamStats] = useState({'hp': 0, 'attack': 0, 'defense': 0, 'special-attack': 0, 'special-defense': 0, 'speed': 0});

   useEffect(() => {
      let myTeam = [];
      if (props.team) {
         for (let i = 0; i < props.team.length; i++) {

            let pokemonData = localStorage.getItem(`${props.team[i]}Data`);
            let pokemonObject = JSON.parse(pokemonData);
   
            myTeam.push(pokemonObject);
         }

         setPokeData(myTeam);

         let currentTypeCount = typeCounter(myTeam);
         setTypeCount(currentTypeCount);
      }

   }, [props]);

   useEffect(() => {
      let currentStrengths = findStrengths(teamTypes);
      setStrengths(currentStrengths);

      let currentWeaknesses = findWeaknesses(teamTypes);
      setWeaknesses(currentWeaknesses);
   }, [teamTypes]);


   function getTypes() {
      let typeArray = [];
      pokeData.forEach((teamMember) => {
         const dualType = [];

         teamMember.types.forEach((slot) => {
            dualType.push(slot.type.name);
         });

         typeArray.push(dualType.join('-'));
      });

      setTeamTypes(typeArray);
   }

   function setStats() {

      // Resetting so the stats display correctly when a pokemon is removed
      setTeamStats({'hp': 0, 'attack': 0, 'defense': 0, 'special-attack': 0, 'special-defense': 0, 'speed': 0});

      pokeData.forEach((teamMember) => {
         teamMember.stats.forEach((item) => {
            setTeamStats((prevState) => {
               prevState[item.stat.name] += item['base_stat'];
               return prevState;
            });
         });   
      });
   }

   useEffect(() => {
      if (pokeData) {
         setUpdating(false);

         getTypes();

         setStats();
      } else {
         setUpdating(true);
      }
   }, [pokeData]); 


   function typeInfo() {
      const typeInfoArray = [];
      for (let key in typeCount) {
         let fontWeight = 'normal';
         let color = '#fff';
         if (typeCount[key] > 0) {
            fontWeight = 'bold';
         } else {
            color = 'gray';
         }
         typeInfoArray.push(
            <li key={key} style={{fontWeight: fontWeight, color: color}}>{`${key}: ${typeCount[key]}`}</li>
         );
      }

      return typeInfoArray;
   }

   function weaknessInfo() {
      const weaknessInfoArray = [];
      for (let key in weaknesses) {
         let color = '#fff';
         let fontColor = '#fff';
         let fontWeight = 'normal';
         weaknesses[key] > 2 ? color = '#ff3839' : color = '#1a1a1a';
         if (weaknesses[key] > 0) {
            fontWeight = 'bold';
         } else {
            fontColor = 'gray';
         }

         weaknessInfoArray.push(
            <li 
               style={{ backgroundColor: color, fontWeight: fontWeight, color: fontColor }}
               key={key}
            >
                  {`${key}: ${weaknesses[key]}`}
            </li>
         );
      }

      return weaknessInfoArray;
   }

   function strengthInfo() {
      const strengthInfoArray = [];
      for (let key in strengths) {
         let color = 'green';
         let fontWeight = 'normal';
         let fontColor = '#fff';
         strengths[key] > 2 ? color = 'green' : color = '#1a1a1a';
         if (strengths[key] > 0) {
            fontWeight = 'bold';
         } else {
            fontColor = 'gray';
         }

         strengthInfoArray.push(
            <li 
               style={{ backgroundColor: color, fontWeight: fontWeight, color: fontColor }}
               key={key}
            >
                  {`${key}: ${strengths[key]}`}
            </li>
         );
      }
      
      return strengthInfoArray;
   }


   if (updating) {

      return (
         <div className="container">
            <h2 className="loading">Loading...</h2>
         </div>
      );

   } else if (props.team.length <= 0) {

      return (
         <>
            <div className="team-page">
               <h2 className="heading page-heading">My Team</h2>
               <p className="message">Add pokemon to your team to see how strong they are here</p>

               <div id="team-data-container">
                  <div className="team-info-outter-container">

                     <h2 className="data-heading">Type Data</h2>

                     <div className="team-info-container">
                        <div className="data-list">
                           <h3 className="info-heading">Types:</h3>
                           <ul><li>...</li></ul>
                        </div>
                        <div className="data-list">
                           <h3 className="info-heading">Weaknesses:</h3>
                           <ul><li>...</li></ul>
                        </div>
                        <div className="data-list">
                           <h3 className="info-heading">Strengths:</h3>
                           <ul><li>...</li></ul>
                        </div>
                     </div>

                  </div>

                  <div className="team-info-outter-container">
                     <h2 className="data-heading">Team Stats</h2>
                     <ul className="stats team-stats">
                        <li>...</li>
                        <li>Total:</li>
                     </ul>
                  </div>
               </div>
               
            </div>
            <Footer />
         </>
      );

   } else {

      let teamDisplay = pokeData.map((item, index) => {
         const pokeType = item.types.map((slot) => {
            let typeColor = getTypeColor(slot.type.name);
            return (
               <h3
                  key={slot.type.name}
                  className="type team-type"
                  style={{ backgroundColor: typeColor }}
               >
                  {slot.type.name}
               </h3>
            );
         });

         return (
            <div key={item.name + index} className="team-member">
               <h3 className="team-name">{item.species.name}</h3>
               <img className="team-image" src={item.sprites["front_default"]} alt={item.name} />
               <div className="type-container">{pokeType}</div>
            </div>
         );
      });

      const statList = [];
      for (let key in teamStats) {
         const maxColor = 160;
         const baseStat = teamStats[key];
         const barColor = `hsl(${baseStat > maxColor ? baseStat / 4.5: baseStat - 90}, 70%, 50%)`;
         const statName = formatText(key);

         statList.push(
            <li key={statName}>
               <span className="stat-name">{statName}</span>{'' + baseStat}
               <span className="stat-bar" style={{ backgroundColor: barColor, width: baseStat / 2.5}}> </span>
            </li>
         );
      }

      let statsArray = [];
      for (let key in teamStats) {
         statsArray.push(teamStats[key]);
      }
      let statTotal = statsArray.reduce((prev, current) => {
         return prev + current;
      }, 0);
   
      return (
         <>
            <div className="team-page">
               <h2 className="heading page-heading">My Team</h2>
               <div className="team-container">
                  {teamDisplay}
               </div>

               <div id="team-data-container">
                  <div className="team-info-outter-container">

                     <h2 className="data-heading">Type Data</h2>

                     <div className="team-info-container">
                        <div className="data-list">
                           <h3 className="info-heading">Types:</h3>
                           <ul>{typeInfo()}</ul>
                        </div>
                        <div className="data-list">
                           <h3 className="info-heading">Weaknesses:</h3>
                           <ul>{weaknessInfo()}</ul>
                        </div>
                        <div className="data-list">
                           <h3 className="info-heading">Strengths:</h3>
                           <ul>{strengthInfo()}</ul>
                        </div>
                     </div>

                  </div>

                  <div className="team-info-outter-container">
                     <h2 className="data-heading">Team Stats</h2>
                     <ul className="stats team-stats">
                        {statList}
                        <li>Total: &nbsp;{statTotal}</li>
                     </ul>
                  </div>
               </div>
              
               <br></br>
            </div>
            <Footer />
         </>
      );
   }
   
}

export default Team;