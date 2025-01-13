import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
export enum Genre {
  NOVEL = 'NOVEL',
  NONFICTION = 'NONFICTION',
  SELFHELP = 'SELFHELP',
  FANTASY = 'FANTASY',
  MYSTERY = 'MYSTERY',
}
export class CreateReadingDto {
  @ApiProperty({ example: '읽는 중', description: '독서 상태' })
  @IsString()
  status: string;

  @ApiProperty({ example: '책 제목', description: '책 제목' })
  @IsString()
  name: string;

  @ApiProperty({ example: '작가 이름', description: '작가 이름' })
  @IsString()
  writer: string;

  @ApiProperty({
    example: '2025-01-01',
    description: '독서 시작 날짜',
  })
  @IsDate()
  startReadDate?: Date;

  @ApiProperty({
    example: '2025-01-05',
    description: '마지막 읽은 날짜',
  })
  @IsOptional()
  @IsDate()
  lastReadDate?: Date;

  @ApiProperty({
    description: '현재 페이지',
  })
  @IsNumber()
  currentPage?: number;

  @ApiProperty({
    description: '총 페이지',
  })
  @IsNumber()
  totalPage?: number;

  @ApiProperty({ example: 'NOVEL', enum: Genre, description: '책의 장르' })
  @IsOptional()
  @IsEnum(Genre, {
    message: 'NOVEL, NONFICTION, SELFHELP, FANTASY, MYSTERY',
  })
  genre?: Genre;
}

export class UpdateReadingDto {
  status?: string;
  name?: string;
  writer?: string;
  startReadDate?: Date;
  lastReadDate?: Date;
  endDate?: Date;
  genre?: string;
  currentPage?: number;
  totalPage?: number;
}
export class GetReadingStatusDto {
  @ApiProperty({ required: false, description: '독서 상태' })
  @IsString()
  status?: string; // status는 선택 사항이므로 @IsOptional()을 추가
}
export class GetReadingStatusResponseDTO {
  @ApiProperty({ example: '읽는 중', description: '독서 상태' })
  @IsString()
  status: string;

  @ApiProperty({ example: '책 제목', description: '책 제목' })
  @IsString()
  name: string;

  @ApiProperty({ example: '작가 이름', description: '작가 이름' })
  @IsString()
  writer: string;

  @ApiProperty({
    example: '2025-01-01',
    description: '독서 시작 날짜',
  })
  @IsDate()
  startReadDate?: Date;

  @ApiProperty({
    example: '2025-01-05',
    description: '마지막 읽은 날짜',
  })
  @IsOptional()
  @IsDate()
  lastReadDate?: Date;

  @ApiProperty({
    description: '현재 페이지',
  })
  @IsNumber()
  currentPage?: number;

  @ApiProperty({
    description: '총 페이지',
  })
  @IsNumber()
  totalPage?: number;

  @ApiProperty({ example: 'NOVEL', enum: Genre, description: '책의 장르' })
  @IsOptional()
  @IsEnum(Genre, {
    message: 'NOVEL, NONFICTION, SELFHELP, FANTASY, MYSTERY',
  })
  genre?: Genre;
}
