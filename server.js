const express = require("express")
const server = express();

const db = require('./db')

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

/*const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title: "Leitura 1",
        category: "Estudo",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        url: "rocketseat.com"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Leitura 2",
        category: "Estudo 2",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        url: "rocketseat.com"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title: "Leitura 3",
        category: "Estudo 3",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        url: "rocketseat.com"
    }
]*/

server.use(express.static("public"))
//habilitar uso do req.body, uso extendido para o express
server.use(express.urlencoded({extended:true}))

server.get("/", function(req, res){

    db.all(`select * from ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("erro no banco de dados")
        }
        let lastIdeas = []
        //const reversedIdeas = ideas a primeira variável ta "referenciando" a segunda, se mexer nela mexe na outra
        const reversedIdeas = [...rows].reverse()
        for (let idea of reversedIdeas){
            if (lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
        return(res.render("index.html", {ideas : lastIdeas}))
    })
})

server.get("/ideas", function(req, res){

    db.all(`select * from ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("erro no banco de dados")
        }
        const reversedIdeas = [...rows].reverse()
        return(res.render("ideas.html", {ideas : reversedIdeas}))
    })
    
})

server.post("/", function(req, res){
    const query = 
        `insert into ideas(
            image,
            title,
            category,
            description,
            link
        )values(
            ?,?,?,?,?
        );`
    
    const values = [req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link]

    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("erro no banco de dados")
        }
        
        return res.redirect("/ideas")
    
    })
})

//ligar servidor na porta
server.listen(3000)