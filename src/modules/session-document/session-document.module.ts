import { Module } from '@nestjs/common';
import { SessionDocumentService } from './session-document.service';
import { SessionDocumentController } from './session-document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionDocument, SessionDocumentSchema } from './session-document.entity';
import { DrivingSlot, DrivingSlotSchema } from './driving-slot.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: SessionDocument.name, schema: SessionDocumentSchema}]), MongooseModule.forFeature([{name: DrivingSlot.name, schema: DrivingSlotSchema}])],
  controllers: [SessionDocumentController],
  providers: [SessionDocumentService]
})
export class SessionDocumentModule {}
