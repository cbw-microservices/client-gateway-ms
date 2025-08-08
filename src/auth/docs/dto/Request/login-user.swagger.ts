import { ApiProperty } from '@nestjs/swagger';

export class LoginUserSwagger {
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'securePassword123.@' })
  password: string;
}
