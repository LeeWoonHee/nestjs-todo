import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ExampleTodoDto {
  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    example: 'todo list title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    default: false,
  })
  @IsBoolean()
  isDone: boolean;

  @ApiProperty({
    type: String,
    example: '2024-06-13T17:23:48.158Z',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    type: String,
    example: '2024-06-13T17:23:48.158Z',
  })
  @IsString()
  updatedAt: string;
}
