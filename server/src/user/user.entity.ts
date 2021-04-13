import { classToPlain, Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Index()
    @Column({ unique: true })
    public email: string

    @Column()
    public firstName: string

    @Column()
    public lastName: string

    @Exclude()
    @Column()
    public password: string

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date

    toJSON() {
        return classToPlain(this)
    }
}