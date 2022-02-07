
let typeChart = {
   types: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
   ],
   'normal': [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
   'fire': [1, .5, 2, 1, .5, .5, 1, 1, 2, 1, 1, .5, 2, 1, 1, 1, .5, .5],
   'water': [1, .5, .5, 2, 2, .5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .5, 1],
   'electric': [1, 1, 1, .5, 1, 1, 1, 1, 2, .5, 1, 1, 1, 1, 1, 1, .5, 1],
   'grass': [1, 2, .5, .5, .5, 2, 1, 2, .5, 2, 1, 2, 1, 1, 1, 1, 1, 1],
   'ice': [1, 2, 1, 1, 1, .5, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
   'fighting': [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, .5, .5, 1, 1, .5, 1, 2],
   'poison': [1, 1, 1, 1, .5, 1, .5, .5, 2, 1, 2, .5, 1, 1, 1, 1, 1, .5],
   'ground': [1, 1, 2, 0, 2, 2, 1, .5, 1, 1, 1, 1, .5, 1, 1, 1, 1, 1],
   'flying': [1, 1, 1, 2, .5, 2, .5, 1, 0, 1, 1, .5, 2, 1, 1, 1, 1, 1],
   'psychic': [1, 1, 1, 1, 1, 1, .5, 1, 1, 1, .5, 2, 1, 2, 1, 2, 1, 1],
   'bug': [1, 2, 1, 1, .5, 1, .5, 1, .5, 2, 1, 1, 2, 1, 1, 1, 1, 1],
   'rock': [.5, .5, 2, 1, 2, 1, 2, .5, 2, .5, 1, 1, 1, 1, 1, 1, 2, 1],
   'ghost': [0, 1, 1, 1, 1, 1, 0, .5, 1, 1, 1, .5, 1, 2, 1, 2, 1, 1],
   'dragon': [1, .5, .5, .5, .5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2],
   'dark': [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 2, 1, .5, 1, .5, 1, 2],
   'steel': [.5, 2, 1, 1, .5, .5, 2, 0, 2, .5, .5, .5, .5, 1, .5, 1, .5, .5],
   'fairy': [1, 1, 1, 1, 1, 1, .5, 2, 1, 1, 1, .5, 1, 1, 0, .5, 2, 1]
}

const dualTypes = {

}

for (let primary in typeChart) {

   if (primary !== 'types') {

      for (let secondary in typeChart) {
         if (primary !== secondary && secondary !== 'types') {
            const newTypeDmgArray = [];

            typeChart[primary].forEach((typeDmg, index) => {
               const newTypeDmg = typeDmg * typeChart[secondary][index];
               newTypeDmgArray.push(newTypeDmg);

            });

            dualTypes[`${primary}-${secondary}`] = newTypeDmgArray;

         }
      }
   }
}

typeChart = Object.assign(typeChart, dualTypes);

export function findStrengths(teamTypes) {

   const typeCount = { normal: 0, fire: 0, water: 0, grass: 0, electric: 0, ice: 0, fighting: 0, poison: 0, ground: 0, flying: 0, psychic: 0, bug: 0, rock: 0, ghost: 0, dark: 0, dragon: 0, steel: 0, fairy: 0
   }

   const seperatedTypes = [];

   teamTypes.forEach((type) => {
      const tempArray = [];
      tempArray.push(type.split('-'));

      tempArray.forEach((item) => {
         item.forEach((innerItem) => {
            seperatedTypes.push(innerItem);
         });
      });
   });

   seperatedTypes.forEach((teamType) => {
      const typeIndex = typeChart.types.findIndex((type) => type === teamType);

      for (let key in typeChart) {
         if (!key.includes('-') && key !== 'types') {
            if (typeChart[key][typeIndex] === 2) {
               typeCount[key] += 1;
            }
         }
      }
   });

   return typeCount;
}


export function findWeaknesses(teamTypes) {

   const typeCount = {
      normal: 0,
      fire: 0,
      water: 0,
      grass: 0,
      electric: 0,
      ice: 0,
      fighting: 0,
      poison: 0,
      ground: 0,
      flying: 0,
      psychic: 0,
      bug: 0,
      rock: 0,
      ghost: 0,
      dark: 0,
      dragon: 0,
      steel: 0,
      fairy: 0
   }

   teamTypes.forEach((memberType) => {

      typeChart[memberType].forEach((typeDamage, index) => {
         if (typeDamage === 2) {
            const effectiveType = typeChart.types[index];
            typeCount[effectiveType] += 1;
         } else if (typeDamage === 4) {
            const effectiveType = typeChart.types[index];
            typeCount[effectiveType] += 2;
         }
      });

   });

   return typeCount;
}

