import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnestService } from './unest.service';
import { CreateUnestDto } from './dto/create-unest.dto';
import { UpdateUnestDto } from './dto/update-unest.dto';

@Controller('unest')
export class UnestController {
  constructor(private readonly unestService: UnestService) {}

  @Post()
  create(@Body() createUnestDto: CreateUnestDto) {
    return this.unestService.create(createUnestDto);
  }

  @Get()
  findAll() {
    return this.unestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnestDto: UpdateUnestDto) {
    return this.unestService.update(+id, updateUnestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unestService.remove(+id);
  }
}
