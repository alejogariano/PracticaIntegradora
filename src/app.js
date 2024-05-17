import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars';
import dotenv from 'dotenv'

import __dirname from './utils.js';
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import chatRouter from './routes/chatRouter.js'
import cartRouter from './routes/cartRouter.js'
import indexRouter from './routes/indexRouter.js'

dotenv.config()
console.log(process.env.MONGO_URL)

const app = express()
const PORT = 8080

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Conectado a la base de datos")})
    .catch(error => console.error("Error en la conexión", error))

app.use('/', userRouter)
app.use('/', productRouter)
app.use('/', chatRouter)
app.use('/', cartRouter)
app.use('/', indexRouter)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})