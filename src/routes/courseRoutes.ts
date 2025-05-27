import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', (req, res) => {
    // get all courses
});

router.get('/:id', (req, res) => {
    const courseId = req.params.id;

    // get course by id
});