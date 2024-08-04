import express from 'express';
import  sequelize  from './config/database';
import { User, Post, Category, Comment, PostCategory } from './models';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
export default app;