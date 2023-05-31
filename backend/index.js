const express = require('express')
const app = express()
const port = 5000
const mongoDB = require('./db')
app.use((req,res,next)=>{
    // res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.setHeader("Access-Control-Allow-Origin","https://foodexpress-jrwp.onrender.com/");

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept"
        );
        next();
    })
    mongoDB();

app.use(express.json())
app.use('/',require('./Routes/CreateUser'));
app.use('/',require('./Routes/DisplayData'));
app.use('/',require('./Routes/OrderData'));


console.log("stage1")

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})  