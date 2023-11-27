const express = require("express");
const router = express.Router();
const Pokemon = require("../schemas/pokemonSchema");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');



router.post("/", async(req, res) =>{
    try{
        var toSearch = req.body.name + "";
        // console.log(req.body)
        var pokemons = await Pokemon.find({name: toSearch.toLowerCase()});
        if(pokemons.length==0){
            res.status(404).send("Nope")
        }
        else {
            res.status(200).json(pokemons)
        }
    }catch(err){
        res.status(400).send(err + ": " + err.message);
    }

});

router.post("/", async (req, res) => { 
    try {
        const pokemon = new Pokemon ({
            pokemonId: req.body.pkmId,
            name: req.body.name,
            genre: req.body.genre,
            type: req.body.type,
            image: req.body.image,
            color: req.body.color
        });
        const newPokemon = await pokemon.save();
        res.status(201).send(newPokemon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => { 
    try{
        const admin = await Pokemon.findOne({email: req.body.email});
        const valid_login = await bcrypt.compare(req.body.password, admin.password);
        if(valid_login){
            const token = jwt.sign({id: admin.id}, process.env.TOKEN ||'dkasnjda328nf#', {expiresIn: 30 * 60});
            
            res.send({token});
        }else
            throw new Error ("El correo o la contraseña es incorrecta")
    }catch(err){
        res.status(403).send(err.message);
    }
});

module.exports = router;
//module.exports = auth;