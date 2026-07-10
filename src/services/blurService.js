const sharp = require("sharp");
const path = require("path");

const detectBlur = async (filename) => {

    const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        filename
    );

    const stats = await sharp(imagePath).stats();

    const channels = stats.channels;

    const averageStdDev =
        (channels[0].stdev +
         channels[1].stdev +
         channels[2].stdev) / 3;

    return {
        score: Number(averageStdDev.toFixed(2)),
        status: averageStdDev > 40 ? "Sharp" : "Blurry"
    };

};

module.exports = detectBlur;