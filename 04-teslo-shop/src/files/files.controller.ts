import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  fineProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ){
    const path: string =  this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    // limits: { fileSize: 10000 }
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile()
    file: Express.Multer.File
  ){

    if(!file) {
      throw new BadRequestException("Make sure that the file is an image");
    }

    // const secureUrl: string = `${file.filename}`
    const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;

    return {
      secureUrl
    };
  }
}
