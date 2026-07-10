const { imageHash } = require("image-hash");
const path = require("path");

const generateImageHash = (filename) => {

    return new Promise((resolve, reject) => {

        const imagePath = path.join(
            __dirname,
            "..",
            "uploads",
            filename
        );

        imageHash(
            imagePath,
            16,
            true,
            (error, hash) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(hash);
                }

            }
        );

    });

};

module.exports = generateImageHash;