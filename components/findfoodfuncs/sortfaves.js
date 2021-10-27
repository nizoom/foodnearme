export function sortFaves (favCuisinesObject){

   
    let faveCuisines = []
    for (const property in favCuisinesObject) {
      if(favCuisinesObject[property]){
        //console.log(property)
        faveCuisines.push(property)
      }
      //console.log(`${property}: ${object[property]}`);
    }
    return faveCuisines;

}
