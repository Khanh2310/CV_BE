import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  private nodemailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {}
}
