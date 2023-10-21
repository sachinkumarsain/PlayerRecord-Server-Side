import express from "express";
import cors from "cors";
import player from "./model.js";
import connection from "./connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 8080;

app.post("/admin", async (req, res) => {
    console.log(req.body.data)

    const { playerName, aadharNo, game, ageGroup, position, state, tournamentName, organizedAt, venue, action } = req.body.data;


    //...........................year..................//

    let year = new Date()
    let years = year.toDateString().split("").slice(13).join("")
    console.log(years)

    //.........................tournamentNum...............//
    let tournamentNum = tournamentName.split("").slice(0, 1).join("")

    console.log(tournamentNum)

    //...........................tournamentCountry............//
    let tournamentCountry = tournamentName.split("").slice(4, 5).join("").toUpperCase()
    console.log(tournamentCountry)

    //.........................random number.................//

    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    let number = `${array[Math.floor(Math.random() * array.length)]}${array[Math.floor(Math.random() * array.length)]}${array[Math.floor(Math.random() * array.length)]}`

    console.log(number)


    //.......................total Serial number.....................//
    
    let count =0
    

    const playerRecord = await player.findOne({ aadharNo });
   
    if (playerRecord) {
        res.status(202).send("already submit")
    } else {
        let serialNumber = `SGFI/${tournamentNum}${tournamentCountry}/${++count}`

        console.log(serialNumber)
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
            serialNum:serialNumber
        })

        console.log(newPlayer)

        const saved = await newPlayer.save();

        res.status(200).send("newPlayer")
    }

})


app.use("/home", async (req, res) => {
    const aadharNo = req.body.input;

    const playerData = await player.findOne({ aadharNo })
    if (playerData) {
        res.status(200).send(playerData)
    }
    else {
        res.status(202).send("Wrond Aadhar card number")
    }

})

connection.then(() => {
    app.listen(8080, () => {
        console.log("server started at port 8080");
    });
})
