const axios = require('axios');
const getRequestDetails = require('./request-details')

// * About this function:
// @param cookie - accepts session cookie as a parameter, param is passed in client side code
// * - returns [] of movies IDs, that are rated/added to want2see by user

// ! This function works only for logged user - if user is not logged info filmweb.pl website, there wont be valid cookie, which means that request will not work properly
// ! This is limitation of Filmweb, as there is no endpoint, that returns all rated movies for a non-logged-in user

async function getListOfIDs(cookie, mediaCategory, mediaType) {
  const requestDetails = await getRequestDetails(cookie, mediaCategory, mediaType)

  //  Divide number of items on list by 100, because there are 100 items in one "page"
  //  Then round to bigger number
  const numberOfPages = Math.ceil(requestDetails.number / 100)

  let IDs = []

  for (let i = 1; i <= numberOfPages; i++) {
    // @param mediaCategory - vote / want2see - determines if endpoint should get number of rated items or want2see items
    // @param mediaType - film / serial - determines the endpoint that should get number of movies or series in previosly set category
    // @param pageNumber - variable called 'numberOfPages'
    
    let ENDPOINT = ''
    if (requestDetails.mediaCategory === 'vote') ENDPOINT = `https://www.filmweb.pl/api/v1/logged/${requestDetails.mediaCategory}/title/${requestDetails.mediaType}?page=${i}`
    if (requestDetails.mediaCategory === 'want2see') ENDPOINT= `https://www.filmweb.pl/api/v1/logged/${requestDetails.mediaCategory}/${requestDetails.mediaType}?page=${i}`

    try {
      const response = await axios.get(ENDPOINT, {
        headers: {
          Cookie: requestDetails.cookie
        }
      });
      const data = response.data;
      for (const movie of data) {
        IDs.push(movie.entity)
      }
    } catch (error) {
      console.error('Failed in list of IDs');
    }
  }
  return IDs
}

module.exports = getListOfIDs;