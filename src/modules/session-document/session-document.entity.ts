import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "src/common/schema";
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

@Schema()
class FileStat {

  @ApiProperty({example: 'csv', description: 'The Type of the File'})
  @Prop({required: true})
  type: string

  @ApiProperty({example: 'string', description: 'Location of the file storage'})
  @Prop({required: true})
  file: string

  @Prop({required: true})
  label: string;

  @Prop({type: Number, required: true})
  size: number;

  @Prop({required: true})
  mimeType: string;
}


@Schema({timestamps: true})
export class SessionDocument extends BaseSchema {
     
    @Prop(FileStat)
    document:FileStat
  
    @Prop({type: String, enum: ['pending', 'inprogress', 'completed'], default: 'pending', required: true})
    status: string
  
}

export type SessionDocumentDocument = SessionDocument & Document;

export const SessionDocumentSchema = SchemaFactory.createForClass(SessionDocument);