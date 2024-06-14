import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
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
}
