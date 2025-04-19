const axios = require('axios');

// * About this functions:
// @param cookie - accepts session cookie as a parameter, param is passed in client side code 
// @param mediaCategory - vote / want2see - determines if endpoint should get number of rated items or want2see items
// @param mediaType - film / serial - determines the endpoint that should get number of movies or series in previosly set category
// * - returns number of movies/series that are rated / added to want2see list by user
// ! This function works only for logged user - if user is not logged info filmweb.pl website, there wont be valid cookie, which means that request will not work properly

const getNumberOfItems = async (cookie, mediaCategory, mediaType) => {
  const ENDPOINT = `https://www.filmweb.pl/api/v1/logged/${mediaCategory}/${mediaType}/count`

  try {
    const response = await axios.get(ENDPOINT, {
      headers: {
        Cookie: cookie
      }
    });
    const number = response.data
    return number
  } catch (error) {
    console.error('Failed in request details');
  }
}

module.exports = getNumberOfItems