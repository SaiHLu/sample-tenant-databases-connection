import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenants')
export class TenantEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  db_name: string;
}
