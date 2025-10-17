import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { RecurringTransaction } from '../../recurring-transaction/entities/recurring-transaction.entity';
import { Budget } from '../../budget/entities/budget.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    // Relations

    @OneToMany(() => Category, category => category.user)
    categories: Category[];

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];

    @OneToMany(() => RecurringTransaction, recurring => recurring.user)
    recurringTransactions: RecurringTransaction[];

    @OneToMany(() => Budget, budget => budget.user)
    budgets: Budget[];
}
