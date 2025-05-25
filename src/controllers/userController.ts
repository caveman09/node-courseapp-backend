import { Request, Response, RequestHandler, NextFunction } from "express";
import { userModel } from "../db/db";
import bcrypt from "bcrypt";
import { JWT_USER_PASSWORD } from "../config"
import jwt from "jsonwebtoken";

interface RequestwithUser extends Request {
    user?: {
        id: string;
        role: 'admin' | 'user';
    };
}

export const userLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;
    if (!email && !username) {
        res.status(400).json({ message: 'Email or username is required' });
        return;
    }
    if (!password) {
        res.status(400).json({ message: 'Password is required' });
        return;
    }

    try {
        const user = await userModel.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            res.status(404).json({ message: 'Invalid username or password' });
            return;
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign({ id: user._id, role: 'user' }, JWT_USER_PASSWORD);
        res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Login Succesful', user: { id: user._id, username: user.username, email: user.email } });
        return;

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const userRegister = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        res.status(400).json({ message: 'Email, username, and password are required' });
        return;
    }

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        const result = await userModel.create({ username, email, password });
        const token = jwt.sign({ id: result._id, role: 'user' }, JWT_USER_PASSWORD);
        res.cookie('token', token, { httpOnly: true }).status(201).json({ message: 'User registered successfully', user: { id: result._id, username: result.username, email: result.email } });
        return;

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const userLogout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req: Request, res: Response) => {
    const { email, id } = req.body;
    if (!email && !id) {
        res.status(400).json({ message: 'Email or ID is required' });
        return;
    }

    try {
        const user = await userModel.findOne({ $or: [{ email: email }, { _id: id }] });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ id: user._id, username: user.username, email: user.email, joinData: user.joinDate });
        return;

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const updateUserProfile = async (req: RequestwithUser, res: Response) => {
    const { email, username, password } = req.body;
    if (!email && !username && !password) {
        res.status(400).json({ message: 'At least one field (email, username, password) is required' });
        return;
    }

    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        let updatedData: { email?: String, username?: String, password?: String } = {};
        if (email) updatedData.email = email;
        if (username) updatedData.username = username;
        if (password) updatedData.password = password;

        const response = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!response) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Profile updated successfully', user: { id: response._id, username: response.username, email: response.email } });
        return;

    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const deleteUserProfile = async (req: RequestwithUser, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const response = await userModel.findByIdAndDelete(userId);
        if (!response) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.clearCookie('token').status(200).json({ message: 'Profile deleted successfully' });
        return;

    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const getUserCourses = async (req: Request, res: Response) => {

};

export const enrollInCourse = async (req: Request, res: Response) => {
    const courseId = req.params.id;
    // Logic to enroll user in the course
    res.status(200).json({ message: `Enrolled in course ${courseId} successfully` });
};

export const unenrollFromCourse = async (req: Request, res: Response) => {
    const courseId = req.params.id;
    // Logic to unenroll user from the course
    res.status(200).json({ message: `Unenrolled from course ${courseId} successfully` });
};