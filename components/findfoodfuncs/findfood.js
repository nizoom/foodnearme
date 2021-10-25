export async function findFood(coords, key, keywords){
    console.log('finding places')
    console.log(arguments)
    //const url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY`
    const url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords[0]},${coords[1]}&radius=1500&type=restaurant&keyword=cruise&key=${key}`
    const response = await fetch(url, {
        mode : 'cors',
        headers : { 'Access-Control-Allow-Origin':'*' }
    })
        .then(
            response => response.json()
        );
}