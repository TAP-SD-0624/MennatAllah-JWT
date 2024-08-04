import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import { User } from '../models';
dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } 
        if(req.user?.id !== user?.id){
          res.status(403).json({ message: 'Forbidden' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
        const user=await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } 
        if(req.user?.id !== user?.id){
          res.status(403).json({ message: 'Forbidden' });
        }
        const [updated] = await User.update(req.body, {
            where: { id: req.params.userId }
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error'  });
    }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
        const user=await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } 
        if(req.user?.id !== user?.id){
          res.status(403).json({ message: 'Forbidden' });
        }
        const deleted = await User.destroy({
            where: { id: req.params.userId }
        });
       
    } catch (error) {
        res.status(500).json({ error: 'Server error'  });
    }
};

