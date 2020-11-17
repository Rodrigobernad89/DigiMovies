var express = require('express');
var router = express.Router();
var path = require('path');
const validator = require("../middlewares/validator");
const moviesController = require('../controllers/moviesController');

router.get('/',moviesController.all);
router.get('/detail/:id', moviesController.detail);
router.get('/new', moviesController.last5);
router.get('/recommended', moviesController.recomend);
router.post('/search', moviesController.search);
router.get('/create', moviesController.create);
router.post('/create',validator.movieCreate,moviesController.store);
router.get('/generos/:id', moviesController.generos);
router.get('/actores/:id',moviesController.actores)
router.get('/edit/:id',moviesController.update);
router.put('/edit/:id',validator.movieCreate, moviesController.change);
router.delete('/delete/:id',moviesController.destroy);

module.exports = router;