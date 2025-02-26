import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { name, username, email, password } = req.body;

        const user = await User.findOne({
            email
        }) || await User.findOne({
            username
        });

        if (user) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create([{
            name,
            username,
            email,
            password: hashedPassword
        }], { session });

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();

        res.status(201).json(
            {
                success: true,
                message: "User created successfully",
                data: {
                    token,
                    user: newUser,
                }
            }
        )

    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User
            .findOne({ email })

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json(
            {
                success: true,
                message: "User logged in successfully",
                data: {
                    token,
                    user,
                }
            }
        )
    }

    catch (error) {
        next(error)
    }

}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("token");

        res.status(200).json(
            {
                success: true,
                message: "User logged out successfully"
            }
        )
    }

    catch (error) {
        next(error)
    }
}
