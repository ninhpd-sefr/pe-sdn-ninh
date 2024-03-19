require('dotenv').config();

module.exports = {
    host: {
        port: process.env.port
    },
    db: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
    },
    jwt: {
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    }
}