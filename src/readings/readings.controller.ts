import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
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

@ApiTags('Readings')
@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post('register')
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
}
