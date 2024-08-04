import { Model, DataTypes, Sequelize } from 'sequelize';

class Comment extends Model {
    public id!: number;
    public content!: string;
    public userId!: number;
    public postId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Comment.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            content: {
                type: new DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, {
            tableName: 'comments',
            sequelize,
        });
    }
}

export default Comment;
