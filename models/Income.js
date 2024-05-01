const { mongoose } = require("mongoose");


const incomeSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : true
    },
    amount : {
        type : Number,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    date : {
        type : Date,
        trim : true,
        required : true
    },
    category : {
        type : String,
        required : true,

    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
} , { timestamps: true })

// export model
module.exports = mongoose.model("Income", incomeSchema);