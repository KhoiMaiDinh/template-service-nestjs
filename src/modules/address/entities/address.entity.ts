import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  address_id: number;

  @Column({ nullable: false, type: 'float' })
  longitude!: number | null;

  @Column({ nullable: false, type: 'float' })
  latitude!: number | null;
}
