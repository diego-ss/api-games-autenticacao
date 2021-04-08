const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Game = require("./games/Game");
const User = require("./users/User");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "esabemosquetodasascoisascontribuemjuntamenteparaobemdaquelesqueamamaDeus";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

function authenticate(req, res, next){
    const authToken = req.headers["authorization"];
    
    if(authToken){
        const token = authToken.split(' ')[1];
        jwt.verify(token, JWTSecret, (err, data)=>{
            if(err){
                res.status(401);
                res.json({err: "Token inválido!"});
            } else {
                req.token = token;
                req.loggedUser = {id: data.userId, email: data.userEmail};
                next();
            }
        });
    } else {
        res.status(401);
        res.json({err: "Token inválido!"});
    }
}

app.get("/games",authenticate, (req, res)=>{
    //retornando o status code
    res.statusCode = 200;
    //retornando em json os resultados
    Game.findAll({raw : true}).then(games=>{
        if(games){
            res.json(games);
        }
    });

});

app.get("/game/:id",authenticate ,(req, res)=>{
    var id = req.params.id;
    
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        id = parseInt(req.params.id);
        Game.findByPk(id).then(game=>{
            if(game){
                //retornando o status code
                res.statusCode = 200;
                //retornando em json os resultados
                res.json(game);
            } else {
                res.sendStatus(404);
            }
        });
    }
});

app.post("/game", (req, res) => {
    var name = req.body.name;
    var year = req.body.year;
    var price = req.body.price;
    
    Game.create({
        name: name,
        year: year,
        price: price
    }).then(()=>{
        res.sendStatus(201);
    }).catch(()=>{
        res.sendStatus(500);
    });
    res.sendStatus(200);
});

app.delete("/game/:id", authenticate, (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        id = parseInt(req.params.id);
        Game.destroy({
            where:{id: id}
        }).then(()=>{
            res.sendStatus(200);
        }).catch(()=>{
            res.sendStatus(400);
        });
        
    }
});

app.put("/game/:id", (req, res) => {
    var id = req.params.id;
    
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        id = parseInt(req.params.id);

        Game.update({
            name: req.body.name,
            year: req.body.year,
            price: req.body.price
        }, {where: {id: id}}
        ).then(()=>{
            res.sendStatus(200);
        }).catch(()=>{
            res.sendStatus(404);
        });
    }
});

app.post("/auth", (req, res)=>{
    var {email, password} = req.body;

    if(email == undefined || password == undefined){
        res.sendStatus(400);
    }

    User.findOne({
        where :{email: email}
    }).then(user => {
        if(user && user.password == password){
            jwt.sign({
                userId: user.id,
                userEmail: user.email
            }, JWTSecret, {expiresIn: '24h'}, (err, token) => {
                if(err){
                    res.status(400);
                    res.json({err: "Falha interna"});
                } else {
                    res.status(200);
                    res.json({token: token});
                }
            })
        } else {
            res.sendStatus(401);
        }
    }).catch(error => {
        res.sendStatus(500);
    })
});

app.listen(8080, ()=>{
    console.log("API ONLINE!");
});