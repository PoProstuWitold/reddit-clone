import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import User from '../user/user.entity';
import Comment from '../comment/comment.entity';
import Post from '../post/post.entity';
import AbstractEntity from '../shared/utils/Entity';

@Entity()
export default class Vote extends AbstractEntity {
    @Column()
    public value: number

    @Column()
    public userId: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public user: User

    @ManyToOne(() => Post)
    public post: Post

    @ManyToOne(() => Comment)
    public comment: Comment
}