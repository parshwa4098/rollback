import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Seat } from './seats.model';
@Table({
  tableName: 'bookings',
  timestamps: true,
  createdAt: false,
  updatedAt: false,
})
export class Booking extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;
  @ForeignKey(() => Seat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare seat_id: number;

  @Column({
    type: DataType.ENUM('confirmed', 'cancelled'),
    defaultValue: 'confirmed',
  })
  declare status: string;

  @BelongsTo(() => Seat)
  seat?: Seat;
}
