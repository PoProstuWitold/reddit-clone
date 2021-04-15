import { Column, Entity, Index, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import AbstractEntity from '../shared/utils/Entity'
import { makeId, slugify } from '../shared/utils'
import User from '../user/user.entity';
import Sub from '../sub/sub.entity';

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
    @JoinColumn({ name: 'nick', referencedColumnName: 'nick' })
    public user: User

    @ManyToOne(() => Sub, (sub) => sub.posts)
    @JoinColumn({ name: 'sub_name', referencedColumnName: 'name' })
    public sub: Sub

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7)
        this.slug = slugify(this.title)
    }
}