import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { RecurringTransactionModule } from './recurring-transaction/recurring-transaction.module';
import { BudgetModule } from './budget/budget.module';
import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { RecurringTransaction } from './recurring-transaction/entities/recurring-transaction.entity';
import { Budget } from './budget/entities/budget.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pennywise',
      entities: [User, Category, Transaction, RecurringTransaction, Budget],
      autoLoadEntities: true, 
      synchronize: true,
      logging: true,     
    }),
    UserModule,
    TransactionModule,
    CategoryModule,
    BudgetModule,
    RecurringTransactionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}