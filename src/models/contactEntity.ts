import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'contact_entity' })
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, type: 'varchar' }) 
  phone_number!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  email!: string | null;

  @Column({ nullable: true, type: 'integer' })
  linked_id!: number | null;

  @Column({ nullable: false, type: 'varchar' }) 
  link_precedence!: 'primary' | 'secondary';

  @Column({ nullable: false, type: 'timestamp' }) 
  created_at!: Date;

  @Column({ nullable: false, type: 'timestamp' })
  updated_at!: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  deleted_at!: Date | null;
}
