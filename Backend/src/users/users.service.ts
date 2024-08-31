import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UsersService {
  private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  async getAllUsers() {
    const { data, error } = await this.supabase.from('Users').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

}
