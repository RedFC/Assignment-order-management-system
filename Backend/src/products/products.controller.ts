import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return this.productsService.getAllProducts();
  }

  @Post()
  async createProduct(
    @Body(new ValidationPipe({ transform: true })) createProductDto: CreateProductDto,
  ) {
    return this.productsService.createProduct(createProductDto);
  }
}
