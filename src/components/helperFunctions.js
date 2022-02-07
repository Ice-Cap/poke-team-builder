

export async function getPokemon(pokemon) {
   try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      let data = await res.json();
      let dataStr = JSON.stringify(data);
      localStorage.setItem(`${pokemon}Data`, dataStr);
      return data;
   } catch (err) {
      console.log(`HELPER FUNCTIONS: ${err}`);
   }
}


export function formatText(text) {
   text = text[0].toUpperCase() + text.slice(1, text.length);

   if (text === 'Hp') {
      text = text.toUpperCase();

   } else if (text.includes('-')) {
      text = text.split('-');
      let secondText = text[1];
      secondText = secondText[0].toUpperCase() + secondText.slice(1);

      text = text[0].concat('-', secondText);
   }

   return text;
}


export const localStorageSpace = function () {
   let allStrings = '';
   for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
         allStrings += window.localStorage[key];
      }
   }
   return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) + ' KB' : 'Empty (0 KB)';
}


export function getTypeColor(typeName) {
   let color;
   switch (typeName) {
      case 'electric':
         color = '#f4d134';
         break;
      case 'poison':
         color = '#9b4593';
         break;
      case 'steel':
         color = '#bbb7d1';
         break;
      case 'ground':
         color = '#dfc565';
         break;
      case 'fighting':
         color = '#c42d28';
         break;
      case 'fire':
         color = '#ec7f30';
         break;
      case 'normal':
         color = '#aba97e';
         break;
      case 'water':
         color = '#6690ee';
         break;
      case 'grass':
         color = '#7cc554';
         break;
      case 'ice':
         color = '#95d7d9';
         break;
      case 'flying':
         color = '#a791e2';
         break;
      case 'psychic':
         color = '#f75788';
         break;
      case 'bug':
         color = '#a7b820';
         break;
      case 'rock':
         color = '#b3a238';
         break;
      case 'ghost':
         color = '#6d5a93';
         break;
      case 'dark':
         color = '#70574b';
         break;
      case 'dragon':
         color = '#6f39f2';
         break;
      case 'fairy':
         color = '#dea5dd';
         break;
      default:
         console.log('something went wrong in getTypeColor');
   }
   return color;
}


export function typeCounter(team) {

   let normal = 0;
   let fire = 0;
   let water = 0;
   let grass = 0;
   let electric = 0;
   let ice = 0;
   let fighting = 0;
   let poison = 0;
   let ground = 0;
   let flying = 0;
   let psychic = 0;
   let bug = 0;
   let rock = 0;
   let ghost = 0;
   let dark = 0;
   let dragon = 0;
   let steel = 0;
   let fairy = 0;

   team.forEach((pokemon) => {
      
      pokemon.types.forEach((type) => {

         switch (type.type.name) {
            case 'electric':
               electric += 1;
               break;
            case 'poison':
               poison += 1;
               break;
            case 'steel':
               steel += 1;
               break;
            case 'ground':
               ground += 1;
               break;
            case 'fighting':
               fighting += 1;
               break;
            case 'fire':
               fire += 1;
               break;
            case 'normal':
               normal += 1;
               break;
            case 'water':
               water += 1;
               break;
            case 'grass':
               grass += 1;
               break;
            case 'ice':
               ice += 1;
               break;
            case 'flying':
               flying += 1;
               break;
            case 'psychic':
               psychic += 1;
               break;
            case 'bug':
               bug += 1;
               break;
            case 'rock':
               rock += 1;
               break;
            case 'ghost':
               ghost += 1;
               break;
            case 'dark':
               dark += 1;
               break;
            case 'dragon':
               dragon += 1;
               break;
            case 'fairy':
               fairy += 1;
               break;
            default:
               console.log('something went wrong with types');
         }
      });
   });

   const typeCount = {
      normal: normal,
      fire: fire,
      water: water,
      grass: grass,
      electric: electric,
      ice: ice,
      fighting: fighting,
      poison: poison,
      ground: ground,
      flying: flying,
      psychic: psychic,
      bug: bug,
      rock: rock,
      ghost: ghost,
      dark: dark,
      dragon: dragon,
      steel: steel,
      fairy: fairy
   }

   return typeCount;
}


// export function weaknessCalculator(teamTypes) {

//    const typeCount = {
//       normal: 0,
//       fire: 0,
//       water: 0,
//       grass: 0,
//       electric: 0,
//       ice: 0,
//       fighting: 0,
//       poison: 0,
//       ground: 0,
//       flying: 0,
//       psychic: 0,
//       bug: 0,
//       rock: 0,
//       ghost: 0,
//       dark: 0,
//       dragon: 0,
//       steel: 0,
//       fairy: 0
//    }
   

