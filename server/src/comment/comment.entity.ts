import { Column, Entity, Index, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import AbstractEntity from '../shared/utils/Entity'
import { makeId } from '../shared/utils'
import User from '../user/user.entity';
import Post from '../post/post.entity';

@Entity()
export default class Comment extends AbstractEntity {
    @Index()
    @Column()
    public identifier: string

    @Column()
    public body: string

    @Column()
    public userId: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public user: User

    @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
    public post: Post

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(8)
    }
}