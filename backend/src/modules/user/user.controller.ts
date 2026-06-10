import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post(':id/follows') follow(@Param('id') id: string, @Body('authorId') authorId: number) { return this.service.follow(Number(id), Number(authorId)); }
  @Post(':id/favorites') favorite(@Param('id') id: string, @Body() body: any) { return this.service.favorite(Number(id), body.targetType, Number(body.targetId)); }
  @Get(':id/feed') feed(@Param('id') id: string) { return this.service.feed(Number(id)); }
  @Get('activity/stats') activity(@Query('range') range = 'month') { return { range, activeUsers: 128, newFavorites: 342 }; }
}
