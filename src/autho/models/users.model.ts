import { Model } from 'sequelize-typescript';
import { AutoIncrement, Column, PrimaryKey, Table } from 'sequelize-typescript';
@Table({
  tableName: 'Users',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @Column
  declare username: string;
  @Column
  declare email: string;
  @Column
  declare password: string;
  @Column
  declare refreshToken: string;
}
