import { Column, Entity, Index, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import AbstractEntity from '../shared/utils/Entity'
import { makeId, slugify } from '../shared/utils'
import User from '../user/user.entity';
import Sub from '../sub/sub.entity';
import Comment from '../comment/comment.entity';
import { Expose } from 'class-transformer';

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

    @OneToMany(() => Comment, (comment) => comment.post)
    public comments: Comment[]

    @Expose() get url(): string {
        return `/r/${this.subName}/${this.identifier}/${this.slug}`
    }

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7)
        this.slug = slugify(this.title)
    }
}