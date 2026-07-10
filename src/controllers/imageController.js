const Image = require("../models/Image");

const getStatus = async (req, res) => {

    try {

        const image = await Image.findById(req.params.id);

        if (!image) {

            return res.status(404).json({
                success: false,
                message: "Image not found"
            });

        }

        res.json({

            success: true,

            imageId: image._id,

            status: image.status

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const getResult = async (req, res) => {

    try {

        const image = await Image.findById(req.params.id);

        if (!image) {

            return res.status(404).json({

                success: false,

                message: "Image not found"

            });

        }

        if (image.status !== "completed") {

            return res.json({

                success: true,

                status: image.status,

                message: "Processing is not completed yet."

            });

        }

        res.json({

            success: true,

            analysis: image.analysis

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getStatus,

    getResult

};