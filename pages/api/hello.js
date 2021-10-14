// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log('api called')
  // const url= 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCjYaPndbfufJc-FoD7jZhA_FWa85FP2QA'
  
  // async function callAPI(){
  //   console.log("getting results")
  //   const result = await fetch(url, {
  //     mode: 'cors' ,
  //     credentials: "include"
  // })
  //     .then(function(response){
  //       console.log(response,json())
  //         return response.json()  })
    
  //     .catch(error => console.log(error))
  //    // return data;
    
  //   return result;
  // }
 
  //callAPI();

  res.status(200).json({ name: "API Route" })
  // res.send("Hello world API")

}   
 

