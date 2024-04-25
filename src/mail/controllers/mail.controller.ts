import { Controller, Get } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { Public } from 'src/auth/decorator';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService,
    private mailerService: MailerService) {}
  

  @Get()
  @Public()
  async handleTestEmail() {
    await this.mailerService.sendMail({
      to: "hoangquocbao150@gmail.com",
      from: "Support Team <support@example.com>",
      subject: "Welcome to nice",
      template: "job"
      
    })
  }

}
