  import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
  import { CreateTransactionDto } from './dto/create-transaction.dto';
  import { UpdateTransactionDto } from './dto/update-transaction.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Transaction } from './entities/transaction.entity';
  import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class TransactionService {
    
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>, 
  ) {}
  
  async createTransaction(dto: CreateTransactionDto, user: User): Promise<Transaction> {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${dto.categoryId} not found.`);
    }

    const transaction = this.transactionRepo.create({
      ...dto,
      user: user,
      category: category, 
    });
    return this.transactionRepo.save(transaction);
  }

  async getCategories(user: User): Promise<Transaction[]> {
      return this.transactionRepo.find({
        where: { user: { id: user.id } },
        order: { date: 'DESC' },
      });
    }


  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
