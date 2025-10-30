import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('api/transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() dto: CreateTransactionDto,
    @GetUser() user: User
  ) {
    const transaction = await this.transactionService.createTransaction(dto, user);
    return {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
    };
  }

  @Get()
  async getTransactions(@GetUser() user: User) {
    const transactions = await this.transactionService.getTransactions(user);
    return transactions.map(tr => ({
      id: tr.id,
      amount: tr.amount,
      description: tr.description,
      date: tr.date,
      categoryId: tr.category.id
    }));
  }

  // @Post()
  // create(@Body() createTransactionDto: CreateTransactionDto) {
  //   return this.transactionService.create(createTransactionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.transactionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionService.remove(+id);
  // }
}
