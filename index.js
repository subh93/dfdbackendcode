const db = require('./db');

const express = require('express');
const app = express();

const dotenv = require('dotenv');
// const cors = require('cors');
const bodyParser = require('body-parser');
const { Console } = require('console');

dotenv.config();
// app.use(cors({origin: '*'}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://zany-ruby-octopus-boot.cyclic.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Server Working");
})

const FoodItemsRoute = require('./routes/foodItemsRoutes')
const FoodCategoriesRoute = require('./routes/foodCategoryRoutes')
const UserRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')

app.use('/api', FoodItemsRoute);
app.use('/api', FoodCategoriesRoute);
app.use('/api', UserRoute);
app.use('/api', ordersRoute);


// app.listen(process.env.PORT, async()=>{
//     await db;
//     console.log(`Server is running on ${process.env.PORT}`)
// })

db().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`)
  })
})
