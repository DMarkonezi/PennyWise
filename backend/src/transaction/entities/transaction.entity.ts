import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { RecurringTransaction } from 'src/recurring-transaction/entities/recurring-transaction.entity';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal',  { precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column({type: 'timestamp'})
    date: Date;

    @ManyToOne(() => User, user => user.transactions, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Category, category => category.transactions, { onDelete: 'CASCADE' })
    category: Category;

    @ManyToOne(() => RecurringTransaction, recurring => recurring.transactions, 
        { 
            nullable: true,
            onDelete: 'SET NULL' // If the recTr is deleted, thenb this is set to null
        }
    )
    recurringTransaction: RecurringTransaction | null;
}