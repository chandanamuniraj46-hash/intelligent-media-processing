const detectBlur = require("../services/blurService");
const extractText = require("../services/ocrService");
const generateImageHash = require("../services/hashService");
const { getJob } = require("../services/imageQueue");
const Image = require("../models/Image");
const analyzeImage = require("../services/imageAnalysisService");

const processImages = async () => {

    setInterval(async () => {

        const job = getJob();

        if (!job) {
            return;
        }

        try {

            console.log("Processing image:", job.imageId);

            const image = await Image.findById(job.imageId);
            await Image.findByIdAndUpdate(
    job.imageId,
    {
        status: "processing"
    }
);

            if (!image) {
                console.log("Image not found");
                return;
            }

            const analysis = await analyzeImage(image.filename);
            const hash = await generateImageHash(image.filename);
            const extractedText = await extractText(image.filename);
            const blur = await detectBlur(image.filename);
            const duplicateImage = await Image.findOne({
    imageHash: hash,
    _id: { $ne: image._id }
});

            await Image.findByIdAndUpdate(
    job.imageId,
    {
        status: "completed",

        imageHash: hash,

        analysis: {
    ...analysis,

    duplicate: duplicateImage ? true : false,

    ocr: {
        text: extractedText
    },

    blur: blur
}
    }
);

            console.log("Completed:", job.imageId);

        }
        catch (error) {

            console.log(error);

            await Image.findByIdAndUpdate(
                job.imageId,
                {
                    status: "failed",
                    failureReason: error.message
                }
            );

        }

    }, 5000);

};

module.exports = processImages;