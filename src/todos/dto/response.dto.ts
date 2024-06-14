import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<TData> {
  @ApiProperty({ example: '성공' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  data: TData;
}
