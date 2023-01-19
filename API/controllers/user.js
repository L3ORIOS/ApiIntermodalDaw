'use strict'

const User = require('../models/user')
const sharp = require('sharp')
const fs = require('fs')
const { render } = require('../app')
const { Console } = require('console')
const service = require('../services')


async function getUser(req,res){

    let userID = req.params.userID
    try{
        await User.findById(userID,(err,user) => {
            if(err) return res.status(500).send(`Erro al realizar la peticion: ${err}`)
            if(!user) return res.status(404).send({message : 'El usuario no existe'})
    
            res.status(200).send({user})
            //res.render('user_index',{user})
            
        })
    }catch(error){}
   


    
}


async function  getUsers(req,res){
    
    try{
        await User.find((err,users) =>{
            if(err) return res.status(500).send(`Erro al realizar la peticion: ${err}`)
            if(!users) return res.status(404).send({message : 'El usuario no existe'})
    
            res.send(200,{users})
            //res.render('user_listado',{users})
        })
    }catch(error){}

}

async function saveUser(req,res){

    const data = req.body
    const file = req.file
    

    const sharpFile = sharp(file.buffer).resize(200,200,{
        fit:"cover"
    })

    const sharpEnd = await sharpFile.toBuffer()

    const ruta = 'uploads/'+file.originalname

    console.log(ruta)
    
    fs.writeFileSync(ruta,sharpEnd)

    let user = new User()

    user._id = data._id
    user.nombre = data.nombre
    user.apellido = data.apellido
    user.correo = data.correo
    user.password = data.password
    user.amigos = data.amigos
    user.seguidores = data.seguidores
    user.picture = ruta
    user.registro = data.registro
    user.web = data.web
    
    try{
        await user.save((err) => {
        if(err) res.status(500).send({message : `Erro al salvar en la base de datos ; ${err}`})

        res.status(200).send({token:service.createToken(user)})
       
    })
}catch(err){}   

}

function updateUser(req,res){
    let userID = req.params.userID
    let update = req.body
    User.findByIdAndUpdate(userID, update, (err, userUpdated) =>{
        if(err) return res.status(500).send(`Erro al realizar la peticion: ${err}`)
        return res.status(200).send({user : userUpdated})

    })
}

async function deleteUser(req,res){
    let userID = req.params.userID
    try{
        User.findById(userID, async(err,user) => {
            if(err) return res.status(500).send(`Erro al realizar la peticion: ${err}`)
            if(!user) return res.status(404).send({message : 'El user no existe'})
            try {
                fs.unlinkSync(`./${user.picture}`)
                console.log('File removed')
              } catch(err) {
                console.error('Something wrong happened removing the file', err)
              }

            await user.remove(err => {
                if(err) return res.status(500).send(`Erro al realizar la peticion: ${err}`)
                res.status(200).send({message : 'El usuario ha sido eliminado'})
        
            })
        })
    }catch(err){}    
}
async function signIn (req, res) {

    try{
        await User.find({ _id : req.body._id }, (err, user) =>{
            if (err) return res.status(500).send({ message: err})
            if (!user) return res.status(404).send({ message:'No existe el usuario' })
            
            req.user = user
            res.status(200).send({
                message:'Te has logueado correctamente token',
                token: service.createToken(user)
            })
              
        })
    }catch(err){}
   
                                                         
      
  
}

module.exports = {
    getUser,
    getUsers,
    saveUser,
    updateUser,
    deleteUser,
    signIn
}