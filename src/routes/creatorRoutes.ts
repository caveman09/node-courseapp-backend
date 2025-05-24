import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
    CreatorLogin, CreatorRegister, CreatorLogout,
    getCreatorProfile, updateCreatorProfile, deleteCreatorProfile,
    getCreatorCourses, createCourse, deleteCourse
} from '../controllers/creatorController';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
    res.send('Welcome to the Creator API');
});

router.use('/login', CreatorLogin);
router.use('/register', CreatorRegister);
router.post('/logout', authMiddleware, CreatorLogout);
router.get('/profile', authMiddleware, getCreatorProfile);
router.put('/profile', authMiddleware, updateCreatorProfile);
router.delete('/profile', authMiddleware, deleteCreatorProfile);
router.get('/courses', authMiddleware, getCreatorCourses);
router.post('/course', authMiddleware, createCourse);
router.delete('/course/:id', authMiddleware, deleteCourse);

export default router;