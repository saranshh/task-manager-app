import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const router = Router();
const prisma = new PrismaClient();
const userSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});
router.post('/register', async (req, res) => {
    const { username, password } = userSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
        select: {
            id: true,
            username: true,
        },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ user, token });
});
router.post('/login', async (req, res) => {
    const { username, password } = userSchema.parse(req.body);
    const user = await prisma.user.findUnique({
        where: { username },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({
        user: {
            id: user.id,
            username: user.username,
        },
        token,
    });
});
export default router;
