const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const extractText = async (filename) => {
    try {
        // Image path
        const imagePath = path.join(
            __dirname,
            "..",
            "uploads",
            filename
        );

        // Check if image exists
        if (!fs.existsSync(imagePath)) {
            throw new Error("Image file not found.");
        }

        // Create FormData
        const form = new FormData();

        form.append("apikey", process.env.OCR_SPACE_API_KEY);
        form.append("language", "eng");
        form.append("OCREngine", "2");
        form.append("isOverlayRequired", "false");
        form.append("detectOrientation", "true");
        form.append("scale", "true");
        form.append("isTable", "false");
        form.append("file", fs.createReadStream(imagePath));

        // OCR API Request
        const response = await axios.post(
            "https://api.ocr.space/parse/image",
            form,
            {
                headers: form.getHeaders(),
                maxBodyLength: Infinity,
                timeout: 30000,
            }
        );

        const result = response.data;

        // API Error
        if (result.IsErroredOnProcessing) {
            throw new Error(result.ErrorMessage.join(", "));
        }

        // No text found
        if (
            !result.ParsedResults ||
            result.ParsedResults.length === 0
        ) {
            return "";
        }

        // Extract OCR text
        let parsedText = result.ParsedResults[0].ParsedText || "";

        // Clean the text
        const cleanedText = parsedText
            .replace(/\r/g, "")
            .replace(/[ \t]+/g, " ")
            .replace(/\n{2,}/g, "\n")
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 2)
            .join("\n")
            .trim();

        return cleanedText;

    } catch (error) {
        console.error("OCR Error:", error.response?.data || error.message);
        throw error;
    }
};

module.exports = extractText;