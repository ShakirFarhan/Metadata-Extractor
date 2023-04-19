import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { QeuryDto, databaseRequest } from './types';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
  @Get()
  getConnection(@Body() databaseInfo: databaseRequest) {
    return this.databaseService.getDatabaseConnection(databaseInfo);
  }
  @Get('/getQuery')
  getQuery(@Body() queryDto: QeuryDto) {
    return this.databaseService.getQuery(queryDto);
  }
}
