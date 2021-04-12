import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public email: string

    @Column()
    public firstName: string

    @Column()
    public lastName: string

    @Column({ select: false })
    public password: string
}