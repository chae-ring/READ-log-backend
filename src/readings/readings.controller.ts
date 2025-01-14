import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트
import {
  CreateReadingDto,
  GetReadingStatusResponseDTO,
  ReadingStatus,
} from '../dto/readings.dto'; // DTO 임포트
import { ReadingsService } from './readings.service'; // Service 임포트
import { Status } from '@prisma/client'; // Status 임포트
import { ParseIntPipe } from '@nestjs/common'; // 추가: ParseIntPipe 임포트
import { StatisticsService } from 'src/reviews/statistics.service'; // 통계 서비스 임포트

@ApiTags('Readings')
@Controller('readings')
export class ReadingsController {
  constructor(
    private readonly readingsService: ReadingsService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Post()
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a reading status' })
  @ApiResponse({ type: ReadingStatus })
  async registerReading(
    @Body() createReadingDto: CreateReadingDto,
    @Request() req,
  ) {
    const userId = req.user.id; // 사용자 ID 추출
    const reading = await this.readingsService.createReading(
      createReadingDto,
      userId,
    );

    return { data: reading };
  }
  @Get('status')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get reading statuses by status' })
  @ApiResponse({ type: GetReadingStatusResponseDTO })
  async getReadingsByStatus(
    @Request() req,
    @Query('status') status: Status, // 쿼리 파라미터로 status를 받음
  ) {
    const userId = req.user.id; // 사용자 ID 추출
    const readings = await this.readingsService.getReadingsByStatus(
      userId,
      status,
    );
    return {
      data: readings,
      message: 'Readings fetched successfully.',
      statusCode: 200,
    };
  }
  // 독서 현황 수정
  @Patch(':id')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a reading status' })
  async updateReading(
    @Param('id', ParseIntPipe) id: number, // 독서 현황 ID
    @Body() updateReadingDto: CreateReadingDto,
    @Request() req,
  ) {
    const userId = req.user.id; // 사용자 ID 추출
    const updatedReading = await this.readingsService.updateReading(
      userId,
      id,
      updateReadingDto,
    );
    return {
      data: updatedReading,
      message: 'Reading status updated successfully.',
      statusCode: 200,
    };
  }

  // 독서 현황 삭제
  @Delete(':id')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a reading status' })
  async deleteReading(
    @Param('id', ParseIntPipe) id: number, // 독서 현황 ID
    @Request() req,
  ) {
    const userId = req.user.id; // 사용자 ID 추출
    await this.readingsService.deleteReading(userId, id);
    return {
      data: null,
      message: 'Reading status deleted successfully.',
      statusCode: 200,
    };
  }
}
