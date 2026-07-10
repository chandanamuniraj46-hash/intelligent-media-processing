const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

const analyzeImage = async (filename) => {

    const imagePath = path.join(__dirname, "..", "uploads", filename);
    const fileStats = fs.statSync(imagePath);

    const metadata = await sharp(imagePath).metadata();

    const stats = await sharp(imagePath).stats();

    const brightness =
        (
            stats.channels[0].mean +
            stats.channels[1].mean +
            stats.channels[2].mean
        ) / 3;

    let brightnessStatus = "Good";

    if (brightness < 80) {
        brightnessStatus = "Too Dark";
    } else if (brightness > 220) {
        brightnessStatus = "Too Bright";
    }

    return {

        brightness: {
            score: Number(brightness.toFixed(2)),
            status: brightnessStatus
        },

        dimensions: {
            width: metadata.width,
            height: metadata.height
        },

        format: metadata.format,

        size: fileStats.size

    };

};

module.exports = analyzeImage;