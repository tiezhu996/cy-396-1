import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  private tutorialReviews: any[] = [];
  private productReviews: any[] = [];

  reviewTutorial(tutorialId: number, payload: { userId: number; rating: number; comment: string }) {
    const review = { id: Date.now(), tutorialId, ...payload };
    this.tutorialReviews.push(review);
    return review;
  }

  reviewProduct(productId: number, payload: { userId: number; rating: number; comment: string; images: string[] }) {
    const review = { id: Date.now(), productId, ...payload };
    this.productReviews.push(review);
    return review;
  }

  stats() {
    return { tutorialReviewCount: this.tutorialReviews.length, productReviewCount: this.productReviews.length };
  }
}
