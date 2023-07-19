const router = require('express').Router()

const Person = require("../models/Person");

// Create
router.post('/', async (req, res) => {
    // req.body
    const {name, salary, approved} = req.body
  
    if(!name || !salary || approved === undefined) {
      res.status(422).json({error: 'Não cumpriu com os dados obrigatórios!'})
    } else {
        const person = {
            name,
            salary,
            approved
          }
        
          try {
            await Person.create(person)
        
            res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
        
          } catch (error) {
            res.status(500).json({error: error})
          }
    }
  
  })

  module.exports = router;