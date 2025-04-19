const axios = require('axios');

//  * This function returns {} with info about the series with the specified id
//  * I can get for example number of seasons, number of awards or number of nominations from this object
//  * Filmweb is so fucked, that number of episodes returned in this object is correct only, when there is 1 season in series
const getSeriesData = async (id) => {
  try {
    //  FIlmweb so spaghetti-coded that {} for series has 'film' in endpoint 
    //  🤡
    const response = await axios.get(`https://www.filmweb.pl/api/v1/film/${id}/counters`)
    data = response.data
    return data
  } catch (error) {
    console.error('Failed in number of seasons')
  }
}

//  * This function returns the number of episodes for a specific season in a series with the given id
const getNumberOfEpisodes = async (id, season) => {
  try {
    const response = await axios.get(`https://www.filmweb.pl/api/v1/serial/${id}/season/${season}/episodes?loadDates=false`)
    data = response.data
    return data.length
  } catch (error) {
    console.error('Failed in number of episodes')
  }
}

module.exports = {
  getSeriesData,
  getNumberOfEpisodes
};