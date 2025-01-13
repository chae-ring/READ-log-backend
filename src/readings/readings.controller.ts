import {
  Controller,

  //UseGuards,
} from '@nestjs/common';
import { ReadingsService } from './readings.service';

//@ApiBearerAuth() // Swagger에서 Bearer 토큰 인증 활성화
@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}
}
