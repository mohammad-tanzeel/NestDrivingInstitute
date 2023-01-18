import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, BadRequestException } from '@nestjs/common';
import { SessionDocumentService } from './session-document.service';
import { SessionDocumentDto } from './session-document.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { formatError } from 'src/common/utils';


@Controller('session-document')
export class SessionDocumentController {
  constructor(private readonly sessionDocumentService: SessionDocumentService) {}


  @Post('add')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))

  create(@UploadedFiles() files : any[], @Body() sessionDocumentDto: SessionDocumentDto) {
    // console.log(files);
    try{
      const regex = new RegExp("(.*?).(csv)$");
      for (const key in files) {
          // const element = files[key];
          if (!regex.test(files[key].originalname)) {
            throw new BadRequestException(
              formatError({
                message: "Only csv file can be uploaded",
              })
            )
          }
      }
      
      return this.sessionDocumentService.create(files);
    } catch(error){
      throw new BadRequestException(
        formatError({
          message: error.message,
        })
      )
    }
  }


  @Post('update')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))

  update(@UploadedFiles() files : any[], @Body() sessionDocumentDto: SessionDocumentDto) {
    // console.log(files);
    try{
      const regex = new RegExp("(.*?).(csv)$");
      for (const key in files) {
          // const element = files[key];
          if (!regex.test(files[key].originalname)) {
            throw new BadRequestException(
              formatError({
                message: "Only csv file can be uploaded",
              })
            )
          }
      }
      
      return this.sessionDocumentService.create(files);
    } catch(error){
      throw new BadRequestException(
        formatError({
          message: error.message,
        })
      )
    }
  }

  
  @Post('delete')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))

  delete(@UploadedFiles() files : any[], @Body() sessionDocumentDto: SessionDocumentDto) {
    // console.log(files);
    try{
      const regex = new RegExp("(.*?).(csv)$");
      for (const key in files) {
          // const element = files[key];
          if (!regex.test(files[key].originalname)) {
            throw new BadRequestException(
              formatError({
                message: "Only csv file can be uploaded",
              })
            )
          }
      }
      
      return this.sessionDocumentService.create(files);
    } catch(error){
      throw new BadRequestException(
        formatError({
          message: error.message,
        })
      )
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionDocumentService.findOne(+id);
  }

}
