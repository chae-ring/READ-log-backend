import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The title of the review',
    example: '어린왕자', // Swagger에 예시 값 추가
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the review',
    example: '이 책은 정말 감동적이었다.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The rating given to the book',
    example: 5, // 예시 값 추가
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsInt()
  userId?: number;
}
export class ReviewResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the review',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who created the review',
  })
  userId: number;

  @ApiProperty({ example: '책 제목', description: 'The title of the review' })
  title: string;

  @ApiProperty({ example: '리뷰', description: 'The content of the review' })
  content: string;

  @ApiProperty({ example: 5, description: 'The rating given in the review' })
  rating: number;

  @ApiProperty({ description: 'The date when the review was created' })
  created_at: Date;

  @ApiProperty({ description: 'The date when the review was last updated' })
  updated_at: Date;
}
