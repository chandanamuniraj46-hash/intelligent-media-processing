const Tesseract = require("tesseract.js");
const path = require("path");

const extractText = async (filename) => {

    const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        filename
    );

    const result = await Tesseract.recognize(
        imagePath,
        "eng"
    );

    return result.data.text.trim();

};

module.exports = extractText;