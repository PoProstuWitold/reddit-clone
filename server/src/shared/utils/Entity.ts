import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { classToPlain } from 'class-transformer'
  
export default abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @CreateDateColumn()
    createAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
    
    toJSON() {
        return classToPlain(this)
    }
}