const mongoose = require('mongoose');
async function connect(){  //vì có await nên phải có async
    try {
        await mongoose.connect('mongodb://127.0.0.1/data_web');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

//chính là db ta export ra src/index.js
module.exports = {connect};