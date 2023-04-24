const { Activity } = require('../db')

const createActivity = async (name, difficulty, duration, season, ids) => {
    //Validacion de campos obligatorios
    if(!name || !difficulty || !duration || !season || !ids.length) {
        return "Please enter all the obligatory fields"
    }
    //Validacion de la temporada
    const validSeasons = ["summer", "fall", "winter", "spring"]
    if(!validSeasons.includes(season)){
        return "The season is not valid"
    }
    //Busqueda o creacion de la actividad por nombre
    const [activity, created] = await Activity.findOrCreate({
        where: { name },
        defaults: { difficulty, duration, season }
    })
    if(!created){
        return "There's already an activity with that name"
    }
    //Establecimiento de la relacion entre la actividad y los paises relacionados
    await activity.setCountries(ids);

    return "Activity created successfully";
}

module.exports = { createActivity }