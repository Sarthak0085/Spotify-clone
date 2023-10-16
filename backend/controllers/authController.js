import { generateToken } from "../middlewares/auth.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


//Register User
const register = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        // finding the user
        const userExist = await User.findOne({ email });

        //if find then send already registered
        if (userExist) {
            res.status(403).json({
                success: false,
                err: "email already exist"
            });
        }

        //hashing password before sending to client
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        //if not registered then create
        const user = await User.create(req.body);

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
            success: false,
            err: error.message
        })
    }
};


// login controller
const login = async (req, res) => {
    //get data from req.body
    const { email, password } = req.body;
    try {
        // find user by email
        const user = await User.findOne({ email });
        //user not found 
        if (!user) {
            return res.status(403).json({
                success: false,
                err: "Invalid credentials"
            });
        }

        // if found then comparing password
        const isMatched = await bcrypt.compare(password, user.password);

        //if password is not matched
        if (!isMatched) {
            return res.status(403).json({
                success: false,
                err: "Invalid credentials"
            });
        }

        // creating new token
        const token = generateToken(user?._id);

        res.status(200)
            .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
            .json({
            success: true,
            user,
            token,
        })

    } catch (error) {
        return res.json({
            message: error.message
        })
    }
    
}

//logout user
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: "Logout Successful",
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

export {
    register,
    login,
    logout
};