import { Column, Entity, Index, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import AbstractEntity from '../shared/utils/Entity'
import { makeId, slugify } from '../shared/utils'
import User from '../user/user.entity';
import Sub from '../sub/sub.entity';
import Comment from '../comment/comment.entity';
import { Exclude, Expose } from 'class-transformer';
import Vote from '../vote/vote.entity';

@Entity()
export default class Post extends AbstractEntity {
    @Index()
    @Column()
    public identifier: string // 7 Character Id

    @Column()
    public title: string

    @Index()
    @Column()
    public slug: string

    @Column({ nullable: true, type: 'text' })
    public body: string

    @Column()
    public subName: string

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public user: User

    @ManyToOne(() => Sub, (sub) => sub.posts)
    @JoinColumn({ name: 'sub_name', referencedColumnName: 'name' })
    public sub: Sub

    @Exclude()
    @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
    public comments: Comment[]

    @Exclude()
    @OneToMany(() => Vote, (vote) => vote.post, { eager: true })
    public votes: Vote[]

    @Expose() get url(): string {
        return `/r/${this.subName}/${this.identifier}/${this.slug}`
    }

    @Expose() get commentCount(): number {
        return this.comments?.length
    }
    
    @Expose() get voteScore(): number {
        return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0)
    }

    protected userVote: number
    setUserVote(user: User) {
        const index = this.votes?.findIndex(vote => vote.userId === user.id)
        return this.userVote = index > -1 ? this.votes[index].value : 0
    }

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7)
        this.slug = slugify(this.title)
    }
}