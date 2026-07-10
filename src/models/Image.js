const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true
        },

        originalName: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "pending"
        },

        analysis: {
            type: Object,
            default: {}
        },
        imageHash: {
    type: String,
    default: null
},

        failureReason: {
            type: String,
            default: null
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("Image", imageSchema);