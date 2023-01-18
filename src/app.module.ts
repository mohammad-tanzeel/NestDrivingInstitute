import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionDocumentModule } from './modules/session-document/session-document.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/institute'),    
    SessionDocumentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
