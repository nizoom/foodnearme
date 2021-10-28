export async function getServerSideProps(context) {
    //context provides the location and cuisine types
    //extracting cuisines and coordinates from context.query object 
  
    console.log('NEWQUERY')
    console.log(context.query)
    const {foodtypes, lat, lng} = context.query


    //const url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCjYaPndbfufJc-FoD7jZhA_FWa85FP2QA`

    const url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=restaurant&keyword=${foodtypes}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
 

    const response = await fetch (url)
    const data = await response.json()
    console.log(data)
    //console.log(data)

    //places nearby api gets us the place id but not much contactable info for the user

    //so the place api takes the id and returns way more useful info

    //1. get all place ids in an array 

    //2. run another fetch for the places api 
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {restaurants: data.results},//{ restaurants : data.results }, // will be passed to the page component as props
    }
  }
  
 

const DisplayRestaurants = ({ restaurants }) => {
    
    
    return (
    
        <div>  
           <h1> Restaurants </h1>
            {
                restaurants.map(restaurant => (
                  
                    <div key = {restaurant.place_id}>
                        <p> {restaurant.place_id}</p>
                        <p> {restaurant.name}, {restaurant.rating} ⭐ </p>
                        <p> {restaurant.address_components}</p>
                        <p> Price Level: {restaurant.price_level}</p>
                        <p> {restaurant.vicinity} </p>
                        <p> Visit: {restaurant.url} </p>

                    </div>
                ))
            } 
        </div>
    )
}

export default DisplayRestaurants;
