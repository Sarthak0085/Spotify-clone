import jwt from "jsonwebtoken";

// authenticated user and get token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

//is user authenticated
export const isAuthenticated = async (req, res) => {
    const { token } = req.cookies;
    //If token doesn't exist then send error
    if (!token) {
        return res.status(401).json({
            err:"Not Authorized user",
        })
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //get user id from decoded token
        req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
        res.status(401).json({
            err: error.message,
        })
    }
}