import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/orders.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders() {
    return this.ordersService.getAllOrders();
  }

  @Post()
  async createOrder(
    @Body(new ValidationPipe({ transform: true })) createOrderDto: CreateOrderDto,
  ) {
    console.log(createOrderDto);
    
    // Add custom date-time control
    createOrderDto.created_at = createOrderDto.created_at || new Date().toISOString();
    return this.ordersService.createOrder(createOrderDto);
  }
}
