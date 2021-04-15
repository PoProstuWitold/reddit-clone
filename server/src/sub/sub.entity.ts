import { Column, Entity, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import AbstractEntity from '../shared/utils/Entity'
import User from '../user/user.entity';
import Post from '../post/post.entity';

@Entity()
export default class Sub extends AbstractEntity {
    @Index()
    @Column({ unique: true })
    public name: string

    @Column()
    public title: string

    @Column({ type: 'text', nullable: true })
    public description: string

    @Column({ nullable: true })
    public imageUrn: string

    @Column({ nullable: true })
    public bannerUrn: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'nick', referencedColumnName: 'nick' })
    public user: User

    @OneToMany(() => Post, (post) => post.sub)
    public posts: Post[]
}