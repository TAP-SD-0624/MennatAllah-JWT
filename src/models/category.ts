import { Model, DataTypes, Sequelize } from 'sequelize';

class Category extends Model {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Category.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
        }, {
            tableName: 'categories',
            sequelize,
        });
    }
}

export default Category;
