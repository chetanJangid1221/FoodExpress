const mongoose = require('mongoose')
const uri = 'mongodb+srv://chetanjangid0064:eatChetan@cluster0.uvhxtb3.mongodb.net/eatHealthy?retryWrites=true&w=majority';
// const uri=process.env.URI
const { MongoClient } = require('mongodb');

// const client = new MongoClient(uri);
// async function mongoDB() {
//     await client.connect();
//     const db = client.db('eatHealthy');
//     const collection = db.collection('user');

//     // Find the first document in the collection
//     const first = await collection.find({}).toArray();
//     console.log(first);
// };
async function mongoDB() {
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // await client.connect()
    // console.log("Connected to MongoDB Atlas");
    // const collection = client.db("eatHealthy").collection("eatHealthyMERN");
    // const collection1 = client.db("eatHealthy").collection("foodCategory");        
    // global.foodData = await collection.find({}).toArray();
    // global.foodCategory = await collection1.find({}).toArray();

    // console.log(foodData);
    // console.log(foodCategory);
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
    const collection = await mongoose.connection.db.collection("eatHealthyMERN");
    const collection1 = await mongoose.connection.db.collection("foodCategory");        
    global.foodData = await collection.find({}).toArray();
    global.foodCategory = await collection1.find({}).toArray();
    // console.log(foodData);
    // console.log(foodCategory);
    
    

    
};



// const mongoDB=()=>{
//     mongoose.connect(uri).then(
//         console.log("connected")
//     )
// }
module.exports = mongoDB;



