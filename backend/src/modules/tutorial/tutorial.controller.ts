import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TutorialStatus } from '../../constants/enums';
import { TutorialService } from './tutorial.service';

@Controller('tutorials')
export class TutorialController {
  constructor(private readonly service: TutorialService) {}

  @Post()
  create(@Body() body: any) { return this.service.create({ ...body, status: body.status ?? TutorialStatus.Draft }); }

  @Get()
  search(@Query() query: any) { return this.service.search(query); }

  @Get('hot')
  hot() { return this.service.hot(); }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TutorialStatus) { return this.service.updateStatus(Number(id), status); }
}
