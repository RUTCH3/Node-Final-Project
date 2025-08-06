import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { MeetingModule } from './meeting/meeting.module';
import { UsersModule } from './users/users.module';
import { BusinessModule } from './business/business.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailService } from './mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'test_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ServicesModule,
    MeetingModule,
    UsersModule,
    BusinessModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService, AuthService],
  exports: [MailService],
})
export class AppModule { }
