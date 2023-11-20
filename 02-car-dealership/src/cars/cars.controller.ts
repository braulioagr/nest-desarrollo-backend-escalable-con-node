import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, } from '@nestjs/common';
import { CarsService } from './cars.service';
import { log } from 'console';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  
  constructor(
    private readonly carsService: CarsService
  ){}

  @Get()
  getAllCars(): any[] {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(
    @Param('id',ParseUUIDPipe) id
  ) {
    log({id: id})
    return this.carsService.findOneById(id);
  }

  @Post()
  create(
    @Body() createCarDto: CreateCarDto
  ) {
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.carsService.delete(id);
  }
}
