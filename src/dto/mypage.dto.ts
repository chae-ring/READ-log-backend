import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';

export class FinishedBookDto {
  @ApiProperty({ description: 'Book title' })
  name: string;

  @ApiProperty({ description: 'Book author' })
  writer: string;

  @ApiProperty({ description: 'Book genre' })
  genre: Genre;

  @ApiProperty({ description: 'Total number of pages' })
  totalPage: number;
}
