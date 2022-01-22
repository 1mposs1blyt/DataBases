const express = require("express")
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const sqlite = require("sqlite3")
async function get_data() {
    let db = new sqlite.Database("test.db", (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connect to test.db complete")
        }

    })
    let sql = "SELECT * FROM user";
    // db.all(),db.each(),db.get()
    let promise = new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            };
            let data = await promise;
            db.close();
            return data;
            
            // for (row of rows) {
            //     console.log(row);
            // }

            // console.log(rows);
        })
    })
    
}
app.get("/", (req, res) => {
    res.send('Hello!');
    get_data().then((data) => {
        res.send(JSON.stringify(data));
    })
})
app.listen(port, function () {
    console.log(`Server stated on: http://${hostname}:${port}`)
});