import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client'; // Prisma에서 가져온 Status 열거형

export enum Genre {
  NOVEL = 'NOVEL',
  NONFICTION = 'NONFICTION',
  SELFHELP = 'SELFHELP',
  FANTASY = 'FANTASY',
  MYSTERY = 'MYSTERY',
}
export class CreateReadingDto {
  @ApiProperty({
    description: 'The current status of the reading',
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

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
  @Type(() => Date)
  startReadDate: Date;

  @ApiProperty({
    example: '2025-01-05',
    description: '마지막 읽은 날짜',
  })
  @IsDate()
  @Type(() => Date)
  lastReadDate: Date;

  @ApiProperty({
    description: '현재 페이지',
  })
  @IsNumber()
  currentPage: number;

  @ApiProperty({
    description: '총 페이지',
  })
  @IsNumber()
  totalPage: number;

  @ApiProperty({ example: 'NOVEL', enum: Genre, description: '책의 장르' })
  @IsEnum(Genre, {
    message: 'NOVEL, NONFICTION, SELFHELP, FANTASY, MYSTERY',
  })
  genre: Genre;
}
export class ReadingStatus {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  writer: string;

  @ApiProperty()
  startReadDate: Date;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  lastReadDate: Date;

  @ApiProperty()
  genre: Genre;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPage: number;
}

export class GetReadingStatusResponseDTO {
  @ApiProperty({
    description: 'The current status of the reading',
    enum: Status, // Prisma에서 가져온 Status 열거형 사용
  })
  @IsEnum(Status)
  status: Status;

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
  @IsDate()
  lastReadDate: Date;

  @ApiProperty({
    description: '현재 페이지',
  })
  @IsNumber()
  currentPage?: number;

  @ApiProperty({
    description: '총 페이지',
  })
  @IsNumber()
  totalPage: number;

  @ApiProperty({ example: 'NOVEL', enum: Genre, description: '책의 장르' })
  @IsOptional()
  @IsEnum(Genre, {
    message: 'NOVEL, NONFICTION, SELFHELP, FANTASY, MYSTERY',
  })
  genre?: Genre;
}
