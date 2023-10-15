import { generateToken } from '../middleware/auth.js';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";


//Register User
const register = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        // finding the user
        const userExist = await User.findOne({ email });

        //if find then send already registered
        if (userExist) {
            res.status(403).json("email already exist");
        }

        //hashing password before sending to client
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        //if not registered then create
        const user = await User.create({
            firstName,
            lastName,
            email,
            username,
            password
        });

        //creating token
        const token = generateToken(user?._id);
        
        // after creating send response to client
        res.status(200).json({
            success: true,
            username,
            firstName,
            lastName,
            email,
            password:hashedPassword,
            token
        });
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
};


export {
    register
};