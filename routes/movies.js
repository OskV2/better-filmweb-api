const express = require('express');
const router = express.Router();
const getMovies = require('../fetch/scrape');

//  Watchtime of all rated movies and series
router.get('/watchtime/rated', async (req, res) => {
  try {
    const titles = await getMovies();
    res.json(titles);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape movie titles' });
  }
});

//  Watchtime of rated movies
router.get('/watchtime/rated/movies', )

//  Watchtime of rated series
router.get('/watchtime/rated/series', )

//  Watchtime of all movies and series added to "want2see" tab
router.get('/watchtime/want2see', )

//  Watchtime of all movies added to "want2see" tab
router.get('/watchtime/want2see/movies', )

//  Watchtime of all series added to "want2see" tab
router.get('/watchtime/want2see/series', )

//  Watchtime of specific series
router.get('/watchtime/series')

module.exports = router;