import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트
import { MypageService } from './mypage.service';
import { FinishedBookDto } from '../dto/mypage.dto'; // DTO 임포트

@ApiTags('Mypage')
@Controller('mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  // 완독한 도서 조회
  @Get('finished-books')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get finished books for the user' })
  @ApiResponse({
    type: [FinishedBookDto],
    description: 'List of finished books',
  })
  async getFinishedBooks(@Request() req) {
    const userId = req.user.id;
    const books = await this.mypageService.getFinishedBooks(userId);
    return {
      data: books,
      message: 'Finished books fetched successfully.',
      statusCode: 200,
    };
  }
}
