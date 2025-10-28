import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @GetUser() user: User,
  ) {
    const category = await this.categoryService.createCategory(dto, user);
    return {
      id: category.id,
      name: category.name,
      type: category.type,
      color: category.color,
      isDefault: category.isDefault,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCategories(@GetUser() user: User) {
    const categories = await this.categoryService.getCategories(user);
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      type: cat.type,
      color: cat.color,
      isDefault: cat.isDefault,
    }));
  }
}