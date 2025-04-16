const express = require('express');
const router = express.Router();
const getListOfIDs = require('../utils/list-of-ids');
const getMoviesWatchtime = require('../utils/watchtime')

const SESSION_COOKIE = 'didomi_token=eyJ1c2VyX2lkIjoiMTkzMzY5NDQtNmFiOS02MDdiLTlmN2QtMDgyYThlYWMwZGM2IiwiY3JlYXRlZCI6IjIwMjQtMTEtMTZUMjA6MDU6MDcuMzcxWiIsInVwZGF0ZWQiOiIyMDI0LTExLTE2VDIwOjA1OjA4LjUxNloiLCJ2ZW5kb3JzIjp7ImVuYWJsZWQiOlsiZ29vZ2xlIiwiYzpkaWRvbWkiLCJjOm1pY3Jvc29mdC1hbmFseXRpY3MiLCJjOmVmaWdlbmNlLWl3OHdUeEdUIiwiYzpwZXJmb3JtYW5jLWhDRXhSeW1WIiwiYzp2YWx1ZW1lZGktTnpSUkVoZEwiLCJjOndhdmVtYWtlci13QnRUR3phWiIsImM6b21kc3B6by1DelB4NnRQViIsImM6YXJ0ZWdlbmNlLVpoamtCSEdtIiwiYzpnb29nbGVhbmEtNFRYbkppZ1IiLCJjOm1hdG9tby1OM2drMzdhVCIsImM6YXdzLWNsb3VkZnJvbnQiLCJjOndlYmFua2lldGEtRnROa2JSQkciXX0sInB1cnBvc2VzIjp7ImVuYWJsZWQiOlsiZGV2aWNlX2NoYXJhY3RlcmlzdGljcyIsImdlb2xvY2F0aW9uX2RhdGEiXX0sInZlbmRvcnNfbGkiOnsiZW5hYmxlZCI6WyJnb29nbGUiLCJjOndlYmFua2lldGEtRnROa2JSQkciXX0sInZlcnNpb24iOjIsImFjIjoiUWItQWVBRVlBTElBYkFCS2dIbUFlcUJFa0NXSUV0UUxVZ2xyQk5hQ25VR2JoQnZ3LlFiLUFlQUVZQUxJQWJBQktnSG1BZXFCRWtDV0lFdFFMVWdsckJOYUNuVUdiaEJ2dyJ9; euconsent-v2=CQILsUAQILsUAAHABBENBPFsAP_gAEPgAB5YKjNX_G__bWlr8X73aftkeY1P9_h77sQxBhfJE-4FzLvW_JwXx2ExNA36tqIKmRIAu3TBIQNlGJDURVCgaogVryDMaEiUoTNKJ6BkiFMRM2dYCF5vm4tj-QCY5vr991dx2B-t7dr83dzyy41Hn3a5_2a0WJCdA5-tDfv9bROb-9IOd_x8v4v8_F_pE2_eT1l_tWvp7D9-cts7_XW89_fff_9Pn_-uB_-_3_vQVGAJMNCogDLAkJCDQMIIEAKgrCAigQBAAAkDRAQAmDAp2BgEusJEAIAUAAwQAgABBkACAAACABCIAIACgQAAQCBQABAAQDAQAEDAACACwEAgABAdAxTAggECwASMyIhTAhCASCAlsqEEgCBBXCEIs8AiAREwUAAAAABWAAICwWBxJICVCQQJcQbQAAEACAQQAFCCTkwABAGbLUHgwbRlaYBg-YJENMAyAIggAAAA.f_wACHwAAAAA; fupi=87; __gfp_64b=KWBntFOZJOUxbAjbyNAQ8GRDmQosKPxxoXP71jmKgpj.n7|1731787508|2; _clck=n3gcyv%7C2%7Cfqx%7C0%7C1781; g_state={"i_l":0}; _fwuser_logged=107; __eoi=ID=737006fe445f97ae:T=1731787509:RT=1735910007:S=AA-AfjZSAM5V_GVn2y_hv79RtiFu; _nhsmid=1; _artuser_prm=d0thMU1MNFRxLUk5ZnBJTElnZUY2Zz09OnBubFpTL0lSTVJxTG9wemlDTzBkQUE9PQ; ws_inters2s2d=1744841918752-0; JWT=eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6W10sImNzcmYiOiJ6WUJ0aXZKZUFGdVRobEMxVHhtT1VRPT0iLCJ1c2VySWQiOjYxNzI4NjksInN1YiI6Ik9za1YyIiwiZXhwIjoxNzQ0ODQzNzY0LCJpYXQiOjE3NDQ4NDI4NjR9.aCqPFGCJ-xvPvV_E2kly4uNu1dEMsDdFXyNZTG_RoT0; XSRF-TOKEN=zYBtivJeAFuThlC1TxmOUQ==; startquestion-session=%7B%22expirationDate%22%3A1744846711169%2C%22data%22%3A%7B%22pageTime%22%3A1590%2C%22numberOfVisitedPages%22%3A6%7D%7D'
const CATEGORY_RATED = 'vote'
const CATEGORY_WANT2SEE = 'want2see'
const TYPE_MOVIE = 'film'
const TYPE_SERIES = 'serial'

//  Watchtime of all rated movies and series combined
// router.get('/watchtime/rated', )

//  Watchtime of rated movies
router.get('/watchtime/rated/movies', async (req, res) => {
  try {
    const IDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_RATED, TYPE_MOVIE);
    const watchtime = await getMoviesWatchtime(IDs)
    console.log(`Watchtime: ${watchtime}`)
    console.log(watchtime)
    res.json(watchtime);
  } catch (error) {
    console.error('Failed in routes');
    res.status(500).json({ error: 'Failed to get data' });
  }
});

// //  Watchtime of rated series
// router.get('/watchtime/rated/series', )

// //  Watchtime of all movies and series added to "want2see" tab
// router.get('/watchtime/want2see', )

// //  Watchtime of all movies added to "want2see" tab
// router.get('/watchtime/want2see/movies', )

// //  Watchtime of all series added to "want2see" tab
// router.get('/watchtime/want2see/series', )

// //  Watchtime of specific series
// router.get('/watchtime/series')

module.exports = router;