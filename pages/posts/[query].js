const Posts = ({results : query, searchParams : keywords}) => {
    return (
        <div>
            <h1> Google Places Results for {keywords}</h1>

            {query.results.map((q, index) => (
                <div key = {index}> 
                   <h3> {q.vicinity} - {q.name} - {q.rating} stars </h3> 
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context){
    
    // context provides the params for the query
    console.log(context.params)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=${context.params.query}&key=${apiKey}`
    
    //const url = 'https://jsonplaceholder.typicode.com/todos/'
    const res =  await fetch (url)
    const json = await res.json();
    const posts = json

    return {
        props: {
            results: posts, 
            searchParams: context.params.query
        }
    }
}

export default Posts;