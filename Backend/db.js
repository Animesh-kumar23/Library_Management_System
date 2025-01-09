const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://animeshkumarbgs:Netaji04@cluster0.l6eei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your own URI
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
  module.exports = connectToMongo;