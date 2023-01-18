import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BaseSchema } from "src/common/schema";

@Schema({timestamps: true})
export class DrivingSlot extends BaseSchema {

  @ApiProperty({example: 'string', description: 'Registration ID'})
  @Prop({required: true})
  registrationID: string

  @Prop({required: true})
  studentID: string;

  @Prop({type: String, required: true})
  instructorID: string;

  @Prop({required: true})
  classID: string;

  @Prop({ required: true })
  dateTimeStartOfClass: Date;
}


export type DrivingSlotDocument = DrivingSlot & Document;

export const DrivingSlotSchema = SchemaFactory.createForClass(DrivingSlot);
