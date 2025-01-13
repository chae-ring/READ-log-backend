import { Controller, Get, UseGuards, Request } from '@nestjs/common'; // ForbiddenException을 임포트
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BearerGuard } from '../bearer.guard'; // BearerGuard 임포트

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get('nickname')
  @UseGuards(BearerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get nickname of the user' })
  @ApiResponse({ type: String })
  async getNickname(@Request() req) {
    const user = req.user;
    return user.nickname;
  }
}
