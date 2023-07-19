const router = require('express').Router()

const Person = require("../models/Person");

// Create
router.post('/', async (req, res) => {
    // req.body
    const {name, salary, approved} = req.body
  
    if(!name || !salary || approved === undefined) {
      res.status(422).json({error: 'Não cumpriu com os dados obrigatórios!'})
      return
    }
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
    
  
  })

  // Read
  router.get('/', async (req, res) => {

    try {

        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
      }

  })

  router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {

        const person = await Person.findOne({_id: id})

        if (!person) res.status(422).json({message: 'O usuário não foi encontrado'})

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
      }

  })

  module.exports = router;