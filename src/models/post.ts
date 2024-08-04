import { Model, DataTypes, Sequelize } from 'sequelize';

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Post.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            content: {
                type: new DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, {
            tableName: 'posts',
            sequelize,
        });
    }
}

export default Post;
