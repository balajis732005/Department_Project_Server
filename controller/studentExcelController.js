import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";

import User from "../model/userModel.model.js";

const upload = multer({ dest: 'uploads/' });

const studentRegister = async(req,res) => {
    if (!req.file) {
        res.send({
            status: true,
            message: "File Not Found"
        });
        return;
    }

    const { department } = req.body;

    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        const students = jsonData.map(
            row => ({
                name: row.name,
                email: row.email,
                password: row.dob,
                role: "STUDENT",
                department: department
            })
        )

        await User.insertMany(students);

        fs.unlinkSync(req.file.path);

        res.send({
            status: true,
            message: "Students Account Created Succesfull"
        })
    } catch(error) {
        console.log(error);
        res.send({
            status: false,
            message: "Failed to  Create Students Account"
        })
    }
}

const uploadMiddleware = upload.single('file');

export default {uploadMiddleware, studentRegister};