const mongoose = require('mongoose');
require('dotenv').config();
async function connect(){  //vì có await nên phải có async
    // try {
    //     await mongoose.connect('mongodb://127.0.0.1/data_web');
    //     console.log('Connect successfully');
    // } catch (error) {
    //     console.log('Connect failure');
    // }

    try {
        await mongoose.connect('mongodb+srv://root:1234567890@cluster0.qy9wmum.mongodb.net/data_web?retryWrites=true&w=majority&appName=Cluster0');
        
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure', error.message);
        
    }

    
}

//chính là db ta export ra src/index.js
module.exports = {connect};