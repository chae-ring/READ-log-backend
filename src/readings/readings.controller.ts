import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트
import { CreateReadingDto, ReadingStatus } from '../dto/readings.dto'; // DTO 임포트
import { ReadingsService } from './readings.service'; // Service 임포트

@ApiTags('Readings')
@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post('register')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '독서 현황 등록' })
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
}
