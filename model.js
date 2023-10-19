import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: String,
        required: true,
        unique: true

    },
    game: {
        type: String,
        required: true,

    },
    ageGroup: {
        type: String,
        required: true,

    },
    position: {
        type: String,
        required: true,

    },
    state: {
        type: String,
        required: true,

    },
    tournamentName: {
        type: String,
        required: true,

    },
    venue: {
        type: String,
        required: true,

    },
    action: {
        type: String,
        required: true,

    },
    position: {
        type: String,
        required: true,

    },
    serialNum:{
        type:String,
        required :true,
    }



})
const playerS = mongoose.model("Player", playerSchema);


export default playerS;