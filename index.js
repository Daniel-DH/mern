const express = require('express');

const app = express();

const start = () =>{
    app.listen(3000,() =>{
        console.log('listening on port 3000');
    });
}

start();