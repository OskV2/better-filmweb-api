const getMovieDetails = require('./movie-details');
const { getSeriesData, getNumberOfEpisodes } = require('./numbers-for-series')

// * About this function:
// @param IDs - accepts [] of IDs of movies
// * - returns (int) watchtime in minutes

// ! This function works only for logged user - if user is not logged info filmweb.pl website, there wont be valid cookie, which means that request will not work properly

async function getMoviesWatchtime(IDs) {
  let watchtime = 0;
  try {
    for (const id in IDs) {
      const response = await getMovieDetails(id);
      const data = response.duration;
      if (data) watchtime = watchtime + data;
    }
  } catch (error) {
    console.error('Failed in movies watchtime');
  }
  return watchtime;
}

async function getSeriesWatchtime(IDs) {
    try {
      let watchtime = 0;
      let numberOfEpisodes = 0;
      let numberOfEpisodesInSeason = 0;
      let allSeriesData = []
      
      for (const id of IDs) {
        const series = {
          seriesID: id,
          numberOfEpisodes: 0,
          avgEpisodeDuration: 0
        }
  
        const seriesData = await getSeriesData(id)
        const numberOfSeasons = seriesData.seasons  
        
        //  Sometimes when series has only one season, property .seasons doesnt exist in object
        //  When property .seasons doesnt exist i can just get number of episodes from the object
        if (numberOfSeasons) {  
          for (i = 1; i <= numberOfSeasons; i++) {
            numberOfEpisodesInSeason = await getNumberOfEpisodes(id, numberOfSeasons)
            numberOfEpisodes += numberOfEpisodesInSeason
          }
        } else {
          numberOfEpisodes = seriesNumbers.episodes
        }

        const seriesDetails = await getMovieDetails(id)
        const avgEpisodeDuration = seriesDetails.duration
  
        series.numberOfEpisodes = numberOfEpisodes
        series.avgEpisodeDuration = avgEpisodeDuration
        allSeriesData.push(series)
      }

      for(const series of allSeriesData) {
        watchtime = watchtime + (series.numberOfEpisodes * series.avgEpisodeDuration)
      }
      return watchtime
    } catch (error) {
      console.error('Failed in series watchtime')
    }
}

const getOverallWatchtime = async (movieIDS, seriesIDs) => {
  const moviesWatchtime = await getMoviesWatchtime(movieIDS);
  const seriesWatchtime = await getSeriesWatchtime(seriesIDs);
  return moviesWatchtime + seriesWatchtime
}

module.exports = {
  getMoviesWatchtime,
  getSeriesWatchtime,
  getOverallWatchtime
};