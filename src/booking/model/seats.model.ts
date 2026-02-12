import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Booking } from './booking.model';

@Table({
  tableName: 'seats',
  timestamps: true,
  version: true,
  createdAt: false,
  updatedAt: false,
})
export class Seat extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  declare seat_number: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_available: boolean;

  @HasMany(() => Booking)
  declare bookings: Booking[];
}
