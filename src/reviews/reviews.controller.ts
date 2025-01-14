import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateReviewDto, ReviewResponseDto } from '../dto/reviews.dto';
import { ReviewsService } from './reviews.service';
import { StatisticsService } from './statistics.service';
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트
import { ParseIntPipe } from '@nestjs/common'; // 추가: ParseIntPipe 임포트
import { StatType } from '@prisma/client'; // Status 임포트
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Post()
  @UseGuards(BearerGuard) // 인증된 사용자만 접근
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
  })
  async createReview(
    @Body() createReviewDto: CreateReviewDto, // 독서록 작성 데이터
    @Request() req, // 사용자 정보를 요청에서 가져옴
  ) {
    const userId = req.user.id; // 현재 로그인한 사용자의 ID 추출
    const review = await this.reviewsService.createReview(
      createReviewDto,
      userId,
    );
    return { data: review };
  }
  // 모든 리뷰 조회
  @Get()
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ type: ReviewResponseDto })
  async getReviews(@Request() req): Promise<{ data: ReviewResponseDto[] }> {
    const userId = req.user.id;
    const reviews = await this.reviewsService.getReviews(userId);
    return { data: reviews };
  }

  // 리뷰 수정
  @Patch(':id')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({ status: 200, description: 'Review updated successfully.' })
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: CreateReviewDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    const updatedReview = await this.reviewsService.updateReview(
      userId,
      id,
      updateReviewDto,
    );
    return { data: updatedReview };
  }

  // 리뷰 삭제
  @Delete(':id')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully.' })
  async deleteReview(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id;
    await this.reviewsService.deleteReview(userId, id);
    return { message: 'Review deleted successfully.' };
  }

  // 연도별 통계 조회
  @Get('yearly/:statType')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get yearly statistics' })
  async getYearlyStatistics(
    @Request() req,
    @Param('statType') statType: StatType,
  ) {
    const userId = req.user.id;
    const statistics = await this.statisticsService.getYearlyStatistics(
      userId,
      statType,
    );
    return { data: statistics };
  }

  // 월별 통계 조회
  @Get('monthly/:statType')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get monthly statistics' })
  async getMonthlyStatistics(
    @Request() req,
    @Param('statType') statType: StatType,
  ) {
    const userId = req.user.id;
    const statistics = await this.statisticsService.getMonthlyStatistics(
      userId,
      statType,
    );
    return { data: statistics };
  }

  // 장르별 통계 조회
  @Get('genre/:statType')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get genre statistics' })
  async getGenreStatistics(
    @Request() req,
    @Param('statType') statType: StatType,
  ) {
    const userId = req.user.id;
    const statistics = await this.statisticsService.getGenreStatistics(
      userId,
      statType,
    );
    return { data: statistics };
  }

  // 독서 상태별 통계 조회
  @Get('status/:statType')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get status statistics' })
  async getStatusStatistics(
    @Request() req,
    @Param('statType') statType: StatType,
  ) {
    const userId = req.user.id;
    const statistics = await this.statisticsService.getStatusStatistics(
      userId,
      statType,
    );
    return { data: statistics };
  }
}
