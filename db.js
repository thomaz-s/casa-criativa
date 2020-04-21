const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {

    db.run(`
        create table if not exists ideas(
            id integer primary key autoincrement,
            image text,
            title text,
            category text,
            description text,
            link text
        );
    `)

    /*const query = 
        `insert into ideas(
            image,
            title,
            category,
            description,
            link
        )values(
            ?,?,?,?,?
        );`*/

    const values = [
        "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        "Leitura 1",
        "Estudo",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        "rocketseat.com"
    ]

    /*db.run(query, values, function(err){
        if (err) return console.log(err)
        console.log(this)
    
    })*/

    db.all(`select * from ideas`, function(err, rows){
        if (err) return console.log(err)
        console.log(rows)
    })

    /*db.run(`delete from ideas`, function(err){
        if (err) return console.log(err)
        console.log("deletei", this)
    })*/
})

module.exports = db