const { Router } = require('express');
const { Country, Activity } = require('../db')
const { createActivity } = require("../controllers/ActivtiesControllers")
const axios = require('axios')
const { Op } = require('sequelize')

const router = Router();

const getApiInfo = async () => {
    const apiInfo = await axios.get("http://restcountries.com/v3/all")
    return apiInfo.data.map(({ cca3, name, flags, continents, capital, subregion, area, population }) => {
        return {
            id: cca3,
            name: name.common,
            flags: flags ? flags[1] : "Not image found",
            continent: continents[0],
            capital: capital ? capital[0] : "No capital",
            subregion: subregion,
            area: area,
            population: population
        }
    })
}

const apiToDataBase = async () => {
    const countries = await getApiInfo()
    if(countries.length > 0){
        const dbInfo = await Country.bulkCreate(countries);
        console.log(`Datos de la API insertados en la base de datos exitosamente. Total de registros creados: ${dbInfo.length}.`);
    }
}

apiToDataBase()

router.get('/countries', async (req, res) =>{
    const { name } = req.query
    try {
        if(name){
            const countryName = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            countryName ? res.send(countryName) : res.send("inexistent country")
        }else{
            const countries = await Country.findAll({
                include: {
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                }
            })
            countries.length > 0 ? res.send(countries) : res.send('database information missing')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('countries/:id', async ( req, res ) =>{
    const { id } = req.params
    const newId = id.toUpperCase
    try {
    const country = await Country.findOne({
        where:{
            id: newId
        },
        include: Activity
    })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/activities', async ( req, res ) => {
    try {
        const allActivities = await Activity.findAll();
        res.send(allActivities)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/activities', async ( req, res ) => {
    const { ids, name, difficulty, duration, season } = req.body
    try {
        let newActivity = await createActivity(
            name,
            difficulty,
            duration,
            season,
            ids
        );
    res.send(newActivity) 
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;
