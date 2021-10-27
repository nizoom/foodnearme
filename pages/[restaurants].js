export async function getServerSideProps(context) {
    //context provides the location and cuisine types

    //extracting cuisines and coordinates from context.query object 
    const {cuisines, params: coordinates } = context.query 

    console.log(`${cuisines}`)
    const url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates[0]}%2C${coordinates[1]}&radius=1500&opennow&type=restaurant&keyword=${cuisines}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
    //-33.8670522%2C151.1957362
    //http://localhost:3000/restaurants?params=40.6679302&params=-73.982728&cuisines=American&cuisines=Chinese&cuisines=Italian

    const response = await fetch (url)
    const data = await response.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {restaurants: data.results, context:  coordinates},//{ restaurants : data.results }, // will be passed to the page component as props
    }
  }
  
 

const DisplayRestaurants = ({ restaurants, context }) => {
    console.log(context)
    
    return (
        <div>  
           <h1> Restaurants </h1>
            {
                restaurants.map(restaurant => (
                    <div key = {restaurant.place_id}>
                        <p> {restaurant.name}</p>

                    </div>
                ))
            } 
        </div>
    )
}

export default DisplayRestaurants;
