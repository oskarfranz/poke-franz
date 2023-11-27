const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    genre:{
        type: Array,
        required: true,
        unique: false
    },
    type:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    }

    
}, { collection: 'pokemons' });

const Pokemon = mongoose.model("pokemons", pokemonSchema);
module.exports = Pokemon;