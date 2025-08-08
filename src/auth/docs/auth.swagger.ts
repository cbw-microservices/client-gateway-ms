import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponseSwagger, LoginUserSwagger, RegisterUserSwagger } from './dto';
import { RegisterResponseSwagger } from './dto/Response/register-response.swagger';


export const AuthSwaggerTags = () => ApiTags('Auth');

export const RegisterSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Register user' }),
    ApiBody({ type: RegisterUserSwagger }),
    ApiResponse({ status: 201, description: 'User registered successfully', type: RegisterResponseSwagger }),
    ApiResponse({ status: 400, description: 'Validation error' }),
  );

export const LoginSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Login user' }),
    ApiBody({ type: LoginUserSwagger }),
    ApiResponse({ status: 200, description: 'User logged in with token', type: LoginResponseSwagger }),
    ApiResponse({ status: 401, description: 'Invalid credentials' }),
  );

export const VerifySwagger = () =>
  applyDecorators(
    ApiBearerAuth('token'),
    ApiOperation({ summary: 'Verify token' }),
    ApiResponse({ status: 200, description: 'Token valid', type: LoginResponseSwagger }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
