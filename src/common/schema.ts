import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";


@Schema()
export class BaseSchema {
  @ApiProperty({type: String, example:'631748a148d5ce556279800c'})
  _id: mongoose.Schema.Types.ObjectId;
}
