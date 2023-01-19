'use strict'

const express = require('express')
const multer = require('multer')
const storageStrategy = multer.memoryStorage()
const upload = multer({storage:storageStrategy})
const auth = require('../middlewares/auth')


const UsersController = require('../controllers/user')
const api = express.Router()

api.get('/users',UsersController.getUsers)

api.get('/user/:userID',UsersController.getUser)

api.post('/user',upload.single('picture'),UsersController.saveUser)

api.put('/user/:userID',UsersController.updateUser)

api.delete('/userDelete/:userID',UsersController.deleteUser)

api.post('/signin',UsersController.signIn)

api.get('/private',auth,(req,res) => {
  res.status(200).send({message: 'Tienes accesso'})
})

module.exports = api


