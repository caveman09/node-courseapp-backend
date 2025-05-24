import { Request, Response } from "express";

export const CreatorLogin = async (req: Request, res: Response) => {

};

export const CreatorRegister = async (req: Request, res: Response) => {

};

export const CreatorLogout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getCreatorProfile = async (req: Request, res: Response) => {

};

export const updateCreatorProfile = async (req: Request, res: Response) => {

};

export const deleteCreatorProfile = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Profile deleted successfully' });
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