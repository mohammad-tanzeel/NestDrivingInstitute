import { ApiProperty } from "@nestjs/swagger";
import fileUpload from "express-fileupload";

export class SessionDocumentDto {

    @ApiProperty({type: 'string', format: 'binary'})
    file : fileUpload.UploadedFile
}

