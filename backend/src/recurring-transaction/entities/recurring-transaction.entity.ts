import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Entity('recurring_transactions')
export class RecurringTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column({type: 'int'})
    dayOfMonth: number;

    @Column({type: 'boolean', default: true})
    isActive: boolean;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    endDate: Date;

    @ManyToOne(() => User, user => user.recurringTransactions)
    user: User;

    @ManyToOne(() => Category, category => category, { onDelete: 'CASCADE' })
    category: Category;

    @OneToMany(() => Transaction, transaction => transaction.recurringTransaction)
    transactions: Transaction[];
}
