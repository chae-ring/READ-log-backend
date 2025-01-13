import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReviewDto, ReviewResponseDto } from '../dto/reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  // 리뷰 생성
  async createReview(createReviewDto: CreateReviewDto, userId: number) {
    return await this.prisma.review.create({
      data: {
        userId,
        title: createReviewDto.title,
        content: createReviewDto.content,
        rating: createReviewDto.rating,
      },
    });
  }

  // 모든 리뷰 조회
  async getReviews(userId: number): Promise<ReviewResponseDto[]> {
    const reviews = await this.prisma.review.findMany({
      where: { userId },
    });

    return reviews.map((review) => this.mapToResponseDto(review));
  }

  // 리뷰 수정
  async updateReview(
    userId: number,
    reviewId: number,
    updateDto: CreateReviewDto,
  ) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return await this.prisma.review.update({
      where: { id: reviewId },
      data: {
        title: updateDto.title,
        content: updateDto.content,
        rating: updateDto.rating,
      },
    });
  }

  // 리뷰 삭제
  async deleteReview(userId: number, reviewId: number) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return await this.prisma.review.delete({
      where: { id: reviewId },
    });
  }
  // Review 객체를 ResponseDto로 변환하는 메소드
  private mapToResponseDto(review: any): ReviewResponseDto {
    return {
      id: review.id,
      userId: review.userId,
      title: review.title,
      content: review.content,
      rating: review.rating,
      created_at: review.created_at,
      updated_at: review.updated_at,
    };
  }
}
