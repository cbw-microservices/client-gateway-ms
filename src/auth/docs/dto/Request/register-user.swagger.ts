import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserSwagger {
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'securePassword123.@' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}
