const express= require('express')
const bodyParser= require('body-parser')
const shopRoute= require('./Routes/shopRoute')
const visitorRoute= require('./Routes/visitorRoute')
const homeRoute = require('./Routes/homeRoute')
const cookieParser= require('cookie-parser')

const app= express();

const MongoInit= require('./config/db.config')
MongoInit();

app.use(bodyParser.json());
app.use(cookieParser())

app.use('/shop',shopRoute);
app.use('/visitor',visitorRoute)
app.use('/',homeRoute)


const PORT = process.env.PORT || 8000 ;

app.listen(PORT,()=>{
    console.log(`Server runs at ${PORT}`)
})