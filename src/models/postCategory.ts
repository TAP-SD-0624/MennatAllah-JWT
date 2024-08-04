import { Model, DataTypes, Sequelize } from 'sequelize';

class PostCategory extends Model {
    public postId!: number;
    public categoryId!: number;

    public static initModel(sequelize: Sequelize): void {
        PostCategory.init({
            postId: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
            categoryId: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
        }, {
            tableName: 'post_categories',
            sequelize,
        });
    }
}

export default PostCategory;
