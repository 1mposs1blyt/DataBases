const express = require('express');
const sqlite = require("sqlite3")
const app = express();
const port = 3000;
const hostname = '127.0.0.1';

let db = new sqlite.Database("test.db", (err) => {
    if (err) {
        console.error(err.message);
    }else{
        console.log("Connect to test.db complete")
    }

})
db.serialize(()=>{
    let query = "SELECT * FROM user";
    db.each(query, (err,row) => {
        if (err){
            console.error(err.message);
        }else{
            console.log(row);
        }
    })
})
db.close();
app.get("/", (request, response) => {
    res.send('Hello!');
})




app.listen(port, function () {
    console.log(`Server stated on: http://${hostname}:${port}`)
});