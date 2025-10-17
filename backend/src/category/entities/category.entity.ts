import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, ManyToOne} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Budget } from 'src/budget/entities/budget.entity';
import { RecurringTransaction } from 'src/recurring-transaction/entities/recurring-transaction.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['INCOME', 'EXPENSE'] })
    type: 'INCOME' | 'EXPENSE';

    @Column()
    color: string;

    @Column({type: 'boolean', default: false})
    isDefault: boolean;
 
    @ManyToOne(() => User, user => user.categories, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];

    @OneToMany(() => RecurringTransaction, recurringTransaction => recurringTransaction.category)
    recurringTransactions: RecurringTransaction[];

    @OneToMany(() => Budget, budget => budget.category) 
    budgets: Budget[];
}
