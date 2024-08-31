import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { CreateOrderDto } from './dto/orders.dto';

dotenv.config();

@Injectable()
export class OrdersService {
    private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    async getAllOrders() {
        const { data, error } = await this.supabase.from('Orders').select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    async createOrder(createOrderDto: CreateOrderDto) {
        const { data, error } = await this.supabase.from('Orders').insert(createOrderDto);
        if (error) { 
            console.log(error.message);
            throw new Error(error.message) 
        };
        return data;
    }
}
