import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'consoleUserAccessToken' })
export class ConsoleUserAccessTokenEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'consoleUserId', nullable: false })
  consoleUserId: number;

  @Column('char', {
    name: 'accessToken',
    length: 36,
    default: '',
    nullable: true,
  })
  accessToken: string;

  @Column('text', { name: 'requestResult' })
  requestResult: string;

  @Column('timestamp', { name: 'expiryAt' })
  expiryAt: string;

  @Column({
    type: 'timestamp',
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
}
