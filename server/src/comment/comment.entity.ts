import { Column, Entity, Index, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import AbstractEntity from '../shared/utils/Entity'
import { makeId } from '../shared/utils'
import User from '../user/user.entity';
import Post from '../post/post.entity';
import Vote from '../vote/vote.entity';
import { Exclude } from 'class-transformer';

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

    @Exclude()
    @OneToMany(() => Vote, (vote) => vote.comment, { eager: true })
    public votes: Vote[]

    protected userVote: number
    setUserVote(user: User) {
        const index = this.votes?.findIndex(v => v.userId === user.id)
        this.userVote = index > -1 ? this.votes[index].value : 0
    }

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(8)
    }
}