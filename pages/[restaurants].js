export async function getServerSideProps(context) {
    //context provides the location and cuisine types
    //extracting cuisines and coordinates from context.query object 
  
    console.log(context.query)
    const {foodtypes, lat, lng} = context.query

    const nearbyPlacesUrl= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=restaurant&keyword=${foodtypes}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
 

    const response = await fetch (nearbyPlacesUrl)
    const data = await response.json()

    if (!data) {
      return {
        notFound: true,
      }
    }


    //places nearby api gets us the place id but not much contactable info for the user

    //1. get all place ids in an array 

    const placeIDs = data.results.map(restaurant => {
      return restaurant.place_id;
    })

    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`

    function addIdToUrl(id){
      return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=AIzaSyCjYaPndbfufJc-FoD7jZhA_FWa85FP2QA`
    }
    //so the place api takes the id and returns way more useful info
   
    //2. run another fetch for the places api 

    const functionThatReturnsAPromise = item => {
      return Promise.resolve(item);
   }

    const doSomethingAsync = async id => {
      const correctURL = addIdToUrl(id);
      const response = await fetch(correctURL);
      const data = await response.json();
      //console.log(data)
      return functionThatReturnsAPromise(data)
    }

    const getData = async () => {
      return Promise.all(placeIDs.map(id => doSomethingAsync(id)))
    }
  

    async function filterPlaceDetails (){
      const data = await getData();

      
      //console.log(data)
      const filteredData = data.map(element => {
        console.log('NEWQUERY')
        console.log(element.result.price_level)
          let restaurantObj = {}
          // const neededProperties = [place_id, name, address, phoneNum, priceLvl,rating, website]
          //sometimes these properties can return as undefined from the API 
          restaurantObj.place_id = determinePropertyAvailability(element.result.place_id, 'id');
          restaurantObj.name = determinePropertyAvailability(element.result.name, 'name');
          restaurantObj.address = determinePropertyAvailability(element.result.formatted_address, 'address');
          restaurantObj.phoneNum = determinePropertyAvailability(element.result.international_phone_number, 'phone number');
          restaurantObj.priceLvl = determinePropertyAvailability(element.result.price_level, 'price level');
          restaurantObj.rating = determinePropertyAvailability(element.result.rating, 'customer rating');
          restaurantObj.website = determinePropertyAvailability(element.result.website, 'business website');
          
          return restaurantObj;
      }) 

      function determinePropertyAvailability(property, type){
        return (property === undefined ? `${type} is not available` : property)
 
      }

      return filteredData;

  }

   const placeDetailsArray = await filterPlaceDetails();
   //console.log(placeDetailsArray)
    
    return {
      props: {restaurants : placeDetailsArray} 
    }

    
  }

 

const DisplayRestaurants = ({ restaurants }) => {
    console.log(restaurants)
    
    return (
    
        <div>  
           <h1> Restaurants </h1>
            {
                restaurants.map(restaurant => (
                  
                    <div key = {restaurant.place_id}>
                        <p> {restaurant.name}, {restaurant.rating} ⭐ </p>
                        <p> {restaurant.address_components}</p>
                        <p> Price Level: {restaurant.priceLvl}</p>
                        <p> {restaurant.address} </p>
                        <p> Visit: {restaurant.website} </p>

                    </div>
                ))
            } 
        </div>
    )
}

export default DisplayRestaurants;
