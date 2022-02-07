import React from 'react';
import Footer from '../components/Footer';

function About() {
   return (
      <>
         <div className="container" id="about-page">
            <h2 className="heading page-heading">About</h2>

            <div className="paragraph-container">
               <p className="about-paragraph">
                  This is a fan-made pokémon website created for the purpose of helping people make better teams, faster. It's difficult to calculate all of the damage modifiers based on the types of pokemon in your team, so I wanted to make a tool that can quickly show you where your teams strengths and weaknesses lie.
               </p>
               <p className="about-paragraph">
                  Currently this is the first iteration of the site and I'm planning on adding more and better functionality in the future. Things such as, displaying the abilities for each pokemon and what they do, being able to filter with dual types and by other parameters in the pokedex, and displaying more data on the effectiveness of your team.
               </p>
               <p className="about-paragraph">
                  If you have any questions, requests, or have found an error in the site, you can contact me at contact@icecapmedia.com.
               </p>
               <p className="about-paragraph">
                  All of the data for the pokémon used in this website were provided by <a className="inline-link" href="https://pokeapi.co/">pokeapi.co</a>.
               </p>
            </div>

         </div>
         <Footer />
      </>
   );
}

export default About;