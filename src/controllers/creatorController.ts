import { Request, Response } from "express";
import { creatorModel } from "../db/db";
import bcrypt from "bcrypt";
import { JWT_CREATOR_PASSWORD } from "../config";
import jwt from "jsonwebtoken";

interface RequestwithUser extends Request {
    user?: {
        id: string;
        role: 'admin' | 'user';
    };
}

export const CreatorLogin = async (req: Request, res: Response) => {
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
        const creator = await creatorModel.findOne({ $or: [{ email }, { username }] });
        if (!creator) {
            res.status(404).json({ message: 'Invalid username or password' });
            return;
        }

        const valid = await bcrypt.compare(password, creator.password);
        if (!valid) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign({ id: creator._id, role: 'admin' }, JWT_CREATOR_PASSWORD);
        res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Login Successful', creator: { id: creator._id, username: creator.username, email: creator.email } });
        return;

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const CreatorRegister = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        res.status(400).json({ message: 'Email, username, and password are required' });
        return;
    }

    try {
        const existingCreator = await creatorModel.findOne({ email: email });
        if (existingCreator) {
            res.status(409).json({ message: 'Creator already exists' });
            return;
        }

        const result = await creatorModel.create({ username, email, password });
        const token = jwt.sign({ id: result._id, role: 'admin' }, JWT_CREATOR_PASSWORD);
        res.cookie('token', token, { httpOnly: true }).status(201).json({ message: 'Creator registered successfully', creator: { id: result._id, username: result.username, email: result.email } });
        return;

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const CreatorLogout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getCreatorProfile = async (req: Request, res: Response) => {
    const { email, id } = req.body;
    if (!email && !id) {
        res.status(400).json({ message: 'Email or ID is required' });
        return;
    }

    try {
        const creator = await creatorModel.findOne({ $or: [{ email }, { _id: id }] });
        if (!creator) {
            res.status(404).json({ message: 'Creator not found' });
            return;
        }

        res.status(200).json({ message: 'Creator profile fetched succesfully', id: creator._id, username: creator.username, email: creator.email, joinDate: creator.joinDate });
        return;

    } catch (error) {
        console.error('Error fetching creator profile:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const updateCreatorProfile = async (req: RequestwithUser, res: Response) => {
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
        res.status(400).json({ message: 'At least one field (username, email, password) is required to update' });
        return;
    }

    try {
        const creatorId = req.user?.id;
        if (!creatorId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        let updatedData: { username?: String, email?: String, password?: String } = {};
        if (username) updatedData.username = username;
        if (email) updatedData.email = email;
        if (password) updatedData.password = password;

        const result = await creatorModel.findByIdAndUpdate(creatorId, updatedData, { new: true });
        if (!result) {
            res.status(404).json({ message: 'Creator not found' });
            return;
        }
        res.status(200).json({ message: 'Creator profile updated successfully', creator: { id: result._id, username: result.username, email: result.email } });
        return;

    } catch (error) {
        console.error('Error updating creator profile:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const deleteCreatorProfile = async (req: RequestwithUser, res: Response) => {
    const creatorId = req.user?.id;
    if (!creatorId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const result = await creatorModel.findByIdAndDelete(creatorId);
        if (!result) {
            res.status(404).json({ message: 'Creator not found' });
            return;
        }

        res.clearCookie('token').status(200).json({ message: 'Creator profile deleted successfully' });
        return;

    } catch (error) {
        console.error('Error deleting creator profile:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const getCreatorCourses = async (req: Request, res: Response) => {

};

export const createCourse = async (req: Request, res: Response) => {

};

export const deleteCourse = async (req: Request, res: Response) => {
    const courseId = req.params.id;
    // Logic to unenroll Creator from the course
    res.status(200).json({ message: `Unenrolled from course ${courseId} successfully` });
};