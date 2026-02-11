/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table({
  tableName: 'Orders',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
})
export class Orders extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @Column
  declare name: string;
  @Column
  declare price: number;
  @Column
  declare status: string;
}
