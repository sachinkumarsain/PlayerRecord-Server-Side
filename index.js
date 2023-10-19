import express from "express";
import cors from "cors";
import player from "./model.js";
import connection from "./connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 8080;

app.post("/admin" , async(req,res)=>{
    console.log(req.body.data)

    const{playerName , aadharNo , game, ageGroup ,position,state,tournamentName , organizedAt ,venue , action}=req.body.data;


    const newPlayer = new player({
        playerName,
        aadharNo,
        game,
        ageGroup,
        ageGroup,
        position,
        state,
        tournamentName,
        organizedAt,
        venue,
        action,
        serialNum:"NR/3"
    })

    console.log(newPlayer)
     
    const saved = await newPlayer.save(); 

    res.status(200).send(newPlayer)
})


app.use("/home" , async(req , res)=>{
    const aadharNo = req.body.input;
    const playerData = await player.findOne({aadharNo})
    res.status(200).send(playerData)
})

connection.then(() => {
    app.listen(8080, () => {
        console.log("server started at port 8080");
    }); 
})
