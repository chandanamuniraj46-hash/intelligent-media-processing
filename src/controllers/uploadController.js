const { addJob } = require("../services/imageQueue");
const Image = require("../models/Image");


const uploadImage = async (req, res) => {

    try {

        const image = await Image.create({
            filename: req.file.filename,
            originalName: req.file.originalname,
            status: "pending"
        });
        addJob({
    imageId:image._id
});


        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            imageId: image._id,
            status: image.status
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


module.exports = {
    uploadImage
};