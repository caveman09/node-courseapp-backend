import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
    userLogin, userRegister, userLogout, getUserProfile,
    updateUserProfile, deleteUserProfile,
    getUserCourses, enrollInCourse, unenrollFromCourse
} from '../controllers/userController';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
    res.send('Welcome to the User API');
});

router.post('/login', userLogin);
router.post('/register', userRegister);
router.post('/logout', authMiddleware, userLogout);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/profile', authMiddleware, deleteUserProfile);
router.get('/courses', authMiddleware, getUserCourses);
router.post('/course/:id', authMiddleware, enrollInCourse);
router.delete('/course/:id', authMiddleware, unenrollFromCourse);

export default router;