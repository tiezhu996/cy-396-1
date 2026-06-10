import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly service: ReviewService) {}
  @Post('reviews/tutorials/:id') reviewTutorial(@Param('id') id: string, @Body() body: any) { return this.service.reviewTutorial(Number(id), body); }
  @Post('reviews/products/:id') reviewProduct(@Param('id') id: string, @Body() body: any) { return this.service.reviewProduct(Number(id), body); }
  @Get('reviews/stats') stats() { return this.service.stats(); }
}
