const getMovieDetails = require('./movie-details');

// * About this function:
// @param IDs - accepts [] of IDs of movies
// * - returns (int) watchtime in minutes

// ! This function works only for logged user - if user is not logged info filmweb.pl website, there wont be valid cookie, which means that request will not work properly

async function getMoviesWatchtime(IDs) {
  let watchtime = 0;

  console.log(IDs)

  try {
    for (const id in IDs) {
      const response = await getMovieDetails(id);
      const data = response.duration;

      // console.log(data)
      if (data) watchtime = watchtime + data;
    }
  } catch (error) {
    console.error('Failed in watchtime');
  }
  return watchtime;
}

module.exports = getMoviesWatchtime;
