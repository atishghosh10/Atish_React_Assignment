import axios from 'axios';
import IMovies from '../modules/IMovies';


const options = {
    method: 'GET',
    url: 'https://mdblist.p.rapidapi.com/',
    params: {s: 'jaws'},
    headers: {
      'X-RapidAPI-Key': '4b8326e462mshfe242121b9ee29ap1a5d50jsn5deb92662334',
      'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
    }
  };
const getmovies = async (category: string) => {
    // return await axios.get<IMovies[]>(`${process.env.REACT_APP_API_BASE_URL}/${category}`)
    return await axios.request(options)
        .then(response => response.data)
};

const getmoviesByTitle = async (title: string, category: string) => {
    return await axios.get<IMovies[]>(`${process.env.REACT_APP_API_BASE_URL}/${category}?title=${title}`)
        .then(response => response.data)
};

const getmoviesByPoster = async (poster: string, category: string) => {
    return await axios.get<IMovies>(`${process.env.REACT_APP_API_BASE_URL}/${category}?poster=${poster}`)
        .then(response => response.data)
};

const getmoviesById = async (id: string, category: string) => {
    return await axios.get<IMovies>(`${process.env.REACT_APP_API_BASE_URL}/${category}/${id}`)
        .then(response => response.data)
};

const saveFavourite = async (title: string, category: string) => {
    const data = await getmoviesByTitle(title, category)
    const movie = data[0]
    const { actors, averageRating, contentRating, duration, genres, imdbRating, originalTitle,
        poster, posterurl, ratings, releaseDate, storyline, year } = movie as IMovies
    let movieDetails = {
        actors, averageRating, contentRating, duration, genres, imdbRating, originalTitle,
        poster, posterurl, ratings, releaseDate, storyline, title, year
    }
    return (
        await axios.post("http://localhost:3000/favourit", movieDetails, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.status)
    )
}


const deleteFavouriteById = async (id: string) => {
    return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/favourit/${id}`)
        .then(response => response.status)
}

export {
    getmovies,
    getmoviesByTitle,
    saveFavourite,
    deleteFavouriteById,
    getmoviesById,
    getmoviesByPoster,
};