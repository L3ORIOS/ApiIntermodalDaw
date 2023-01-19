
const mongoose = require('mongoose')

const app = require('./app')

const config = require('./config')



mongoose.set("strictQuery", false);

mongoose.connect(config.db, (err, res) => {
    if(err) {
        return console.log(`Error al conectar a la base de tados ${err}`)
    }
    console.log('Conexion a la base de datos establecida')

    app.listen(config.port,() => {
        console.log(`Server running at http://127.0.0.1:${config.port}`)
    })

})

// const connectionParams = {
//     useNewUrlParse : true,
//     useUnifiedTopology: trrue
// }

// try {

//     mongoose.connect(config.db, (err, res) => {
//         if(err) {
//             return console.log(`Error al conectar a la base de tados ${err}`)
//         }
//         console.log('Conexion a la base de datos establecida')
    
//         app.listen(config.port,() => {
//             console.log(`Server running at http://127.0.0.1:${config.port}`)
//         })
    
//     })

// }catch(error){
//     console.log()
// }












