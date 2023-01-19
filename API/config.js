module.exports = {
    port: process.env.PORT || 3505,
    db: process.env.MONGODB || 'mongodb+srv://UberRoutes:UberRoutes@routes.7it3wwj.mongodb.net/Routes',
    SECRET_TOKEN: 'secretToken'
}