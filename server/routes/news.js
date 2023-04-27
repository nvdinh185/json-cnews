const express = require('express');
const router = express.Router();

const newsController = require('../controllers/NewsController');
const middleware = require('../middleware/Middleware');

router.get('/', newsController.getListNews);
router.get('/newsbycat', newsController.getListNewsByCat);
router.get('/newsbyid', newsController.getNewsById);

router.post('/add', middleware.uploadFile, newsController.postAddNews);

module.exports = router;
