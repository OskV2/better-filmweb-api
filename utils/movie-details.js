const axios = require('axios');

const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`https://www.filmweb.pl/api/v1/film/${id}/preview`, {
      headers: {
        'x-locale': 'pl_pl'
      }
    })
    data = response.data
    return data
  } catch (error) {
    console.error('Failed in movie details')
  }
}

module.exports = getMovieDetails;