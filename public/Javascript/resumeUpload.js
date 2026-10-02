const { cloudinary } = require("../../cloudConfig");
const multer = require("multer");

const {
    CloudinaryStorage
} = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({

    cloudinary,

    params: {
        folder: "TalentTrack_Resumes",

        resource_type: "raw",

        allowed_formats: ["pdf"]
    }
});

module.exports = multer({
    storage,

      limits:{
        fileSize: 2 * 1024 * 1024
    },
     fileFilter:(req,file,cb)=>{

        if(
            file.mimetype ===
            "application/pdf"
        ){
            cb(null,true);
        }else{
            cb(
                new Error(
                    "Only PDF files allowed"
                ),
                false
            );
        }
    }
});