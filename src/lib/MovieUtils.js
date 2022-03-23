
const apiKey = 'feb6f53c6dc7855bacc603a85aee9b8d';
const apiUrl = 'https://api.themoviedb.org/3';
export const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
export const movieDetailsBaseUrl = 'https://api.themoviedb.org/3/movie'
const queryMenuMovie = 'movie';
const queryMenuSearch = 'search';
const urlSeparator = '/';

//https://api.themoviedb.org/3/movie/upcoming?api_key=feb6f53c6dc7855bacc603a85aee9b8d&page=1

 let getMovies  = async (queryType) => {
    console.log ("gettting movies list");

    let query = apiUrl + urlSeparator +
                queryMenuMovie + urlSeparator + //movie
                queryType + '?' +      //upcoming
                'api_key=' + apiKey +
                '&page=1';
    //params  //any additional params for query;
    console.log ("REST requesting for: " + query);
    let result = await fetch (query);
    return result.json();
}

let getMovieDetails = async (id) => {
    console.log ("Get details for movie: " + id);
    let query = movieDetailsBaseUrl + urlSeparator +
                id + '?' +      //movie id
                'api_key=' + apiKey;
    console.log ("REST requesting for: " + query);
    let result = await fetch (query);
    return result.json();
}

let getSimilarMovies = async (id) => {
    let query = movieDetailsBaseUrl + urlSeparator + 
                id + urlSeparator +      //movie id
                "similar" + '?' +
                'api_key=' + apiKey;
    console.log ("REST requesting for: " + query);
    let result = await fetch (query);
    return result.json();
}

export {getMovies}
export {getMovieDetails}
export {getSimilarMovies}