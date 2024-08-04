import { Router } from 'express';
import { check } from 'express-validator';
import {authMiddleware} from '../middlewares/authMiddleware';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById ,registerUser, loginUser} from '../controllers/userController';

const router = Router();
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    registerUser
);

// Login route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    loginUser
);
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId',authMiddleware, getUserById);
router.put('/:userId', authMiddleware,updateUserById);
router.delete('/:userId',authMiddleware, deleteUserById);

export default router;
