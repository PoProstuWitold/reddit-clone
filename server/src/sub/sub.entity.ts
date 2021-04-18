import { Column, Entity, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import AbstractEntity from '../shared/utils/Entity'
import User from '../user/user.entity';
import Post from '../post/post.entity';
import { Expose } from 'class-transformer';

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

    @Column()
    public userId: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public user: User

    @OneToMany(() => Post, (post) => post.sub)
    public posts: Post[]

    @Expose()
    get imageUrl(): string {
        return this.imageUrn
            ? `${process.env.APP_URL}/public/images/${this.imageUrn}`
            : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    }

    @Expose()
    get bannerUrl(): string | undefined {
        return this.bannerUrn
            ? `${process.env.APP_URL}/public/images/${this.bannerUrn}`
            : undefined
    }
}