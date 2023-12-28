import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', synchronize: false })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