//    const types = {
//       normal: {
//          weaknesses: ['fighting'],
//          strengths: [],
//          noEffectDef: ['ghost'],
//          halfEffectDef: [],
//          noEffectAtk: ['ghost'],
//          halfEffectAtk: ['rock', 'steel']
//       },
//       fire: {
//          weaknesses: ['water', 'ground', 'rock'],
//          strengths: ['grass', 'ice', 'bug', 'steel'],
//          noEffectDef: [],
//          halfEffectDef: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fire', 'water', 'rock', 'dragon']
//       },
//       water: {
//          weaknesses: ['electric', 'grass'],
//          strengths: ['fire', 'ground', 'rock'],
//          noEffectDef: [],
//          halfEffectDef: ['fire', 'water', 'ice', 'steel'],
//          noEffectAtk: [],
//          halfEffectAtk: ['water', 'grass', 'dragon']
//       },
//       electric: {
//          weaknesses: ['ground'],
//          strengths: ['water', 'flying'],
//          noEffectDef: [],
//          halfEffectDef: ['electric', 'flying', 'steel'],
//          noEffectAtk: ['ground'],
//          halfEffectAtk: ['electric', 'grass', 'dragon']
//       },
//       grass: {
//          weaknesses: ['fire', 'ice', 'poison', 'flying', 'bug'],
//          strengths: ['water', 'ground', 'rock'],
//          noEffectDef: [],
//          halfEffectDef: ['water', 'electric', 'grass', 'ground'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel']
//       },
//       ice: {
//          weaknesses: ['fire', 'fighting', 'rock', 'steel'],
//          strengths: ['grass', 'ground', 'flying', 'dragon'],
//          noEffectDef: [],
//          halfEffectDef: ['ice'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fire', 'water', 'ice', 'steel']
//       },
//       fighting: {
//          weaknesses: ['flying', 'psychic', 'fairy'],
//          strengths: ['normal', 'ice', 'rock', 'dark', 'steel'],
//          noEffectDef: [],
//          halfEffectDef: ['bug', 'rock', 'dark'],
//          noEffectAtk: ['ghost'],
//          halfEffectAtk: ['poison', 'flying', 'psychic', 'bug', 'fairy']
//       },
//       poison: {
//          weaknesses: ['ground', 'psychic'],
//          strengths: ['grass', 'fairy'],
//          noEffectDef: [],
//          halfEffectDef: ['grass', 'fighting', 'poison', 'bug'],
//          noEffectAtk: ['steel'],
//          halfEffectAtk: ['poison', 'ground', 'rock', 'ghost']
//       },
//       ground: {
//          weaknesses: ['water', 'grass', 'ice'],
//          strengths: ['fire', 'electric', 'poison', 'rock', 'steel'],
//          noEffectDef: ['electric'],
//          halfEffectDef: ['poison', 'rock'],
//          noEffectAtk: ['flying'],
//          halfEffectAtk: ['grass', 'bug']
//       },
//       flying: {
//          weaknesses: ['electric', 'ice', 'rock'],
//          strengths: ['grass', 'fighting', 'bug'],
//          noEffectDef: ['ground'],
//          halfEffectDef: ['fighting', 'grass', 'bug'],
//          noEffectAtk: [],
//          halfEffectAtk: ['electric', 'rock', 'steel']
//       },
//       psychic: {
//          weaknesses: ['bug', 'ghost', 'dark'],
//          strengths: ['fighting', 'poison'],
//          noEffectDef: [],
//          halfEffectDef: ['fighting', 'psychic'],
//          noEffectAtk: ['dark'],
//          halfEffectAtk: ['psychic', 'steel']
//       },
//       bug: {
//          weaknesses: ['fire', 'flying', 'rock'],
//          strengths: ['grass', 'psychic', 'dark'],
//          noEffectDef: [],
//          halfEffectDef: ['grass', 'fighting', 'ground'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy']
//       },
//       rock: {
//          weaknesses: ['water', 'grass', 'fighting', 'ground', 'steel'],
//          strengths: ['fire', 'ice', 'flying', 'bug'],
//          noEffectDef: [],
//          halfEffectDef: ['normal', 'fire', 'poison', 'flying'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fighting', 'ground', 'steel']
//       },
//       ghost: {
//          weaknesses: ['ghost', 'dark'],
//          strengths: ['psychic', 'ghost'],
//          noEffectDef: ['normal', 'fighting'],
//          halfEffectDef: ['poison', 'bug'],
//          noEffectAtk: ['normal'],
//          halfEffectAtk: ['dark']
//       },
//       dragon: {
//          weaknesses: ['ice', 'dragon', 'fairy'],
//          strengths: ['dragon'],
//          noEffectDef: [],
//          halfEffectDef: ['fire', 'water', 'electric', 'grass'],
//          noEffectAtk: ['fairy'],
//          halfEffectAtk: ['steel']
//       },
//       dark: {
//          weaknesses: ['fighting', 'bug', 'fairy'],
//          strengths: ['psychic', 'ghost'],
//          noEffectDef: ['psychic'],
//          halfEffectDef: ['ghost', 'dark'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fighting', 'dark', 'fairy']
//       },
//       steel: {
//          weaknesses: ['fire', 'fighting', 'ground'],
//          strengths: ['ice', 'rock', 'fairy'],
//          noEffectDef: ['poison'],
//          halfEffectDef: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fire', 'water', 'electric', 'steel']
//       },
//       fairy: {
//          weaknesses: ['poison', 'steel'],
//          strengths: ['fighting', 'dragon', 'dark'],
//          noEffectDef: ['dragon'],
//          halfEffectDef: ['fighting', 'bug', 'dark'],
//          noEffectAtk: [],
//          halfEffectAtk: ['fire', 'poison', 'steel']
//       },
//    }

//    const team = [];

//    for (let type in teamTypes) {
//       for (let i = 0; i < teamTypes[type]; i++) {
//          team.push(type);
//       }
//    }

//    console.log(team);

//    team.forEach((member) => {
//       types[member].weaknesses.forEach((weakness) => {
//          typeCount[weakness] += 1;
//       });
//    });

//    return typeCount;
// }