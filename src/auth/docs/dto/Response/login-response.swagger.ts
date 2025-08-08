import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty({ example: '689585864e6b13682cf4bdd4' })
  id: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class LoginResponseSwagger {
  @ApiProperty({ type: UserInfo })
  user: UserInfo;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;
}
