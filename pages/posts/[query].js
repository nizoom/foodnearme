const Posts = ({results : query}) => {
    return (
        <div>
            <h1> getServerSideProps </h1>

            {query.results.map((q, index) => (
                <div key = {index}> 
                   <h3> {q.place_id} - {q.name} </h3> 
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context){
    
    // context provides the params for the query
    
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=${"Thai"}&key=${apiKey}`
    
    //const url = 'https://jsonplaceholder.typicode.com/todos/'
    const res =  await fetch (url)
    const json = await res.json();
    const posts = json

    return {
        props: {
            results: posts, 
        }
    }
}

export default Posts;