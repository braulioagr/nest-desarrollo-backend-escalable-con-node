import { PartialType } from '@nestjs/mapped-types';
import { CreateUnestDto } from './create-unest.dto';

export class UpdateUnestDto extends PartialType(CreateUnestDto) {}
