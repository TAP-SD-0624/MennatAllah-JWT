import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

import User from './user';
import Post from './post';
import Category from './category';
import Comment from './comment';
import PostCategory from './postCategory';

// Initialize models
User.initModel(sequelize);
Post.initModel(sequelize);
Category.initModel(sequelize);
Comment.initModel(sequelize);
PostCategory.initModel(sequelize);

// Define associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.belongsToMany(Category, { through: PostCategory, as: 'categories', foreignKey: 'postId' });
Category.belongsToMany(Post, { through: PostCategory, as: 'posts', foreignKey: 'categoryId' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

export { sequelize, User, Post, Category, Comment, PostCategory };
