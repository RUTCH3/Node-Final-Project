import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mailService: MailService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('send_email')
  async handleEmailEvent(@Payload() data: { to: string; subject: string; text: string }) {
    await this.mailService.sendMail(data.to, data.subject, data.text);
  }
}
