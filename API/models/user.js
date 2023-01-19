'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')



const UserSchema = new Schema({
    _id: String,
    nombre:String,
    apellido:String,
    correo:String,
    password:{type:String, select:false},
    amigos : {type: String, default:"0"},
    seguidores : {type: String, default:"0"},
    picture:{type:String,default:"imagenPorDefecto.png"},
    registro:{type: Date, default: Date.now()},
    web:String
})

UserSchema.pre('save', async function save(next){
    let user = this
    if(!this.isModified('password')) return next()

    await bcrypt.genSalt(10, async (err, salt) => {
        if(err) return next(err)

        await bcrypt.hash(user.password, salt, null, (err,hash)=> {
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})



module.exports =  mongoose.model('User',UserSchema)