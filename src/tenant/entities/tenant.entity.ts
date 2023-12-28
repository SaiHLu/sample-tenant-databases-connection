import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenants', { synchronize: false })
export class TenantEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  db_name: string;

  @Column({ nullable: true })
  test: string;
}
