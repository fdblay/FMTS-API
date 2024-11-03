import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg
        ({
            apiAccessToken: process.env.SAVEFILESORG_API_KEY,
            relativePath: '/freelix-api/users/*'
        }),
        preservePath: true
});

