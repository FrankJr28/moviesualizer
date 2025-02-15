const API_KEY = 'f7587217'

export const searchMovies = async ({search}) => {
    if(search === '') return null

    try{
        const response = await fetch(`https://omdbapi.com/?apikey=f7587217&s=`+search)
        const json = await response.json()

        const movies = json.Search

        return movies?.map(movie=>({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
        }))
    }catch(e){
        throw new Error('Error searching movies')
    }
}