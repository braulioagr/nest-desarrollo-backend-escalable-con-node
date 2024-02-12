import { Injectable } from '@nestjs/common';
import { CreateUnestDto } from './dto/create-unest.dto';
import { UpdateUnestDto } from './dto/update-unest.dto';

@Injectable()
export class UnestService {
  create(createUnestDto: CreateUnestDto) {
    return 'This action adds a new unest';
  }

  findAll() {
    return `This action returns all unest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unest`;
  }

  update(id: number, updateUnestDto: UpdateUnestDto) {
    return `This action updates a #${id} unest`;
  }

  remove(id: number) {
    return `This action removes a #${id} unest`;
  }
}
