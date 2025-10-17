import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity('budgets')
@Unique(['user', 'category', 'year', 'month'])
export class Budget {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    year: number;

    @Column({ type: 'int' })
    month: number;

    @Column('decimal', { precision: 10, scale: 2 })
    limitAmount: number;

    @ManyToOne(() => User, user => user.budgets, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Category, category => category.budgets, { onDelete: 'CASCADE' })
    category: Category;
}
