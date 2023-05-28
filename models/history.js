const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
    {
        news_id: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        clicked: {
            type: Number,
            default: 0,
          },
        title: String,
        body: String,
        image: String,
        web:Boolean
    },
    {
        timestamps: true,
    }
);

var History = mongoose.model("History", HistorySchema);
module.exports = { History, HistorySchema };
