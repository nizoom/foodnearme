export async function getServerSideProps(context) {
    //context provides the location and cuisine types

    //extracting cuisines and coordinates from context.query object 
    const {cuisines, params: coordinates } = context.query 
  

    const url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates[0]}%${coordinates[1]}&radius=1500&type=restaurant&keyword=thai&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
    //-33.8670522%2C151.1957362

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
