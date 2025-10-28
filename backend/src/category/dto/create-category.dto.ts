export class CreateCategoryDto {
    name: string;
    type: 'INCOME' | 'EXPENSE';
    color: string;
    isDefault?: boolean;
}