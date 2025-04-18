const getMovieDetails = require('./movie-details');
const {getNumberOfSeasons, getNumberOfEpisodes} = require('./numbers-for-series')

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

//  1. Accept [] of IDs as a parameter
//  Every ID is a single series
//  2. For every series check number of seasons
//  3. For every season check number of episodes
//  4. Create [] of {}, where {} will look like this: {seriesID, numberOfEpisodes, avgEpisodeDuration}
//  5. Do calculations to get watchtime
async function getSeriesWatchtime(IDs) {
    try {
      let allSeriesData = []
      let watchtime = 0;
      for (const id of IDs) {
        const series = {
          seriesID: id,
          numberOfEpisodes: 0,
          avgEpisodeDuration: 0
        }
        let numberOfEpisodes = 0;
  
        const seriesNumbers = await getNumberOfSeasons(id)
        const numberOfSeasons = seriesNumbers.seasons
        let numberOfEpisodesInSeason = 0;
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