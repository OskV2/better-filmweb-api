const axios = require('axios');

//  * This function returns a 'numbers' for a series with passed ID
//  * I can get for example number of seasons from this object
//  * Filmweb is so fucked, that number of episodes returned in this object is correct only, when there is 1 season
const getNumberOfSeasons = async (id) => {
  try {
    //  FIlmweb so spaghetti-coded that numbers for series has 'film' in endpoint route 
    //  🤡
    const response = await axios.get(`https://www.filmweb.pl/api/v1/film/${id}/counters`)
    console.log('Log from inside of a function getNumberOfSeasons')
    data = response.data
    return data
  } catch (error) {
    console.error('Failed in number of seasons')
  }
}

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
  getNumberOfSeasons,
  getNumberOfEpisodes
};