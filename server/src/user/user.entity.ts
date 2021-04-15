import { Exclude } from 'class-transformer';
import AbstractEntity from 'src/shared/utils/Entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export default class User extends AbstractEntity {
    @Index()
    @Column({ unique: true })
    public email: string

    @Column()
    public firstName: string

    @Column()
    public lastName: string

    @Column({ unique: true })
    public nick: string

    @Exclude()
    @Column()
    public password: string
}