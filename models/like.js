const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
    {
        entity: Schema(
            {
                id: Number,
                name: String,
            }
        ),
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        like: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

var Like = mongoose.model("Like", newsSchema);
module.exports = { Like, likeSchema };
