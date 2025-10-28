import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
  ) {}
  
  async createCategory(dto: CreateCategoryDto, user: User): Promise<Category> {
    const existing = await this.categoryRepo.findOne({
      where: { name: dto.name, user: { id: user.id } },
    });

    if (existing) {
      throw new BadRequestException('Category with this name already exists');
    }

    const category = this.categoryRepo.create({
      ...dto,
      isDefault: dto.isDefault || false,
      user,
    });

    return this.categoryRepo.save(category);
  }

  async getCategories(user: User): Promise<Category[]> {
    return this.categoryRepo.find({
      where: { user: { id: user.id } },
      order: { name: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}