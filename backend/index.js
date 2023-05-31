const express = require('express')
const app = express()
const port = 5000
const mongoDB = require('./db')
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-Width, Content-Type, Accept"
//         );
//         next();
//     });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://foodexpress-jrwp.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
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