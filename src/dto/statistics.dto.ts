import { ApiProperty } from '@nestjs/swagger';
import { Status, Genre, StatType } from '@prisma/client'; // Prisma에서 가져온 Status, Genre, StatType 열거형

export class UpdateStatisticsDto {
  @ApiProperty({
    description: '사용자의 ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: '통계 종류 (예: 월별, 장르별, 연도별, 상태별)',
    enum: StatType,
    example: StatType.GENRE,
  })
  statType: StatType;

  @ApiProperty({
    description: '책의 장르 (선택적)',
    enum: Genre,
    required: false,
    example: Genre.FANTASY,
  })
  genre?: Genre;

  @ApiProperty({
    description: '책의 상태 (읽는 중, 완료, 포기 등)',
    enum: Status,
    required: false,
    example: Status.READING,
  })
  status?: Status;

  @ApiProperty({
    description: '통계의 월 (선택적)',
    required: false,
    example: 1,
  })
  month?: number;

  @ApiProperty({
    description: '통계의 연도 (선택적)',
    required: false,
    example: 2025,
  })
  year?: number;
}
