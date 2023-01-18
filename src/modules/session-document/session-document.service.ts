import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadFile } from 'src/common/awsS3';
import { DrivingSlot, DrivingSlotDocument } from './driving-slot.entity';
import { SessionDocumentDto } from './session-document.dto';
import { SessionDocument, SessionDocumentDocument } from './session-document.entity';
import fs = require('fs');
import csvparser = require("csv-parser");
import _ from 'lodash';


@Injectable()
export class SessionDocumentService {

  constructor(
    @InjectModel(SessionDocument.name)
    private readonly sessionDocumentModel: Model<SessionDocumentDocument>,
    @InjectModel(DrivingSlot.name)
    private readonly drivingSlotModel: Model<DrivingSlotDocument>,
  ) { }

  async create(files: any, ) {
    // const breakIndex = files[0].originalname.lastIndexOf('.');
    const fileLocation = await uploadFile(files);
    this.readCSVFile(files[0].originalname)
    return {message: "File uploaded successfull", fileId:"1234"};
  }

  async readCSVFile(fileLocation: string) {

    const stream = await fs.createReadStream(fileLocation)
    let rows = [];
    await stream.pipe(csvparser())
      .on("data", function (data) {
        try {
          data.registrationID
          rows.push(data);
        } catch (err) {
          //error handler
          console.log(err);
        }
      })
      .on("end", (rowCount) => {
        this.validateInsertSession(rows);
      })
      .on('error', function (err) {
        // do something with `err`
      });
  }


 async validateInsertSession(rows: DrivingSlot[]) {
  const resultArray = [];
    for (const key in rows) {
        console.log(rows[key].registrationID)
        rows[key].registrationID = !(rows[key].registrationID)?'123':rows[key].registrationID;
        rows[key].dateTimeStartOfClass = new Date(rows[key].dateTimeStartOfClass);
        rows[key] = _.omit(rows[key], 'Add');
        const validateSt = await this.validateClass(rows[key]);
        if(!validateSt){
          resultArray.push({message:"validation issue"})
        }
        const insertResult =  await this.drivingSlotModel.create(rows[key])  
        resultArray.push({message:"inserted successfully", insertResult})
    }
    return resultArray
  }


  async validateClass(row : DrivingSlot){

    const dateOnly = new Date(row.dateTimeStartOfClass.toISOString().slice(0, 10));

    return  await this.drivingSlotModel.find({studentID: row.studentID, dateTimeStartOfClass: dateOnly},{_id:1}).lean()
  }


  findOne(id: number) {
    return `This action returns a #${id} sessionDocument`;
  }
}


