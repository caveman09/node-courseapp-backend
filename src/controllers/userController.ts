import { Request, Response } from "express";

export const userLogin = async (req: Request, res: Response) => {

};

export const userRegister = async (req: Request, res: Response) => {

};

export const userLogout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req: Request, res: Response) => {

};

export const updateUserProfile = async (req: Request, res: Response) => {

};

export const deleteUserProfile = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Profile deleted successfully' });
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