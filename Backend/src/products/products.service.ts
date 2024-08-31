import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { CreateProductDto } from './dto/products.dto';

dotenv.config();

@Injectable()
export class ProductsService {
  private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  async getAllProducts() {
    const { data, error } = await this.supabase.from('Products').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { data, error } = await this.supabase.from('Products').insert(createProductDto);
    if (error) throw new Error(error.message);
    return data;
  }
}
