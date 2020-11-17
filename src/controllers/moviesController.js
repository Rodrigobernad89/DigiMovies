const db= require('../database/models');
const{Movie, Genre, Actor} = require('../database/models')
const {Op} = require('sequelize');



module.exports = {
    all: async(req,res) =>{
        try{
            const movies = await Movie.findAll({include:['Genre', 'actores']});         
            res.render('index',{movies})
            // res.json(movies);
        }catch (error) {
            console.log(error);
        }
    },
    detail: async(req,res) =>{
        try {
            let id = req.params.id;
            const detallePelicula = await Movie.findByPk(id,{include:['Genre', 'actores']});
            // const generos = await Genre.findByPk(id);
            // const actores = await Actor.findAll();
            // res.json(detallePelicula);
            res.render('detalle',{detallePelicula, id})
        } catch (error) {
            console.log(error);
        }
    },
    last5: async(req,res) =>{
        try {
            const ultimas5 = await Movie.findAll({
                order: [
                    ['release_date','DESC']
                ],
                limit:5,
                offset:16
            })
            res.render('estrenos',{ultimas5});
        } catch (error) {
            console.log(error);
        }
    },
    recomend: async(req,res) =>{
        try {
            const recomendadas = await Movie.findAll({
                where:{
                   rating: {[Op.gte] : 8}
                }
            })
            res.render('recomendadas',{recomendadas});
        } catch (error) {
            console.log(error);
        }
    },
    search: async(req,res) =>{
        try{
            const loQueBuscoElUsuario = req.body.busqueda;
            const resultados = await Movie.findAll({
                where:{
                  title: {[Op.like]: "%" + loQueBuscoElUsuario + "%"}
                }
            })
            res.render('results',{resultados});
        } catch (error) {
            console.log(error);
        }
    },
    create: async(req,res) =>{
        const generos = await Genre.findAll();
        const actores = await Actor.findAll();
        res.render('create_movie',{generos, actores})
        
    },
    store: async (req,res) =>{
        // const errors = validationResult(req);
        // try{
        // errors.isEmpty()
        console.log(req.body);
        const newMovie = await Movie.create(req.body)
        await newMovie.addActores(req.body.actores)
        res.redirect('/movies')
        // }catch (error){
        //     res.render("create_movie", { errors: errors.errors});
        // }
    },
    update: async (req,res) =>{
        const movieId = req.params.id;
        const toEdit = await Movie.findByPk(movieId,{include:['Genre','actores']});
        const generos = await Genre.findAll();
        const actores = await Actor.findAll();
        toEdit.release_date = toEdit.release_date.toLocaleString();
        // res.send(toEdit);
        res.render('update_movie',{toEdit, generos,actores})
    },
    change: async(req,res)=>{
        const movieId = req.params.id;
        const changedMovie = await Movie.findByPk(movieId,{include:['Genre','actores']})
        await changedMovie.removeActores(changedMovie.actores);
        await changedMovie.addActores(req.body.actores)
        await changedMovie.update(req.body);
    },
    destroy: async(req,res)=>{
        const movieId = req.params.id;
        const toDelete = await Movie.findByPk(movieId,{include:['Genre','actores']});
        await toDelete.removeActores(toDelete.actores);
        await toDelete.destroy();
        res.redirect('/movies');

    },
    generos: async(req,res)=>{
        const genreId = req.params.id;
        const detalleGenero = await Genre.findByPk(genreId, {include:['movies']})
        // res.json(detalleGenero);
        // const movies = await Movie.findAll();
        res.render('generos',{detalleGenero})
    },
    actores: async(req,res)=>{
        const actorId = req.params.id;
        const detalleActor = await Actor.findByPk(actorId, {include:['movies']});
        // res.json(detalleActor);
        res.render('actores', {detalleActor});
    },

    // promesas sin async await
    // all: (req,res) =>{
    //     const movies = Movie.findAll()
        // promesas sin async await
        // .then((respuesta)=>respuesta.json())
        // .then((data) => res.json(data)).catch()
    // otros metodos .findByPk()
    //               .findOne({
    //  attributes:['title', 'length'],
    //  where: {title: 'Avatar'}
    // })

    
    //     all: async(req,res) =>{
    //     try {

    //         const moviesJson = await Movie.findOne({
    //              where: {
    //                  [Op.or]:[{username:req.body.user},{email:req.body.user}]
                    
    //                 }
    //             })
    //         // const moviesJs = await moviesJson.json()
    //         res.json(moviesJson)
            
    //     } catch (error) {

    //         console.log(error);
    //     }
    // }

        
}