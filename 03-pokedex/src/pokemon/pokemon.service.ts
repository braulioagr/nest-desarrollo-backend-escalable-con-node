import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  public async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }
    catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(parameters: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = parameters;
      return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public async findOne(term: string) {
    let pokemon: Pokemon;

    if(!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if(!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    if(!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    }

    return pokemon;
  }

  public async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon: Pokemon = await this.findOne(term);
    
    if(updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public async remove(id: string) {
    // const pokemon =  await this.findOne(id);
    // await pokemon.deleteOne();
    // const result =  await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if(deletedCount == 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }

  private handleExceptions(error: any) {
    if(error.code == 11000) {
      throw new BadRequestException(`pokemon exist in db: ${ JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }

}
