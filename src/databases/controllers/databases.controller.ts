import { Controller } from '@nestjs/common';
import { DatabasesService } from '../services/databases.service';

@Controller('databases')
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}
}
