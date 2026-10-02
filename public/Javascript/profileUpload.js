

const multer = require("multer");
const { cloudinary } = require("../../cloudConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,

    params: {
        folder: "TalentTrack_Profile_Images",
        allowed_formats: ["png", "jpg", "jpeg"]
    }
});

module.exports = multer({
    storage,

      limits:{
        fileSize: 5 * 1024 * 1024
    },

      fileFilter:(req,file,cb)=>{

        const allowedTypes = [

            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"

        ];

        if(
            allowedTypes.includes(
                file.mimetype
            )
        ){
            cb(null,true);
        }else{
            cb(
                new Error(
                    "Only JPG, PNG and WEBP images allowed"
                ),
                false
            );
        }
    }
});