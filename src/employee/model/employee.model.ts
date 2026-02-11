/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'Records',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
})
export class Records extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  })
  declare balance: number;

  @Column
  declare amount: number;
}
